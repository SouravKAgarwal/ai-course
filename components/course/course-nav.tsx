import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Play } from "lucide-react";

interface ChapterNavigationProps {
  course: any;
  currentChapterIndex: number;
  onChapterChange: (index: number) => void;
}

export function ChapterNavigation({
  course,
  currentChapterIndex,
  onChapterChange,
}: ChapterNavigationProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Course Chapters</CardTitle>
          <CardDescription>
            {course.chapters.length} chapters • {course.estimated_total_minutes}{" "}
            minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] space-y-1 overflow-y-auto">
            {course.chapters.map((chapter: any, index: number) => {
              const isCompleted =
                course.progress && course.progress.currentChapter > index + 1;
              const isCurrent = index === currentChapterIndex;

              return (
                <button
                  key={index}
                  onClick={() => onChapterChange(index)}
                  className={`flex w-full items-center gap-3 border-b p-4 text-left transition-colors ${
                    isCurrent
                      ? "bg-primary/10 border-primary/20"
                      : "hover:bg-muted/50"
                  } ${isCompleted ? "text-muted-foreground" : ""}`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : isCurrent ? (
                      <Play className="text-primary h-5 w-5" />
                    ) : (
                      <div className="border-muted-foreground/30 flex h-5 w-5 items-center justify-center rounded-full border-2">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${isCompleted ? "line-through" : ""}`}
                    >
                      {chapter.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {chapter.estimated_minutes} min
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Learning Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.learning_outcomes.map((outcome: string, index: number) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                <span className="text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
