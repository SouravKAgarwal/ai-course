import Link from "next/link";
import { Twitter, Github, Youtube, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t-4 border-black bg-white">
      <div className="container px-4 py-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="px-3 py-1 text-sm font-medium text-black">
            © {new Date().getFullYear()} CourseGenAI. All rights reserved.
          </p>
          <div className="flex gap-3">
            <Link
              href="/"
              title="Twitter"
              aria-label="twitter"
              className="border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              title="Github"
              aria-label="github"
              className="border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              title="Youtube"
              aria-label="youtube"
              className="border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              title="Linkedin"
              aria-label="linkedin"
              className="border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              title="Instagram"
              aria-label="instagram"
              className="border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_0_rgb(0,0,0)] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_rgb(0,0,0)]"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
