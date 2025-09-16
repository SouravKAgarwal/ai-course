"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { type Course } from "@/types/course-gemini-creation";
import { CourseCard } from "./course-card";
import { EmptyState } from "./empty-state";

interface MyCoursesClientProps {
  initialCourses: Course[];
}

export default function MyCourses({
  initialCourses: courses,
}: MyCoursesClientProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const applyFilters = () => {
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((course) => {
        if (statusFilter === "in-progress") {
          return course.progress && !course.progress.completed;
        } else if (statusFilter === "completed") {
          return course.progress && course.progress.completed;
        } else if (statusFilter === "not-started") {
          return !course.progress;
        }
        return true;
      });
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.level.toLowerCase() === levelFilter.toLowerCase(),
      );
    }

    setFilteredCourses(filtered);
  };

  useState(() => {
    applyFilters();
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    applyFilters();
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters();
  };

  const handleLevelFilterChange = (value: string) => {
    setLevelFilter(value);
    applyFilters();
  };

  const handleClearFilters = () => {
    setStatusFilter("all");
    setLevelFilter("all");
    setSearchQuery("");
    setFilteredCourses(courses);
  };

  return (
    <div className="container max-w-6xl bg-white py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight">My Courses</h1>
          <p className="font-medium text-black">
            Manage and continue learning from your created courses
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-black" />
              <Input
                placeholder="Search your courses..."
                className="border-2 border-black bg-white pl-10 shadow-[2px_2px_0_0_rgb(0,0,0)] ring-0 transition-all focus:outline-none focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-gray-100 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-4 border-black bg-white shadow-[6px_6px_0_0_rgb(0,0,0)]">
                <DropdownMenuLabel className="border-b-2 border-black pb-2 font-black text-black">
                  Status
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "all"}
                  onCheckedChange={() => handleStatusFilterChange("all")}
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  All Courses
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "not-started"}
                  onCheckedChange={() =>
                    handleStatusFilterChange("not-started")
                  }
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  Not Started
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "in-progress"}
                  onCheckedChange={() =>
                    handleStatusFilterChange("in-progress")
                  }
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "completed"}
                  onCheckedChange={() => handleStatusFilterChange("completed")}
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  Completed
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator className="bg-black" />

                <DropdownMenuLabel className="border-b-2 border-black pb-2 font-black text-black">
                  Level
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={levelFilter === "all"}
                  onCheckedChange={() => handleLevelFilterChange("all")}
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  All Levels
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={levelFilter === "beginner"}
                  onCheckedChange={() => handleLevelFilterChange("beginner")}
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  Beginner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={levelFilter === "intermediate"}
                  onCheckedChange={() =>
                    handleLevelFilterChange("intermediate")
                  }
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  Intermediate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={levelFilter === "advanced"}
                  onCheckedChange={() => handleLevelFilterChange("advanced")}
                  className="focus:bg-yellow-300 focus:text-black"
                >
                  Advanced
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            asChild
            className="border-2 border-black bg-yellow-300 font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-400 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          >
            <Link href="/generator">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </div>

        {/* Filter Status */}
        {(statusFilter !== "all" || levelFilter !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 border-2 border-black bg-gray-100 p-3 text-sm font-medium">
            <span className="text-black">Filtered by:</span>
            {statusFilter !== "all" && (
              <Badge className="border border-black bg-yellow-300 text-black">
                {statusFilter.replace("-", " ")}
              </Badge>
            )}
            {levelFilter !== "all" && (
              <Badge className="border border-black bg-yellow-300 text-black">
                {levelFilter}
              </Badge>
            )}
            {searchQuery && (
              <Badge className="border border-black bg-yellow-300 text-black">
                search: {searchQuery}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="ml-2 h-6 border border-black px-2 text-black hover:bg-yellow-300"
            >
              <X className="mr-1 h-3 w-3" />
              Clear all
            </Button>
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            hasCourses={courses.length > 0}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>
    </div>
  );
}
