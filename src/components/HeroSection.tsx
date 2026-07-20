"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const words = ["Architect", "Blueprint", "Structure", "Design"];

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * delay, duration: 0.6, ease },
  }),
});

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 100);
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 50);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-10 pb-10 lg:pt-32 lg:pb-24">
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger(0.15)}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/30 px-4 py-1.5 text-sm font-medium text-blue-400">
            <Sparkles className="size-4" />
            <span>The Future of Project Architecture</span>
          </div>
        </motion.div>

        <motion.h1
          className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={stagger(0.15)}
        >
          {words[wordIndex].slice(0, charIndex)}
          <span className="animate-pulse text-blue-500">|</span> Your Next <br />
          <span className="text-blue-500">Big Idea</span> in Seconds.
        </motion.h1>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={stagger(0.15)}
        >
          Don&apos;t waste hours on boilerplate and planning. DevArchify AI
          generates complete blueprints, database schemas, and folder structures
          instantly.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={stagger(0.15)}
        >
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="h-14 w-full bg-blue-600 px-8 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 sm:w-auto"
              >
                Start Building Free <ArrowRight className="ml-2 size-5" />
              </Button>
            </motion.div>
          </Link>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full border-slate-700 bg-transparent px-8 text-lg text-white hover:bg-slate-900 sm:w-auto"
            >
              View Live Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
