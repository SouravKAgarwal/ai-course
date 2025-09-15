import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourseAction } from "@/app/actions/course-actions";
import MyCourses from "@/components/course/my-courses";

export default async function MyCoursesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const result = await getCourseAction(user.id);

  if (result.error) {
    console.error("Error fetching courses:", result.error);
  }

  return <MyCourses initialCourses={result.courses || []} />;
}
