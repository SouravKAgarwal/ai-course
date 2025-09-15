"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  generateCourseAction,
  saveCourseAction,
} from "@/app/actions/course-actions";
import CourseForm from "./course-form";

export default function CourseGeneratorClient() {
  const { user } = useUser();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    keyword: "",
    level: "beginner",
    chapters_count: 5,
    max_words_description: 150,
    max_words_chapter_text: 500,
    include_quizzes: true,
    include_youtube: true,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateCourse = async () => {
    if (!formData.keyword.trim()) {
      alert("Please enter a course topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedCourse(null);

    try {
      const result = await generateCourseAction(formData);

      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        setGeneratedCourse(result.course);
      }
    } catch (error) {
      alert("Failed to generate course. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!generatedCourse || !user) return;

    setIsSaving(true);

    try {
      const result = await saveCourseAction(generatedCourse);

      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        alert("Course saved successfully!");
        router.push(`/courses/${result.courseId}`);
      }
    } catch (error) {
      alert("Failed to save course. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
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
