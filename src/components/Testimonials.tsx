"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    company: "TechFlow Inc.",
    avatar: "SC",
    text: "DevArchify cut our project planning time by 70%. The AI-generated blueprints gave us a crystal-clear roadmap from day one, and the agentic chat helped us refine every layer before writing a single line of code.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    company: "StartupLabs",
    avatar: "MJ",
    text: "As a CTO evaluating architecture tools, DevArchify stood out immediately. The suggestions are production-ready and the MongoDB schema generation alone saved us weeks of back-and-forth.",
  },
  {
    name: "Priya Patel",
    role: "Software Architect",
    company: "CloudNine Systems",
    avatar: "PP",
    text: "I've tried every architecture planner on the market. DevArchify is the only one that understands complex domain relationships and generates blueprints that actually reflect real-world constraints.",
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

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-20" id="testimonials">
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
            What <span className="text-blue-500">Developers</span> Say
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Join thousands of developers who have transformed their workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.12)}
            >
              <Quote className="mb-4 size-8 text-blue-500/30" />
              <p className="mb-8 leading-relaxed text-slate-300">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/20 text-sm font-bold text-blue-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
