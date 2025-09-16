"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CourseContent } from "./course-content";
import { ChapterNavigation } from "./course-nav";
import { getLevelColor } from "@/lib/utils";
import { updateProgressAction } from "@/app/actions/course-actions";
import { Course } from "@/types/course-gemini-creation";

interface CourseClientProps {
  initialCourse: Course;
  userId: string;
}

export default function CourseClient({
  initialCourse,
  userId,
}: CourseClientProps) {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    initialCourse.progress ? initialCourse.progress.currentChapter - 1 : 0,
  );
  const [activeTab, setActiveTab] = useState("content");
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const updateProgress = async (
    chapterIndex: number,
    markCompleted = false,
  ) => {
    try {
      setIsUpdatingProgress(true);

      const result = await updateProgressAction({
        courseId: course.id,
        userId: userId,
        chapterIndex: chapterIndex + 1,
        markCompleted,
      });

      if (result.success && result.progress) {
        setCourse((prev) => ({
          ...prev,
          progress: {
            completed: result.progress!.completed,
            currentChapter: result.progress!.currentChapter,
            progressPercentage: Math.round(
              (result.progress!.currentChapter / prev.chapters.length) * 100,
            ),
          },
        }));
      } else if (result.error) {
        console.error("Error updating progress:", result.error);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleChapterComplete = () => {
    const nextChapterIndex = currentChapterIndex + 1;

    const isLastChapter = nextChapterIndex >= course.chapters.length;

    updateProgress(currentChapterIndex, isLastChapter);

    if (!isLastChapter) {
      setCurrentChapterIndex(nextChapterIndex);
      setActiveTab("content");
    }
  };

  const handleChapterChange = (index: number) => {
    setCurrentChapterIndex(index);
    setActiveTab("content");
    updateProgress(index);
  };

  const currentChapter = course.chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === course.chapters.length - 1;

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button asChild variant="ghost" className="w-fit pl-0">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Courses
            </Link>
          </Button>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Badge className={getLevelColor(course.level)}>
                {course.level}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {course.estimated_total_minutes} min • {course.duration_weeks}{" "}
                weeks
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground">{course.subtitle}</p>
          </div>

          {/* Progress Bar */}
          {course.progress && (
            <div className="space-y-2">
              <div className="text-muted-foreground flex justify-between text-sm">
                <span>Course Progress</span>
                <span>{course.progress.progressPercentage}% Complete</span>
              </div>
              <Progress
                value={course.progress.progressPercentage}
                className="h-2"
              />
              <div className="text-muted-foreground text-sm">
                Chapter {course.progress.currentChapter} of{" "}
                {course.chapters.length}
                {course.progress.completed && (
                  <span className="ml-2 text-green-600">• Completed</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <CourseContent
              course={course}
              currentChapter={currentChapter}
              currentChapterIndex={currentChapterIndex}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onChapterComplete={handleChapterComplete}
              onPreviousChapter={() =>
                handleChapterChange(currentChapterIndex - 1)
              }
              isUpdatingProgress={isUpdatingProgress}
              isLastChapter={isLastChapter}
              hasQuiz={!!currentChapter.quiz}
            />
          </div>

          <div className="lg:col-span-2">
            <ChapterNavigation
              course={course}
              currentChapterIndex={currentChapterIndex}
              onChapterChange={handleChapterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
