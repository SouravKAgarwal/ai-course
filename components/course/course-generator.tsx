"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  generateCourseAction,
  saveCourseAction,
} from "@/app/actions/course-actions";
import CourseForm from "./course-form";
import type { Course, CourseInput } from "@/types/course-gemini-creation";
import { toast } from "sonner";

export default function CourseGenerator() {
  const { user } = useUser();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseInput>({
    keyword: "",
    level: "Beginner",
    chapters_count: 5,
    max_words_description: 150,
    max_words_chapter_text: 500,
    include_quizzes: true,
    include_youtube: true,
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateCourse = async () => {
    if (!formData.keyword.trim()) {
      toast.error("Please enter a course topic", {
        description: "Course topic is required to generate content",
        duration: 4000,
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedCourse(null);

    toast.promise(generateCourseAction(formData), {
      loading: "🤖 AI is creating your course...",
      success: (result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        setGeneratedCourse(result.course);
        return "✨ Course generated successfully!";
      },
      error: (error) => {
        console.error("Course generation error:", error);
        return error.message || "Failed to generate course. Please try again.";
      },
      finally: () => {
        setIsGenerating(false);
      },
    });
  };

  const handleSaveCourse = async () => {
    if (!generatedCourse) {
      toast.error("No course to save", {
        description: "Please generate a course first",
      });
      return;
    }

    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to save your course",
        action: {
          label: "Sign In",
          onClick: () => (window.location.href = "/sign-in"),
        },
      });
      return;
    }

    setIsSaving(true);

    toast.promise(saveCourseAction(generatedCourse), {
      loading: "💾 Saving your course...",
      success: (result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        // Navigate after successful save
        setTimeout(() => {
          router.push(`/courses/${result.courseId}`);
        }, 1500);
        return "🎉 Course saved successfully!";
      },
      error: (error) => {
        console.error("Course save error:", error);
        return error.message || "Failed to save course. Please try again.";
      },
      finally: () => {
        setIsSaving(false);
      },
    });
  };

  return (
    <CourseForm
      formData={formData}
      onInputChange={handleInputChange}
      onGenerate={handleGenerateCourse}
      isGenerating={isGenerating}
      generatedCourse={generatedCourse}
      isSaving={isSaving}
      onSave={handleSaveCourse}
    />
  );
}
