import { getCourseAction } from "@/app/actions/course-actions";
import { CourseCard } from "@/components/course/course-card";
import { EmptyState } from "@/components/course/empty-state";

export const revalidate = 60;

export default async function MyCoursesPage() {
  const coursesData = await getCourseAction();
  const courses = coursesData.courses ? coursesData.courses : [];

  return (
    <div className="container max-w-6xl bg-white py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight">My Courses</h1>
          <p className="font-medium text-black">
            Manage and continue learning from your created courses
          </p>
        </div>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
