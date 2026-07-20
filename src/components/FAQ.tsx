"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is DevArchify?",
    a: "DevArchify is an AI-powered platform that generates complete software architecture blueprints, database schemas, and folder structures from a simple project idea — turning minutes of planning into seconds.",
  },
  {
    q: "How does the AI generation work?",
    a: "You describe your project idea in plain language, and our AI analyzes it to produce a full-stack blueprint including tech stack recommendations, data models, API routes, and deployment architecture tailored to your requirements.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All project data is encrypted at rest and in transit. We never share your blueprints or project ideas with third parties, and you retain full ownership of everything you create.",
  },
  {
    q: "Can I collaborate with my team?",
    a: "Yes! DevArchify supports team collaboration out of the box. You can share blueprints, leave comments, and iterate together in real-time across your entire organization.",
  },
  {
    q: "What tech stacks are supported?",
    a: "We support a wide range including Next.js, React, Node.js, Python, Go, Rust, and more. Our AI adapts to your preferred stack and can generate blueprints for any modern framework.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes, we offer a free tier with up to 5 blueprint generations per month. Premium plans unlock unlimited generations, advanced features, priority support, and team collaboration tools.",
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-900/30 py-20" id="faq">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger(0.15)}
        >
          <h2 className="mb-4 text-4xl font-black text-white">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-slate-400">
            Everything you need to know about DevArchify.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.08)}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left font-medium text-white transition-colors hover:text-blue-400"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`size-5 text-slate-400 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-blue-500" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 leading-relaxed text-slate-400">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
