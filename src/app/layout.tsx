import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevArchify | AI-Powered Project Architecture",
  description: "DevArchify helps developers plan, structure, and architect complex software projects using AI.",
  keywords: ["AI-Powered", "Software Architecture", "Project Planning", "DevArchify", "Next.js", "Web Development Tools"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "DevArchify - AI-Powered Project Architect",
    description: "Streamline your development process with AI-driven project architecture and planning.",
    type: "website",
    url: "https://yourdomain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* এখানে সঠিক ক্লোজিং ট্যাগটি ব্যবহার করা হয়েছে */}
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}