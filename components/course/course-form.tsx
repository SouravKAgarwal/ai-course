"use client";

import { motion, AnimatePresence } from "framer-motion";
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

const CourseForm = ({
  formData,
  onInputChange,
  onGenerate,
  isGenerating,
  generatedCourse,
  isSaving,
  onSave,
}: CourseFormProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    generating: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
      },
    },
  };

  const previewVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="container max-w-7xl bg-white py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-6 py-2 font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)]"
          >
            <Sparkles className="h-5 w-5" />
            <span>AI Powered</span>
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-black">
            AI Course Generator
          </h1>
          <p className="mt-4 text-lg font-medium text-black">
            Create comprehensive educational courses in seconds with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="keyword"
                      className="flex gap-0 font-bold text-black"
                    >
                      Course Topic
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="keyword"
                      placeholder="e.g., Introduction to Python Programming"
                      value={formData.keyword}
                      onChange={(e) => onInputChange("keyword", e.target.value)}
                      required
                      className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] focus:border-black focus:ring-2 focus:ring-yellow-300"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="level" className="font-bold text-black">
                      Difficulty Level
                    </Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => onInputChange("level", value)}
                    >
                      <SelectTrigger className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] focus:border-black focus:ring-2 focus:ring-yellow-300">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-black bg-white">
                        <SelectItem
                          value="beginner"
                          className="focus:bg-yellow-300 focus:text-black"
                        >
                          Beginner
                        </SelectItem>
                        <SelectItem
                          value="intermediate"
                          className="focus:bg-yellow-300 focus:text-black"
                        >
                          Intermediate
                        </SelectItem>
                        <SelectItem
                          value="advanced"
                          className="focus:bg-yellow-300 focus:text-black"
                        >
                          Advanced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
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
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <Label
                      htmlFor="max_words_description"
                      className="font-bold text-black"
                    >
                      Description Max Words: {formData.max_words_description}
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
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <Label
                      htmlFor="max_words_chapter_text"
                      className="font-bold text-black"
                    >
                      Chapter Text Max Words: {formData.max_words_chapter_text}
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
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0_0_rgb(0,0,0)]"
                  >
                    <Label
                      htmlFor="include_quizzes"
                      className="flex cursor-pointer flex-col space-y-1"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-black">
                          Include Quizzes
                        </span>
                        <span className="text-sm text-black">
                          Add knowledge check questions to each chapter
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
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0_0_rgb(0,0,0)]"
                  >
                    <Label
                      htmlFor="include_youtube"
                      className="flex cursor-pointer flex-col space-y-1"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-black">
                          Include YouTube Videos
                        </span>
                        <span className="text-sm text-black">
                          Add relevant educational videos to chapters
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
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      animate={isGenerating ? "generating" : "initial"}
                    >
                      <Button
                        onClick={onGenerate}
                        disabled={isGenerating || !formData.keyword.trim()}
                        className="w-full border-2 border-black bg-yellow-300 py-6 text-lg font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] hover:bg-yellow-400 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating Course...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-5 w-5" />
                            Generate Course
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Preview Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <AnimatePresence mode="wait">
              {generatedCourse ? (
                <motion.div
                  key="preview"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={previewVariants}
                  className="h-full"
                >
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
                            Review your AI-generated course
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2 border-2 border-black bg-gray-100 p-4"
                      >
                        <h3 className="text-xl font-black text-black">
                          {generatedCourse.title}
                        </h3>
                        <p className="text-black">{generatedCourse.subtitle}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                            Level: {generatedCourse.level}
                          </span>
                          <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                            {generatedCourse.duration_weeks} weeks
                          </span>
                          <span className="rounded-full border border-black bg-yellow-300 px-3 py-1 text-black">
                            {generatedCourse.estimated_total_minutes} minutes
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2 border-2 border-black bg-gray-100 p-4"
                      >
                        <h4 className="font-bold text-black">Description</h4>
                        <p className="text-sm text-black">
                          {generatedCourse.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2 border-2 border-black bg-gray-100 p-4"
                      >
                        <h4 className="font-bold text-black">
                          Learning Outcomes
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {generatedCourse.learning_outcomes.map(
                            (outcome: string, index: number) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start text-black"
                              >
                                <span className="mr-2 font-black text-green-600">
                                  ✓
                                </span>
                                {outcome}
                              </motion.li>
                            ),
                          )}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                      >
                        <h4 className="font-bold text-black">
                          Chapters ({generatedCourse.chapters.length})
                        </h4>
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
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="rounded-lg border-2 border-black bg-white p-3 transition-all hover:bg-yellow-50"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-yellow-300 text-xs font-bold text-black">
                                    {index}
                                  </div>
                                  <h5 className="text-sm font-bold text-black">
                                    {title}
                                  </h5>
                                </div>
                                <p className="mt-1 text-xs text-black">
                                  {summary}
                                </p>
                                <div className="mt-2 flex justify-between text-xs">
                                  <span className="text-black">
                                    {estimated_minutes} min
                                  </span>
                                  <div className="flex gap-2">
                                    {quiz && (
                                      <span className="rounded-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900">
                                        Quiz
                                      </span>
                                    )}
                                    {youtube_url && (
                                      <span className="rounded-full border border-red-900 bg-red-200 px-2 py-1 text-red-900">
                                        Video
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={onSave}
                            disabled={isSaving}
                            className="w-full border-2 border-black bg-green-500 py-6 text-lg font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] hover:bg-green-600 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
                            size="lg"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Saving Course...
                              </>
                            ) : (
                              <>
                                <BookOpen className="mr-2 h-5 w-5" />
                                Save Course
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-black bg-gray-100 p-8 text-center"
                >
                  <div className="rounded-full border-2 border-black bg-yellow-300 p-4">
                    <Eye className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-black">
                    Course Preview
                  </h3>
                  <p className="mt-2 text-sm font-medium text-black">
                    Generate a course to see the preview here
                  </p>
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="mt-4"
                  >
                    <Sparkles className="h-6 w-6 text-black" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseForm;
