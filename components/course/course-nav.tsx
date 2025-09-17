import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types/course-gemini-creation";
import { CheckCircle, Play } from "lucide-react";

interface ChapterNavigationProps {
  course: Course;
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
      <Card className="rounded-lg border-2 border-black pb-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="font-bold">Course Chapters</CardTitle>
          <CardDescription className="font-medium">
            {course.chapters.length} chapters • {course.estimated_total_minutes}{" "}
            minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] space-y-0 overflow-y-auto">
            {course.chapters.map(
              ({ title, estimated_minutes }, idx: number) => {
                const isCompleted =
                  course.progress && course.progress.currentChapter > idx + 1;
                const isCurrent = idx === currentChapterIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => onChapterChange(idx)}
                    className={`flex w-full items-center gap-3 border-b border-black p-4 text-left transition-colors last:border-b-0 ${
                      isCurrent
                        ? "bg-yellow-100 font-bold"
                        : "hover:bg-yellow-50"
                    } ${isCompleted ? "text-gray-600" : ""}`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : isCurrent ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                          <Play className="h-4 w-4 fill-current" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-white">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm ${isCompleted ? "line-through" : ""} ${isCurrent ? "font-bold" : "font-medium"}`}
                      >
                        {title}
                      </p>
                      <p className="text-xs font-medium">
                        {estimated_minutes} min
                      </p>
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-lg border-2 border-black pb-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="font-bold">Learning Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="p-2.5 pt-0">
          <ul className="space-y-3">
            {course.learning_outcomes.map((outcome: string, index: number) => (
              <li
                key={index}
                className="flex items-start rounded-md border border-black bg-white p-2"
              >
                <CheckCircle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-sm font-medium">{outcome}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
