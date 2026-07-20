"use client";

import { Search, Notebook, Shield, Code2 } from "lucide-react";
import { BorderCard } from "./ui/BorderCard";
import { motion } from "framer-motion";

const features = [
  {
    title: "Lightning-fast Search",
    icon: Search,
    desc: "Find any blueprint across thousands of community submissions in milliseconds. Filter by category, tech stack, popularity, or recency.",
  },
  {
    title: "Smart Prompt Management",
    icon: Notebook,
    desc: "Save, organize, and reuse your best AI prompts. Build a personal library of architecture patterns that evolve with your projects.",
  },
  {
    title: "Secure Collaborative Blueprints",
    icon: Shield,
    desc: "Share blueprints with your team with granular permissions. Role-based access ensures only the right people can edit or approve.",
  },
  {
    title: "Developer-Focused UI",
    icon: Code2,
    desc: "Every interface is built for developers by developers — dark mode, keyboard shortcuts, copy-friendly code blocks, and minimal clicks.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * delay, duration: 0.6, ease },
  }),
});

export default function Features() {
  return (
    <section className="bg-slate-950 py-20" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger(0.15)}
        >
          <h2 className="mb-4 text-4xl font-black text-white">
            Platform <span className="text-blue-500">Features</span>
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Tools and workflows designed to make blueprint discovery, sharing,
            and iteration seamless for every developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.1)}
            >
              <BorderCard className="h-full transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-full flex-col">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-transform duration-500 group-hover:scale-110">
                    <f.icon className="size-6 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {f.desc}
                  </p>
                </div>
              </BorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
