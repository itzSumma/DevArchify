"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const chartData = [
  { month: "Jan", blueprints: 40 },
  { month: "Feb", blueprints: 65 },
  { month: "Mar", blueprints: 95 },
  { month: "Apr", blueprints: 140 },
  { month: "May", blueprints: 185 },
  { month: "Jun", blueprints: 250 },
];

const stats = [
  { label: "Blueprints Generated", value: "2.5K+" },
  { label: "Active Developers", value: "1,200+" },
  { label: "Tech Stacks Supported", value: "18+" },
  { label: "Uptime", value: "99.9%" },
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

function StatsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <div className="mx-auto mb-2 h-10 w-20 rounded bg-slate-800" />
            <div className="mx-auto h-4 w-32 rounded bg-slate-800" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
        <div className="mx-auto mb-6 h-5 w-48 rounded bg-slate-800" />
        <div className="h-[280px] w-full rounded-lg bg-slate-800" />
      </div>
    </div>
  );
}

export default function Stats() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-950 py-20" id="stats">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center animate-pulse">
            <div className="mx-auto mb-4 h-10 w-72 rounded-lg bg-slate-800" />
            <div className="mx-auto h-5 w-56 rounded bg-slate-800" />
          </div>
          <StatsSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 py-20" id="stats">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger(0.15)}
        >
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
            Trusted by <span className="text-blue-500">Developers</span>
          </h2>
          <p className="text-slate-400">
            Real numbers from a platform built by developers, for developers.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              variants={stagger(0.1)}
            >
              <div className="mb-2 text-4xl font-black text-white transition-colors group-hover:text-blue-500">
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
          variants={stagger(0.15)}
        >
          <h3 className="mb-6 text-center text-lg font-semibold text-white">
            Monthly Blueprint Growth
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={13} />
              <YAxis stroke="#64748b" fontSize={13} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(59,130,246,0.1)" }}
              />
              <Bar
                dataKey="blueprints"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
