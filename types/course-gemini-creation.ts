export interface CourseInput {
  keyword: string;
  chapters_count: number;
  max_words_description: number;
  max_words_chapter_text: number;
  include_quizzes: boolean;
  include_youtube: boolean;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Resource {
  type: "link" | "article" | "repo" | "pdf";
  title: string;
  url: string;
}

export interface Question {
  id: string;
  prompt: string;
  type: "single-choice" | "multi-choice" | "short-answer";
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface Quiz {
  questions: Question[];
}

export interface Chapter {
  index: number;
  title: string;
  summary: string;
  estimated_minutes: number;
  youtube_url: string | null;
  content_text: string;
  quiz?: Quiz;
  resources: Resource[];
}

export interface Course {
  id: string;
  courseId: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration_weeks: number;
  estimated_total_minutes: number;
  description: string;
  image_url: string | null;
  createdAt: Date;
  updatedAt?: Date;
  learning_outcomes: string[];
  chapters: any;
  progress?: {
    completed: boolean;
    currentChapter: number;
    progressPercentage: number;
    lastAccessed?: Date;
  };
}
