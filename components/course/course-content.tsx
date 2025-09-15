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
import { type Course } from "@/types/course-gemini-creation";
import Markdown from "markdown-to-jsx";

interface CourseContentProps {
  course: Course;
  currentChapter: any;
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
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                {currentChapterIndex + 1}
              </div>
              <CardTitle className="text-xl">{currentChapter.title}</CardTitle>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{currentChapter.estimated_minutes} min</span>
            </div>
          </div>
          <CardDescription>{currentChapter.summary}</CardDescription>

          {course.progress && (
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <div className="bg-muted h-2 w-20 rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
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

      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Resources
            </TabsTrigger>
            {hasQuiz && (
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Quiz
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {currentChapter.youtube_url && (
              <div className="bg-muted aspect-video overflow-hidden rounded-lg">
                <iframe
                  src={currentChapter.youtube_url.replace("watch?v=", "embed/")}
                  className="h-full w-full"
                  allowFullScreen
                  title={`Chapter ${currentChapterIndex + 1} Video`}
                />
              </div>
            )}

            <Markdown
              options={{ wrapper: "article" }}
              className="prose max-w-none"
            >
              {currentChapter.content_text}
            </Markdown>
          </TabsContent>

          <TabsContent value="resources">
            {currentChapter.resources.length > 0 ? (
              <div className="space-y-3">
                {currentChapter.resources.map(
                  (resource: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {resource.type === "video" ? (
                              <Youtube className="h-5 w-5 text-red-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-500" />
                            )}
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {resource.type}
                              </p>
                            </div>
                          </div>
                          <Button asChild variant="outline" size="sm">
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
              <div className="text-muted-foreground py-8 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12" />
                <p>No resources available for this chapter.</p>
              </div>
            )}
          </TabsContent>

          {hasQuiz && (
            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle>Chapter Quiz</CardTitle>
                  <CardDescription>
                    Test your knowledge from this chapter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentChapter.quiz.questions.map(
                      (question: any, qIndex: number) => (
                        <div key={question.id} className="space-y-4">
                          <h3 className="font-medium">
                            Question {qIndex + 1}: {question.prompt}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map(
                              (option: string, oIndex: number) => (
                                <div
                                  key={oIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type={
                                      question.type === "multiple"
                                        ? "checkbox"
                                        : "radio"
                                    }
                                    id={`question-${qIndex}-option-${oIndex}`}
                                    name={`question-${qIndex}`}
                                    className="h-4 w-4"
                                  />
                                  <label
                                    htmlFor={`question-${qIndex}-option-${oIndex}`}
                                    className="text-sm"
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

                    <Button className="w-full">Submit Answers</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>

      <CardContent className="border-t pt-6">
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentChapterIndex === 0}
            onClick={onPreviousChapter}
          >
            Previous Chapter
          </Button>

          <Button onClick={onChapterComplete} disabled={isUpdatingProgress}>
            {isLastChapter ? "Complete Course" : "Complete Chapter"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
