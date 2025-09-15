import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourseAction } from "@/app/actions/course-actions";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseClient from "@/components/course/course-client";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const user = await currentUser();
  const { courseId } = await params;

  if (!user) redirect("/");

  const result = await getCourseAction(user.id, courseId);

  if (result.error || !result.course) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <BookOpen className="text-muted-foreground h-12 w-12" />
          <h2 className="text-2xl font-bold">Course Not Found</h2>
          <p className="text-muted-foreground">
            {result.error || "The course you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <CourseClient initialCourse={result.course} userId={user.id} />;
}
