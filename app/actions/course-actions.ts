"use server";

import { revalidatePath } from "next/cache";
import { generateCourseContent } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { calculateProgressPercentage } from "@/lib/utils";
import {
  Course,
  CourseInput,
  UpdateProgressParams,
} from "@/types/course-gemini-creation";
import { Prisma } from "@/prisma/generated/prisma";

export async function generateCourseAction(input: CourseInput) {
  try {
    const course = await generateCourseContent(input);
    return { course, error: null };
  } catch (error) {
    console.error("Error generating course:", error);
    return {
      course: null,
      error:
        error instanceof Error ? error.message : "Failed to generate course",
    };
  }
}

export async function saveCourseAction(courseData: Course) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return {
        courseId: null,
        error: "Unauthorised",
      };
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: clerkUser.id },
    });

    if (!dbUser) {
      return {
        courseId: null,
        error: "User not found",
      };
    }

    const existingCourse = await prisma.course.findUnique({
      where: { courseId: courseData.courseId },
    });

    if (existingCourse) {
      return { courseId: null, error: "A course with this ID already exists" };
    }

    const course = await prisma.course.create({
      data: {
        courseId: courseData.courseId,
        title: courseData.title,
        subtitle: courseData.subtitle,
        category: courseData.category,
        level: courseData.level,
        duration_weeks: courseData.duration_weeks,
        estimated_total_minutes: courseData.estimated_total_minutes,
        description: courseData.description,
        learning_outcomes: courseData.learning_outcomes,
        image_url: null,
        chapters: courseData.chapters as Prisma.InputJsonValue[],
        createdBy: dbUser.id,
      },
    });

    await prisma.progress.create({
      data: {
        userId: dbUser.id,
        courseId: course.id,
        chapters: {
          completed: Array(courseData.chapters.length).fill(false),
          scores: Array(courseData.chapters.length).fill(0),
        },
      },
    });

    revalidatePath("/courses");
    return { courseId: course.courseId, error: null };
  } catch (error) {
    console.error("Error saving course:", error);
    return {
      courseId: null,
      error: error instanceof Error ? error.message : "Failed to save course",
    };
  }
}

export async function getCourseAction(
  userId: string,
  courseId?: string,
  options: {
    includeProgress?: boolean;
    sortBy?: "createdAt" | "updatedAt" | "title";
    sortOrder?: "asc" | "desc";
  } = {},
) {
  try {
    const {
      includeProgress = true,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    if (courseId) {
      const course = await prisma.course.findUnique({
        where: {
          courseId: courseId,
          createdBy: userId,
        },
      });

      if (!course) {
        return {
          course: null,
          courses: null,
          error: "Course not found or access denied",
        };
      }

      let progressData = undefined;
      if (includeProgress) {
        const progress = await prisma.progress.findUnique({
          where: {
            userId_courseId: {
              userId: userId,
              courseId: course.id,
            },
          },
        });

        progressData = progress
          ? {
              completed: progress.completed,
              currentChapter: progress.currentChapter,
              progressPercentage: Math.round(
                (progress.currentChapter /
                  JSON.parse(JSON.stringify(course.chapters)).length) *
                  100,
              ),
              lastAccessed: progress.updatedAt,
            }
          : undefined;
      }

      return {
        course: {
          ...course,
          progress: progressData,
        },
        courses: null,
        error: null,
      };
    } else {
      const courses = await prisma.course.findMany({
        where: {
          createdBy: userId,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
      });

      let coursesWithProgress = courses;

      if (includeProgress) {
        coursesWithProgress = await Promise.all(
          courses.map(async (course) => {
            const progress = await prisma.progress.findUnique({
              where: {
                userId_courseId: {
                  userId: userId,
                  courseId: course.id,
                },
              },
            });

            return {
              ...course,
              progress: progress
                ? {
                    completed: progress.completed,
                    currentChapter: progress.currentChapter,
                    progressPercentage: Math.round(
                      (progress.currentChapter /
                        JSON.parse(JSON.stringify(course.chapters)).length) *
                        100,
                    ),
                    lastAccessed: progress.updatedAt.toISOString(),
                  }
                : undefined,
            };
          }),
        );
      }

      return {
        course: null,
        courses: coursesWithProgress,
        error: null,
      };
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      course: null,
      courses: null,
      error: error instanceof Error ? error.message : "Failed to fetch courses",
    };
  }
}

export async function updateProgressAction({
  courseId,
  userId,
  chapterIndex,
  markCompleted = false,
  score,
}: UpdateProgressParams) {
  try {
    if (chapterIndex < 0) {
      return {
        success: false,
        error: "Invalid chapter index",
      };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { chapters: true },
    });

    if (!course) {
      return {
        success: false,
        error: "Course not found",
      };
    }

    const totalChapters = Array.isArray(course.chapters)
      ? course.chapters.length
      : 0;

    if (chapterIndex >= totalChapters) {
      return {
        success: false,
        error: "Chapter index exceeds total chapters in course",
      };
    }

    const progress = await prisma.progress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const defaultChapters = {
      completed: Array(totalChapters).fill(false),
      scores: Array(totalChapters).fill(0),
    };

    if (!progress) {
      const completedArray = Array(totalChapters).fill(false);

      for (let i = 0; i <= chapterIndex; i++) {
        if (i < totalChapters) {
          completedArray[i] = true;
        }
      }

      const newProgress = await prisma.progress.create({
        data: {
          userId,
          courseId,
          currentChapter: Math.min(chapterIndex, totalChapters - 1),
          completed: markCompleted && chapterIndex >= totalChapters - 1,
          chapters: {
            completed: completedArray,
            scores: Array(totalChapters).fill(0),
          },
        },
      });

      return {
        success: true,
        progress: {
          completed: newProgress.completed,
          currentChapter: newProgress.currentChapter,
          progressPercentage: calculateProgressPercentage(
            newProgress,
            totalChapters,
          ),
        },
      };
    }

    const chaptersData = progress.chapters as {
      completed: boolean[];
      scores: number[];
    };

    const updatedChaptersCompleted = [
      ...(chaptersData.completed.length === totalChapters
        ? chaptersData.completed
        : defaultChapters.completed),
    ];

    const updatedChaptersScores = [
      ...(chaptersData.scores.length === totalChapters
        ? chaptersData.scores
        : defaultChapters.scores),
    ];

    if (chapterIndex < totalChapters) {
      updatedChaptersCompleted[chapterIndex] = markCompleted;

      if (score !== undefined) {
        updatedChaptersScores[chapterIndex] = score;
      }
    }

    for (let i = 0; i < chapterIndex; i++) {
      if (i < totalChapters) {
        updatedChaptersCompleted[i] = true;
      }
    }

    const allChaptersCompleted = updatedChaptersCompleted.every(
      (completed) => completed,
    );
    const finalCompleted = markCompleted
      ? allChaptersCompleted
      : progress.completed;

    const updatedProgress = await prisma.progress.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        currentChapter: Math.min(chapterIndex, totalChapters - 1),
        completed: finalCompleted,
        chapters: {
          completed: updatedChaptersCompleted,
          scores: updatedChaptersScores,
        },
      },
    });

    return {
      success: true,
      progress: {
        completed: updatedProgress.completed,
        currentChapter: updatedProgress.currentChapter,
        progressPercentage: calculateProgressPercentage(
          updatedProgress,
          totalChapters,
        ),
      },
    };
  } catch (error) {
    console.error("Error updating progress:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update progress",
    };
  }
}
