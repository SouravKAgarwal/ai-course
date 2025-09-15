import Link from "next/link";
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { neobrutalism } from "@clerk/themes";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white px-4 shadow-[4px_4px_0_0_rgb(0,0,0)] md:px-10">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="px-2 py-1 text-xl font-black tracking-tight">
            CourseGenAI
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="font-semibold">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/generator" className="font-semibold">
                Generator
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/courses" className="font-semibold">
                My Courses
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/pricing" className="font-semibold">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
              <UserButton appearance={{ theme: neobrutalism }} />
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
                <Link
                  href="/generator"
                  className="flex items-center font-semibold"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Generator
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center font-semibold"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  My Courses
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center font-semibold"
                >
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
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black shadow-[2px_2px_0_0_rgb(0,0,0)]">
                        <UserButton appearance={{ theme: neobrutalism }} />
                      </div>
                      <span className="truncate text-sm font-semibold">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                  </SignedIn>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
