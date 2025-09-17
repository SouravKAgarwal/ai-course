import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  FileText,
  List,
  BarChart3,
  Download,
  Youtube,
  ChevronRight,
} from "lucide-react";
import type {
  Question,
  Course,
  Chapter,
  Resource,
} from "@/types/course-gemini-creation";
import Markdown from "markdown-to-jsx";

interface CourseContentProps {
  course: Course;
  currentChapter: Chapter;
  currentChapterIndex: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChapterComplete: () => void;
  onPreviousChapter: () => void;
  isUpdatingProgress: boolean;
  isLastChapter: boolean;
  hasQuiz: boolean;
}

export function CourseContent({
  course,
  currentChapter,
  currentChapterIndex,
  activeTab,
  onTabChange,
  onChapterComplete,
  onPreviousChapter,
  isUpdatingProgress,
  isLastChapter,
  hasQuiz,
}: CourseContentProps) {
  return (
    <Card className="rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black bg-black text-sm font-bold text-white">
                {currentChapterIndex + 1}
              </div>
              <CardTitle className="text-xl font-bold">
                {currentChapter.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-black bg-white px-2 py-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{currentChapter.estimated_minutes} min</span>
            </div>
          </div>
          <CardDescription className="font-medium text-gray-700">
            {currentChapter.summary}
          </CardDescription>

          {course.progress && (
            <div className="flex items-center gap-2 text-xs font-medium">
              <div className="h-2 w-20 rounded-full border border-black bg-white">
                <div
                  className="h-full rounded-full border-r border-black bg-green-500"
                  style={{
                    width: `${((currentChapterIndex + 1) / course.chapters.length) * 100}%`,
                  }}
                />
              </div>
              <span>
                Chapter {currentChapterIndex + 1} of {course.chapters.length}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="w-full p-0">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="mb-6 grid w-full grid-cols-3 rounded-none border-b-2 border-black bg-white">
            <TabsTrigger
              value="content"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-yellow-100 data-[state=active]:font-bold"
            >
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-yellow-100 data-[state=active]:font-bold"
            >
              <List className="h-4 w-4" />
              Resources
            </TabsTrigger>
            {hasQuiz && (
              <TabsTrigger
                value="quiz"
                className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-yellow-100 data-[state=active]:font-bold"
              >
                <BarChart3 className="h-4 w-4" />
                Quiz
              </TabsTrigger>
            )}
          </TabsList>

          <div className="px-6 pb-6">
            <TabsContent value="content" className="mt-0 space-y-6">
              {currentChapter.youtube_url && (
                <div className="overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <iframe
                    src={currentChapter.youtube_url.replace(
                      "watch?v=",
                      "embed/",
                    )}
                    className="aspect-video h-full w-full"
                    allowFullScreen
                    title={`Chapter ${currentChapterIndex + 1} Video`}
                  />
                </div>
              )}

              <Markdown
                options={{ wrapper: "article" }}
                className="prose max-w-none rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {currentChapter.content_text}
              </Markdown>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              {currentChapter.resources.length > 0 ? (
                <div className="space-y-3">
                  {currentChapter.resources.map(
                    (resource: Resource, index: number) => (
                      <Card
                        key={index}
                        className="rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {resource.type === "video" ? (
                                <Youtube className="h-5 w-5 text-red-600" />
                              ) : (
                                <FileText className="h-5 w-5 text-blue-600" />
                              )}
                              <div>
                                <p className="font-bold">{resource.title}</p>
                                <p className="text-sm font-medium">
                                  {resource.type}
                                </p>
                              </div>
                            </div>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-2 border-black bg-white font-bold hover:bg-yellow-100"
                            >
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                View
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-black bg-gray-50 py-8 text-center">
                  <FileText className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                  <p className="font-medium">
                    No resources available for this chapter.
                  </p>
                </div>
              )}
            </TabsContent>

            {hasQuiz && (
              <TabsContent value="quiz" className="">
                <Card className="rounded-none border-0 bg-transparent p-0 shadow-none">
                  <CardHeader className="p-0">
                    <CardTitle className="font-bold">Chapter Quiz</CardTitle>
                    <CardDescription className="font-medium">
                      Test your knowledge from this chapter
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-6">
                      {currentChapter.quiz?.questions.map(
                        (question: Question, qIndex: number) => (
                          <div
                            key={question.id}
                            className="space-y-4 rounded-lg border-2 border-black bg-white p-4"
                          >
                            <h3 className="font-bold">
                              Question {qIndex + 1}: {question.prompt}
                            </h3>
                            <div className="space-y-2">
                              {question.options.map(
                                (option: string, oIndex: number) => (
                                  <div
                                    key={oIndex}
                                    className="flex items-center space-x-2 rounded-md border border-black p-2 hover:bg-yellow-50"
                                  >
                                    <input
                                      type={
                                        question.type === "multi-choice"
                                          ? "checkbox"
                                          : "radio"
                                      }
                                      id={`question-${qIndex}-option-${oIndex}`}
                                      name={`question-${qIndex}`}
                                      className="h-4 w-4 accent-black"
                                    />
                                    <label
                                      htmlFor={`question-${qIndex}-option-${oIndex}`}
                                      className="text-sm font-medium"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}

                      <Button className="w-full border-2 border-black bg-green-500 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600">
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </CardContent>

      <CardContent className="border-t-2 border-black pt-6">
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentChapterIndex === 0}
            onClick={onPreviousChapter}
            className="border-2 border-black bg-white font-bold hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous Chapter
          </Button>

          <Button
            onClick={onChapterComplete}
            disabled={isUpdatingProgress}
            className="border-2 border-black bg-green-500 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLastChapter ? "Complete Course" : "Complete Chapter"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
