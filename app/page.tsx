import Link from "next/link";
import Image from "next/image";
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

export const revalidate = 60;

const features = [
  {
    icon: <Zap className="h-6 w-6 text-black" />,
    title: "Lightning Fast",
    description: "Generate complete course outlines in seconds, not hours",
  },
  {
    icon: <Brain className="h-6 w-6 text-black" />,
    title: "AI-Powered",
    description: "Advanced algorithms create pedagogically sound content",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-black" />,
    title: "Expert Quality",
    description: "Courses that meet educational standards and best practices",
  },
];

const steps = [
  {
    number: 1,
    title: "Describe Your Topic",
    description:
      "Tell us what you want to teach or provide some basic information about your subject.",
  },
  {
    number: 2,
    title: "AI Generates Content",
    description:
      "Our AI analyzes your topic and creates a structured curriculum with learning objectives.",
  },
  {
    number: 3,
    title: "Customize & Export",
    description:
      "Refine the generated content and export it to your preferred format.",
  },
];

const testimonials = [
  {
    text: "This platform saved me dozens of hours in course planning. The AI suggestions were incredibly relevant.",
    name: "Sarah Johnson",
    role: "University Professor",
  },
  {
    text: "As a corporate trainer, I need to create courses quickly. This tool has been a game-changer for our team.",
    name: "Michael Chen",
    role: "Training Manager",
  },
  {
    text: "The quality of the generated content surprised me. It's well-structured and pedagogically sound.",
    name: "Emma Rodriguez",
    role: "Online Educator",
  },
];

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
            <span className="text-red-600">in Seconds</span>
          </h1>
          <p className="desc">
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
          <div className="flex h-[200px] w-full items-center justify-center overflow-hidden md:h-[450px]">
            <Image
              src="/generator.webp"
              width={786}
              height={450}
              alt="Preview"
              priority
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRqYDAABXRUJQVlA4WAoAAAAgAAAAFwIAJAEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDhMuAEAAC8XAkkAByKQTXb+0BPYxV2c/+ywQ4IAsEngFIKVm7u7L4U00OLy/1/pfWCSiP4TSNqY4HuMdV3XdV2XZVmWZZnneZ6naRrHcRyGoe/7ruvatmka751zdV1XVcVsrbVEVJZlWRRFYYwxxhhERERERERERERjLpOK4thXluUxlYiIiKy11tojgZmZmZmZmZmZmfkcd952ySQiIiIiIiIiIiIiulTcnlBVVVXVdV3Xzjnnvfe+aZqmadq2bdu2bduu67qu2z+9DmmOa0/fXq/dbj1ONYi/f/38+eP7t29fv3z+/Onjh/fv3r198/rVyxcvnj97+uTxo0cPH9y/d+/unZubXOssS5MkjqMIAMIwDIIgUEoppZRSSimllFIqOOaEYRgCAERRFMVxHCdJkqRpmmZZlmWZ1lprrbXWWud5nue3DdnjztvS9NiZbIOP0njbfuRG0dZxigYAAAAAAAAAOCUeu66dl9Zr7hZxjb5Uif/Ef+I/8Z/4T/wn/hP/if/Ef+I/8Z/4T/wn/hP/if/Ef+I/8Z/4T/wn/hP/if/Ef+I/8Z/4T/wn/hP/if/Ef+I/8Z/47w8h8V8G"
              sizes="(max-width: 768px) 100vw, 786px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="section-title">Why Choose CourseGenAI</h2>
          <p className="desc">
            Our AI-powered platform takes the hassle out of course creation, so
            you can focus on teaching.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="card-style">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="rounded-full border-2 border-black bg-red-400 p-3">
                    {f.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-black">{f.title}</CardTitle>
                <CardDescription className="desc text-base">
                  {f.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="desc">
            Creating a course has never been easier. Just follow these simple
            steps.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className="card-style flex flex-col items-center gap-4 p-6 text-center hover:shadow-[8px_8px_0_0_rgb(0,0,0)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-red-400 font-black text-black">
                {s.number}
              </div>
              <h3 className="text-xl font-black">{s.title}</h3>
              <p className="desc text-base">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="desc">
            Join thousands of educators and content creators who are
            transforming their teaching.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="card-style">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-yellow-400 text-black"
                    />
                  ))}
                </div>
                <p className="mb-4 border-2 border-black bg-gray-100 p-3 font-medium italic">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-yellow-300">
                    <Users className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-black">{t.name}</p>
                    <p className="desc text-sm">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-4 rounded-lg border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0_0_rgb(0,0,0)] md:p-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to Create Your Course?
          </h2>
          <p className="desc">
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
            {["No credit card required", "Free plan available"].map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1"
                >
                  <CheckCircle className="h-4 w-4 text-black" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
