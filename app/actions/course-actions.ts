"use server";

import { revalidatePath } from "next/cache";
import { generateCourseContent } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import {
  Course,
  CourseInput,
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

export async function getCourseAction(courseId?: string) {
  try {
    if (courseId) {
      const course = await prisma.course.findUnique({
        where: {
          courseId: courseId,
        },
      });

      if (!course) {
        return {
          course: null,
          courses: null,
          error: "Course not found or access denied",
        };
      }

      return {
        course: course,
        courses: null,
        error: null,
      };
    } else {
      const courses = await prisma.course.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        course: null,
        courses: courses,
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