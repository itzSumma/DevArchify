import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import PageTransition from "@/components/PageTransition";
import AIChat from "@/components/AIChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevArchify | AI-Powered Project Architecture",
    template: "%s | DevArchify",
  },
  description: "DevArchify helps developers plan, structure, and architect complex software projects using AI.",
  keywords: ["AI-Powered", "Software Architecture", "Project Planning", "DevArchify", "Next.js", "Web Development Tools"],
  authors: [{ name: "DevArchify Team" }],
  creator: "DevArchify",
  metadataBase: new URL("https://devarchify.com"),
  openGraph: {
    title: "DevArchify - AI-Powered Project Architect",
    description: "Streamline your development process with AI-driven project architecture and planning. Generate complete blueprints in seconds.",
    type: "website",
    url: "https://devarchify.com",
    siteName: "DevArchify",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevArchify - AI-Powered Project Architect",
    description: "Streamline your development process with AI-driven project architecture and planning.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <AIChat />
        </Providers>
      </body>
    </html>
  );
}