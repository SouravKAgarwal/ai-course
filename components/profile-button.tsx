"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <Button
          asChild
          variant="secondary"
          className="border-2 border-black bg-white text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-gray-100 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
        >
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button
          asChild
          className="border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-yellow-400 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
        >
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="h-8 w-8 rounded-full border-2 border-black shadow-[2px_2px_0_0_rgb(0,0,0)]">
          <UserButton />
        </div>
      </SignedIn>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgb(0,0,0)] hover:bg-gray-100 hover:shadow-[4px_4px_0_0_rgb(0,0,0)] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] border-l-4 border-black bg-white px-4 py-5 sm:w-[400px] md:px-10"
        >
          <nav className="mt-8 flex flex-col gap-4">
            <Link href="/generator" className="flex items-center font-semibold">
              <BookOpen className="mr-2 h-5 w-5" />
              Generator
            </Link>
            <Link href="/courses" className="flex items-center font-semibold">
              <GraduationCap className="mr-2 h-5 w-5" />
              My Courses
            </Link>
            <Link href="/pricing" className="flex items-center font-semibold">
              <DollarSign className="mr-2 h-5 w-5" />
              Pricing
            </Link>
            <div className="mt-4 flex flex-col gap-3">
              <SignedOut>
                <Button
                  asChild
                  variant="secondary"
                  className="border-2 border-black bg-white text-black shadow-[2px_2px_0_0_rgb(0,0,0)] hover:bg-gray-100 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] hover:bg-yellow-400 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black shadow-[2px_2px_0_0_rgb(0,0,0)]">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileButton;
