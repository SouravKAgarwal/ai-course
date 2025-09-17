import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Merriweather } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const merriweather = Merriweather({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const metadata = {
  title: "Course Builder",
  description: "course builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={merriweather.className}>
          <div className="min-h-screen">
            <Navbar />
            <main className="mx-auto min-h-[calc(100svh-64px)] max-w-7xl px-4 md:px-10">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
