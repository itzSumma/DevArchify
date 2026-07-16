import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Inter ফন্ট ইমপোর্ট
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Inter ফন্ট সেটআপ
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevArchify | AI-Powered Project Architecture",
  description: "DevArchify helps developers plan, structure, and architect complex software projects using AI. Automate your project documentation, folder structure, and technical requirements effortlessly.",
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
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}