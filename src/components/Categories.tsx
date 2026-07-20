"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Bot,
  Database,
  Layout,
} from "lucide-react";

const categories = [
  { icon: Globe, label: "Web Apps", count: "120+ blueprints" },
  { icon: Smartphone, label: "Mobile Apps", count: "85+ blueprints" },
  { icon: Cloud, label: "Cloud & DevOps", count: "60+ blueprints" },
  { icon: Cpu, label: "AI / ML", count: "45+ blueprints" },
  { icon: Shield, label: "Cybersecurity", count: "30+ blueprints" },
  { icon: Bot, label: "SaaS Platforms", count: "95+ blueprints" },
  { icon: Database, label: "Data Pipelines", count: "50+ blueprints" },
  { icon: Layout, label: "UI Libraries", count: "40+ blueprints" },
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

export default function Categories() {
  return (
    <section className="bg-slate-900/30 py-20" id="categories">
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
            Explore by <span className="text-blue-500">Category</span>
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Find the perfect blueprint for your next project across every major
            domain and tech stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-blue-500/50"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.08)}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all group-hover:bg-blue-500/20">
                <cat.icon className="size-6 text-blue-500" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-white">
                {cat.label}
              </h3>
              <p className="text-sm text-slate-400">{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
