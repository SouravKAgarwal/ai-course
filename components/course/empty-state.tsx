import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  hasCourses: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({ hasCourses, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <BookOpen className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">
        {hasCourses ? "No courses match your filters" : "No courses yet"}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {hasCourses
          ? "Try adjusting your filters or search query to find what you're looking for."
          : "You haven't created any courses yet. Start by creating your first AI-powered course."}
      </p>
      {hasCourses ? (
        <Button onClick={onClearFilters} variant="outline">
          Clear Filters
        </Button>
      ) : (
        <Button asChild>
          <Link href="/generator">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Course
          </Link>
        </Button>
      )}
    </div>
  );
}
