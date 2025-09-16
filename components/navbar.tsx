import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileButton from "./profile-button";

const Navbar = () => {
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

        <ProfileButton />
      </div>
    </header>
  );
};

export default Navbar;
