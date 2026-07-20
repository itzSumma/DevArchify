"use client";

import { BorderCard } from "./ui/BorderCard";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Describe Your Idea",
    desc: "Tell our AI what you want to build — a SaaS platform, mobile app, or microservice. The more context you give, the better the blueprint.",
  },
  {
    id: "02",
    title: "AI Generates Blueprint",
    desc: "Within seconds you receive a complete architecture: tech stack, database schema, folder structure, API routes, and deployment strategy.",
  },
  {
    id: "03",
    title: "Iterate & Build",
    desc: "Use the agentic chat to refine every layer of your architecture. Ask questions, request changes, and export when ready.",
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

export default function HowItWorks() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-16 text-center text-4xl font-bold tracking-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger(0.15)}
        >
          How It <span className="text-blue-500">Works</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.12)}
            >
              <BorderCard className="h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/20 text-2xl font-bold text-blue-400 transition-transform duration-500 group-hover:scale-110">
                    {step.id}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </BorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
