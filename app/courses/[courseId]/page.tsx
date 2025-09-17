import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourseAction } from "@/app/actions/course-actions";
import { ArrowLeft, AlertCircle } from "lucide-react";
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
      <div className="container max-w-4xl bg-white py-8">
        <div className="flex flex-col items-center justify-center gap-6 border-4 border-black bg-white p-8 py-16 text-center shadow-[8px_8px_0_0_rgb(0,0,0)]">
          <div className="rounded-full border-2 border-black bg-yellow-300 p-4">
            <AlertCircle className="h-12 w-12 text-black" />
          </div>
          <h2 className="border-b-4 border-black pb-2 text-3xl font-black text-black">
            Course Not Found
          </h2>
          <p className="border-2 border-black bg-gray-100 p-3 font-medium text-black">
            {result.error || "The course you're looking for doesn't exist."}
          </p>
          <Button
            asChild
            className="border-2 border-black bg-yellow-300 font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] hover:bg-yellow-400 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          >
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
