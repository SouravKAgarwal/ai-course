import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Brain,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 bg-white py-10 md:gap-24">
      <section className="flex flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center rounded-full border-2 border-black bg-yellow-300 px-4 py-1 text-sm font-bold text-black shadow-[2px_2px_0_0_rgb(0,0,0)]">
            <Zap className="mr-2 h-4 w-4 fill-black text-black" />
            AI-Powered Course Generation
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Create Stunning Courses{" "}
            <span className="text-red-400">in Seconds</span>
          </h1>
          <p className="max-w-[700px] text-lg font-medium text-black sm:text-xl">
            Turn any topic into a structured, engaging curriculum with our
            advanced AI technology. Perfect for educators, trainers, and content
            creators.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-2 border-2 border-black bg-yellow-300 text-base font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-yellow-400 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          >
            <Link href="/generator">
              Generate Your Course
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-black bg-white text-base font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-gray-100 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          >
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
        <div className="mt-8 rounded-xl border-4 border-black bg-white shadow-[8px_8px_0_0_rgb(0,0,0)]">
          <div className="overflow-hidden">
            <div className="flex h-[450px] w-full items-center justify-center">
              <Image
                src="/generator.jpeg"
                width={786}
                height={96}
                alt="Preview"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="mx-auto w-fit px-4 py-2 text-3xl font-black tracking-tight sm:text-4xl">
            Why Choose CourseGenAI
          </h2>
          <p className="mx-auto max-w-[700px] font-medium text-black">
            Our AI-powered platform takes the hassle out of course creation, so
            you can focus on teaching.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="flex flex-col border-4 border-black bg-white text-center shadow-[6px_6px_0_0_rgb(0,0,0)] transition-all hover:shadow-[8px_8px_0_0_rgb(0,0,0)]">
            <CardHeader>
              <div className="flex justify-center">
                <div className="rounded-full border-2 border-black bg-red-400 p-3">
                  <Zap className="h-6 w-6 text-black" />
                </div>
              </div>
              <CardTitle className="text-xl font-black">
                Lightning Fast
              </CardTitle>
              <CardDescription className="font-medium text-black">
                Generate complete course outlines in seconds, not hours
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-4 border-black bg-white text-center shadow-[6px_6px_0_0_rgb(0,0,0)] transition-all hover:shadow-[8px_8px_0_0_rgb(0,0,0)]">
            <CardHeader>
              <div className="flex justify-center">
                <div className="rounded-full border-2 border-black bg-red-400 p-3">
                  <Brain className="h-6 w-6 text-black" />
                </div>
              </div>
              <CardTitle className="text-xl font-black">AI-Powered</CardTitle>
              <CardDescription className="font-medium text-black">
                Advanced algorithms create pedagogically sound content
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-4 border-black bg-white text-center shadow-[6px_6px_0_0_rgb(0,0,0)] transition-all hover:shadow-[8px_8px_0_0_rgb(0,0,0)]">
            <CardHeader>
              <div className="flex justify-center">
                <div className="rounded-full border-2 border-black bg-red-400 p-3">
                  <GraduationCap className="h-6 w-6 text-black" />
                </div>
              </div>
              <CardTitle className="text-xl font-black">
                Expert Quality
              </CardTitle>
              <CardDescription className="font-medium text-black">
                Courses that meet educational standards and best practices
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="mx-auto w-fit px-4 py-2 text-3xl font-black tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] font-medium text-black">
            Creating a course has never been easier. Just follow these simple
            steps.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-red-400 font-black text-black">
              1
            </div>
            <h3 className="text-xl font-black">Describe Your Topic</h3>
            <p className="font-medium text-black">
              Tell us what you want to teach or provide some basic information
              about your subject.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-red-400 font-black text-black">
              2
            </div>
            <h3 className="text-xl font-black">AI Generates Content</h3>
            <p className="font-medium text-black">
              Our AI analyzes your topic and creates a structured curriculum
              with learning objectives.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-red-400 font-black text-black">
              3
            </div>
            <h3 className="text-xl font-black">Customize & Export</h3>
            <p className="font-medium text-black">
              Refine the generated content and export it to your preferred
              format.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="mx-auto w-fit px-4 py-2 text-3xl font-black tracking-tight sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-[700px] font-medium text-black">
            Join thousands of educators and content creators who are
            transforming their teaching.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-4 border-black bg-white shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <CardContent className="pt-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-black"
                  />
                ))}
              </div>
              <p className="mb-4 border-2 border-black bg-gray-100 p-3 font-medium italic">
                &quot;This platform saved me dozens of hours in course planning.
                The AI suggestions were incredibly relevant.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-yellow-300">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="font-black">Sarah Johnson</p>
                  <p className="text-sm font-medium text-black">
                    University Professor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-4 border-black bg-white shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <CardContent className="pt-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-black"
                  />
                ))}
              </div>
              <p className="mb-4 border-2 border-black bg-gray-100 p-3 font-medium italic">
                &quot;As a corporate trainer, I need to create courses quickly.
                This tool has been a game-changer for our team.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-yellow-300">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="font-black">Michael Chen</p>
                  <p className="text-sm font-medium text-black">
                    Training Manager
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-4 border-black bg-white shadow-[6px_6px_0_0_rgb(0,0,0)]">
            <CardContent className="pt-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-black"
                  />
                ))}
              </div>
              <p className="mb-4 border-2 border-black bg-gray-100 p-3 font-medium italic">
                &quot;The quality of the generated content surprised me.
                It&apos;s well-structured and pedagogically sound.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-yellow-300">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="font-black">Emma Rodriguez</p>
                  <p className="text-sm font-medium text-black">
                    Online Educator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-4 rounded-lg border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0_0_rgb(0,0,0)] md:p-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to Create Your Course?
          </h2>
          <p className="max-w-[600px] font-medium text-black">
            Join thousands of educators and trainers who are saving time and
            enhancing their teaching with AI.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 border-2 border-black bg-white font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-gray-100 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          >
            <Link href="/sign-up">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex flex-col items-center gap-4 text-sm font-medium text-black sm:flex-row">
            <div className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1">
              <CheckCircle className="h-4 w-4 text-black" />
              No credit card required
            </div>
            <div className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1">
              <CheckCircle className="h-4 w-4 text-black" />
              Free plan available
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
