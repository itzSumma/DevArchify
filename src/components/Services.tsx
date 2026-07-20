"use client";

import { Cpu, Globe, Smartphone, Cloud, Shield, Bot, Database, Layout } from "lucide-react";
import { BorderCard } from "./ui/BorderCard";
import { motion } from "framer-motion";

const services = [
  { icon: Globe, label: "Web Apps", desc: "Full-stack web applications with Next.js, React, Node.js, and modern frameworks tailored to your requirements." },
  { icon: Smartphone, label: "Mobile Apps", desc: "Cross-platform mobile solutions with React Native, Flutter, and native integrations for iOS and Android." },
  { icon: Cloud, label: "Cloud & DevOps", desc: "Scalable cloud infrastructure, CI/CD pipelines, containerization, and deployment strategies." },
  { icon: Cpu, label: "AI / ML", desc: "AI-powered features, machine learning pipelines, LLM integrations, and intelligent automation." },
  { icon: Shield, label: "Cybersecurity", desc: "Security-first architecture with encryption, auth protocols, compliance frameworks, and threat modeling." },
  { icon: Bot, label: "SaaS Platforms", desc: "Multi-tenant SaaS architectures with billing, subscription management, and usage analytics." },
  { icon: Database, label: "Data Pipelines", desc: "Real-time data processing, ETL pipelines, data warehousing, and analytics infrastructure." },
  { icon: Layout, label: "UI Libraries", desc: "Component library design systems with accessibility, theming, and tree-shakeable exports." },
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

export default function Services() {
  return (
    <section className="bg-slate-950 py-20" id="services">
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
            Services We <span className="text-blue-500">Support</span>
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            From web apps to AI pipelines, we generate production-ready blueprints for every domain.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.08)}
            >
              <BorderCard className="h-full transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:bg-blue-500/20">
                    <s.icon className="size-6 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{s.label}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              </BorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
