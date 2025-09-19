import { Metadata } from "next";
import { Suspense } from "react";
import CourseGenerator from "@/components/course/course-generator";
import { Award, Clock, Sparkles, Target, Users } from "lucide-react";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "AI Course Generator - Create Educational Courses Instantly",
  description:
    "Generate comprehensive educational courses in seconds with AI. Create structured learning content with quizzes, videos, and detailed chapters for any topic.",
  keywords: [
    "AI course generator",
    "educational content creation",
    "online course maker",
    "learning management",
    "AI education tool",
    "course creation platform",
    "educational AI",
    "automated course builder",
    "e-learning course creator",
    "AI-powered curriculum design",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AI Course Generator - Create Educational Courses Instantly",
    description:
      "Generate comprehensive educational courses in seconds with AI. Create structured learning content with quizzes, videos, and detailed chapters for any topic.",
    url: "https://ai-course-builder-tau.vercel.app/generator",
    siteName: "CourseGenAI",
    images: [
      {
        url: "https://ai-course-builder-tau.vercel.app/generator.webp",
        width: 1200,
        height: 630,
        alt: "AI Course Generator Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Course Generator - Create Educational Courses Instantly",
    description:
      "Generate comprehensive educational courses in seconds with AI.",
    images: ["https://ai-course-builder-tau.vercel.app/generator.webp"],
  },
  alternates: {
    canonical: "https://ai-course-builder-tau.vercel.app/generator",
  },
};

function CourseGeneratorSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl bg-white py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-48 animate-pulse rounded-full bg-gray-200"></div>
          <div className="mx-auto mb-4 h-12 w-96 animate-pulse bg-gray-200"></div>
          <div className="mx-auto h-6 w-64 animate-pulse bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-96 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default function CourseGeneratorPage() {
  return (
    <Suspense fallback={<CourseGeneratorSkeleton />}>
      <div className="container mx-auto max-w-7xl bg-white px-4 py-8">
        <div className="flex flex-col gap-8">
          <header className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-6 py-2 font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)]">
              <Sparkles className="h-5 w-5" />
              <span>AI Powered</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-black md:text-5xl">
              AI Course Generator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-black">
              Create comprehensive educational courses in seconds with AI.
              Generate structured learning content with quizzes, videos, and
              detailed chapters for any topic.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-gray-50 p-4">
                <Clock className="h-6 w-6 text-black" />
                <span className="text-sm font-bold text-black">
                  Instant Generation
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-gray-50 p-4">
                <Users className="h-6 w-6 text-black" />
                <span className="text-sm font-bold text-black">
                  All Skill Levels
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-gray-50 p-4">
                <Award className="h-6 w-6 text-black" />
                <span className="text-sm font-bold text-black">
                  With Quizzes
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-gray-50 p-4">
                <Target className="h-6 w-6 text-black" />
                <span className="text-sm font-bold text-black">
                  Custom Content
                </span>
              </div>
            </div>
          </header>
          <CourseGenerator />
        </div>
      </div>
    </Suspense>
  );
}
