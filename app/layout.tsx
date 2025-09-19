import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Merriweather } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const merriweather = Merriweather({
  subsets: ["latin"],
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
          <Toaster
            position="top-right"
            richColors
            closeButton
            theme="light"
            expand={true}
            toastOptions={{
              duration: 4000,
              style: {
                border: "2px solid #000",
                boxShadow: "4px 4px 0 0 rgb(0,0,0)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
