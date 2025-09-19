"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Loader2, Zap, Sparkles, Eye, Settings, BookOpen } from "lucide-react";
import type { Course } from "@/types/course-gemini-creation";
import { memo } from "react";

interface CourseFormProps {
  formData: {
    keyword: string;
    level: string;
    chapters_count: number;
    max_words_description: number;
    max_words_chapter_text: number;
    include_quizzes: boolean;
    include_youtube: boolean;
  };
  onInputChange: (field: string, value: string | number | boolean) => void;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
  generatedCourse: Course | null;
  isSaving: boolean;
  onSave: () => Promise<void>;
}

const CourseForm = memo(
  ({
    formData,
    onInputChange,
    onGenerate,
    isGenerating,
    generatedCourse,
    isSaving,
    onSave,
  }: CourseFormProps) => {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section aria-label="Course Configuration Form">
          <Card className="h-full border-4 border-black bg-white shadow-[8px_8px_0_0_rgb(0,0,0)]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border-2 border-black bg-yellow-300 p-2">
                  <Settings className="h-5 w-5 text-black" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black text-black">
                    Course Parameters
                  </CardTitle>
                  <CardDescription className="font-medium text-black">
                    Configure your course settings and let AI do the rest
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="keyword"
                  className="flex gap-1 font-bold text-black"
                >
                  Course Topic
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="keyword"
                  name="keyword"
                  placeholder="e.g., Introduction to Python Programming"
                  value={formData.keyword}
                  onChange={(e) => onInputChange("keyword", e.target.value)}
                  required
                  aria-describedby="keyword-help"
                  className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] focus:border-black focus:ring-2 focus:ring-yellow-300"
                />
                <p id="keyword-help" className="text-sm text-gray-600">
                  Enter the main topic or subject for your course
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="font-bold text-black">
                  Difficulty Level
                </Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => onInputChange("level", value)}
                >
                  <SelectTrigger
                    id="level"
                    className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] focus:border-black focus:ring-2 focus:ring-yellow-300"
                  >
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black bg-white">
                    <SelectItem
                      value="beginner"
                      className="focus:bg-yellow-300 focus:text-black"
                    >
                      Beginner - No prior knowledge required
                    </SelectItem>
                    <SelectItem
                      value="intermediate"
                      className="focus:bg-yellow-300 focus:text-black"
                    >
                      Intermediate - Some experience helpful
                    </SelectItem>
                    <SelectItem
                      value="advanced"
                      className="focus:bg-yellow-300 focus:text-black"
                    >
                      Advanced - Requires solid foundation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label
                  htmlFor="chapters_count"
                  className="font-bold text-black"
                >
                  Number of Chapters: {formData.chapters_count}
                </Label>
                <Slider
                  id="chapters_count"
                  min={3}
                  max={10}
                  step={1}
                  value={[formData.chapters_count]}
                  onValueChange={([value]) =>
                    onInputChange("chapters_count", value)
                  }
                  className="cursor-pointer"
                  aria-describedby="chapters-help"
                />
                <p id="chapters-help" className="text-sm text-gray-600">
                  More chapters provide deeper coverage of the topic
                </p>
              </div>

              <div className="space-y-4">
                <Label
                  htmlFor="max_words_description"
                  className="font-bold text-black"
                >
                  Description Length: {formData.max_words_description} words
                </Label>
                <Slider
                  id="max_words_description"
                  min={50}
                  max={300}
                  step={10}
                  value={[formData.max_words_description]}
                  onValueChange={([value]) =>
                    onInputChange("max_words_description", value)
                  }
                  className="cursor-pointer"
                  aria-describedby="description-help"
                />
                <p id="description-help" className="text-sm text-gray-600">
                  Controls the length of the course description
                </p>
              </div>

              <div className="space-y-4">
                <Label
                  htmlFor="max_words_chapter_text"
                  className="font-bold text-black"
                >
                  Chapter Content Length: {formData.max_words_chapter_text}{" "}
                  words
                </Label>
                <Slider
                  id="max_words_chapter_text"
                  min={200}
                  max={1000}
                  step={50}
                  value={[formData.max_words_chapter_text]}
                  onValueChange={([value]) =>
                    onInputChange("max_words_chapter_text", value)
                  }
                  className="cursor-pointer"
                  aria-describedby="chapter-help"
                />
                <p id="chapter-help" className="text-sm text-gray-600">
                  Longer content provides more detailed explanations
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0_0_rgb(0,0,0)]">
                <Label
                  htmlFor="include_quizzes"
                  className="flex cursor-pointer flex-col space-y-1"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-black">
                      Include Knowledge Quizzes
                    </span>
                    <span className="text-sm text-gray-600">
                      Add interactive questions to test understanding
                    </span>
                  </div>
                </Label>
                <Switch
                  id="include_quizzes"
                  checked={formData.include_quizzes}
                  onCheckedChange={(checked) =>
                    onInputChange("include_quizzes", checked)
                  }
                  className="border-2 border-black data-[state=checked]:bg-yellow-300"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0_0_rgb(0,0,0)]">
                <Label
                  htmlFor="include_youtube"
                  className="flex cursor-pointer flex-col space-y-1"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-black">
                      Include Educational Videos
                    </span>
                    <span className="text-sm text-gray-600">
                      Add relevant YouTube videos to enhance learning
                    </span>
                  </div>
                </Label>
                <Switch
                  id="include_youtube"
                  checked={formData.include_youtube}
                  onCheckedChange={(checked) =>
                    onInputChange("include_youtube", checked)
                  }
                  className="border-2 border-black data-[state=checked]:bg-yellow-300"
                />
              </div>

              <Button
                onClick={onGenerate}
                disabled={isGenerating || !formData.keyword.trim()}
                className="w-full border-2 border-black bg-yellow-300 py-6 text-lg font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-400 hover:shadow-[6px_6px_0_0_rgb(0,0,0)] disabled:cursor-not-allowed disabled:opacity-50"
                size="lg"
                type="button"
                aria-describedby="generate-help"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Course...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Course with AI
                  </>
                )}
              </Button>
              <p
                id="generate-help"
                className="text-center text-sm text-gray-600"
              >
                Our AI will create a complete course structure in seconds
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Generated Course Preview">
          {generatedCourse ? (
            <Card className="h-full border-4 border-black bg-white shadow-[8px_8px_0_0_rgb(0,0,0)]">
              <CardHeader className="border-b-4 border-black">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-black bg-yellow-300 p-2">
                    <Eye className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-black">
                      Course Preview
                    </CardTitle>
                    <CardDescription className="font-medium text-black">
                      Review your AI-generated course content
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2 rounded-lg border-2 border-black bg-gray-100 p-4">
                  <h2 className="text-xl font-black text-black">
                    {generatedCourse.title}
                  </h2>
                  {generatedCourse.subtitle && (
                    <p className="font-medium text-black">
                      {generatedCourse.subtitle}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                      Level: {generatedCourse.level}
                    </span>
                    <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                      Duration: {generatedCourse.duration_weeks} weeks
                    </span>
                    <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                      Total: {generatedCourse.estimated_total_minutes} minutes
                    </span>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg border-2 border-black bg-gray-100 p-4">
                  <h3 className="font-bold text-black">Course Description</h3>
                  <p className="text-sm leading-relaxed text-black">
                    {generatedCourse.description}
                  </p>
                </div>

                <div className="space-y-2 rounded-lg border-2 border-black bg-gray-100 p-4">
                  <h3 className="font-bold text-black">Learning Outcomes</h3>
                  <ul className="space-y-1 text-sm" role="list">
                    {generatedCourse.learning_outcomes.map(
                      (outcome: string, index: number) => (
                        <li key={index} className="flex items-start text-black">
                          <span className="mr-2 flex-shrink-0 font-black text-green-600">
                            ✓
                          </span>
                          <span>{outcome}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-black">
                    Course Chapters ({generatedCourse.chapters.length})
                  </h3>
                  <div className="max-h-64 space-y-3 overflow-y-auto">
                    {generatedCourse.chapters.map(
                      (
                        {
                          title,
                          index,
                          summary,
                          estimated_minutes,
                          quiz,
                          youtube_url,
                        },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="rounded-lg border-2 border-black bg-white p-3 transition-colors hover:bg-yellow-50"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-black bg-yellow-300 text-xs font-bold text-black">
                              {index}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="mb-1 text-sm font-bold text-black">
                                {title}
                              </h4>
                              <p className="mb-2 text-xs leading-relaxed text-black">
                                {summary}
                              </p>
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <span className="text-gray-600">
                                  {estimated_minutes} min
                                </span>
                                <div className="flex gap-2">
                                  {quiz && (
                                    <span className="rounded-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900">
                                      Quiz Available
                                    </span>
                                  )}
                                  {youtube_url && (
                                    <span className="rounded-full border border-red-900 bg-red-200 px-2 py-1 text-red-900">
                                      Video Content
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <Button
                  onClick={onSave}
                  disabled={isSaving}
                  className="w-full border-2 border-black bg-green-500 py-6 text-lg font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:bg-green-600 hover:shadow-[6px_6px_0_0_rgb(0,0,0)] disabled:cursor-not-allowed disabled:opacity-50"
                  size="lg"
                  type="button"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving Course...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-5 w-5" />
                      Save Course to Library
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-black bg-gray-100 p-8 text-center">
              <div className="rounded-full border-2 border-black bg-yellow-300 p-4">
                <Eye className="h-8 w-8 text-black" />
              </div>
              <h3 className="mt-4 text-lg font-black text-black">
                Course Preview
              </h3>
              <p className="mt-2 max-w-md text-sm font-medium text-black">
                Fill out the form and click &quot;Generate Course&quot; to see
                your AI-created course structure here
              </p>
              <div className="mt-4">
                <Sparkles className="h-6 w-6 text-black" />
              </div>
            </div>
          )}
        </section>
      </div>
    );
  },
);

CourseForm.displayName = "CourseForm";

export default CourseForm;
