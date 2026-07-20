"use client";

import { motion } from "framer-motion";
import { Star, Clock, User } from "lucide-react";
import Link from "next/link";

export interface Blueprint {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  author: string;
  stars: number;
  createdAt: string;
}

interface BlueprintCardProps {
  blueprint: Blueprint;
  index: number;
}

export default function BlueprintCard({ blueprint, index }: BlueprintCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blueprint/${blueprint.id}`}>
        <div className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              {blueprint.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="size-3.5" />
              {blueprint.stars}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {blueprint.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400 flex-1">
            {blueprint.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {blueprint.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <User className="size-3.5" />
              {blueprint.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {blueprint.createdAt}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
