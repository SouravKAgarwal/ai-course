import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Calendar, User, Play } from "lucide-react";
import { Course } from "@/types/course-gemini-creation";
import { cn, getLevelColor } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

const PieChartProgress = ({
  percentage,
  size = 40,
}: {
  percentage: number;
  size?: number;
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {percentage}%
      </div>
    </div>
  );
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="h-full">
      <Card className="group relative flex h-full flex-col gap-3 overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0_0_#000] transition-all duration-300 hover:shadow-[12px_12px_0_0_#000]">
        <CardHeader className="relative z-10 pb-3">
          <div className="mb-2 flex items-start justify-between">
            <Badge
              className={cn(
                getLevelColor(course.level),
                "border-2 border-black font-bold transition-colors duration-300 group-hover:scale-105",
              )}
            >
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>

            <div className="text-muted-foreground flex items-center text-xs font-bold">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(course.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <CardTitle className="group-hover:text-primary flex items-center gap-4 text-xl font-bold transition-all duration-300">
            <span className="line-clamp-2">{course.title}</span>
            {course.progress && (
              <PieChartProgress
                percentage={course.progress.progressPercentage}
              />
            )}
          </CardTitle>

          <CardDescription className="mt-2 line-clamp-2 font-medium">
            {course.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 flex-grow pt-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="text-muted-foreground flex items-center text-xs font-bold">
              <Clock className="mr-1 h-3 w-3" />
              {course.estimated_total_minutes} min
            </div>
            <span>&#x2022;</span>
            <div className="text-muted-foreground flex items-center text-xs font-bold">
              <User className="mr-1 h-3 w-3" />
              {course.category}
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 flex gap-2">
          <div className="flex-1">
            <Button
              asChild
              className="w-full border-2 border-black bg-white font-bold text-black shadow-[4px_4px_0_0_#000] transition-all hover:bg-black hover:text-white hover:shadow-[2px_2px_0_0_#000]"
              size="sm"
            >
              <Link href={`/courses/${course.courseId}`}>
                {course.progress ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning
                  </>
                )}
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
