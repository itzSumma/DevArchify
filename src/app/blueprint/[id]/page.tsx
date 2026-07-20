"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Download, Copy, Check, ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlueprintCard from "@/components/BlueprintCard";
import { getBlueprintById, getRelatedBlueprints } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlueprintDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const blueprint = getBlueprintById(id);
  const [copied, setCopied] = useState(false);

  if (!blueprint) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 pt-16">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-white">Blueprint not found</h2>
          <p className="mb-6 text-slate-400">The blueprint you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/explore">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-900">
              <ArrowLeft className="mr-2 size-4" /> Back to Explore
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const related = getRelatedBlueprints(blueprint.relatedIds);

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(blueprint.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Explore
          </Link>
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-white md:text-4xl">
              {blueprint.title}
            </h1>
            <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
              {blueprint.category}
            </span>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {blueprint.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4" />
              {blueprint.stars}
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="size-4" />
              {blueprint.downloads} downloads
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {blueprint.createdAt}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blueprint.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <h2 className="mb-4 text-xl font-bold text-white">Overview</h2>
              <p className="leading-relaxed text-slate-300">
                {blueprint.description}
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <h2 className="mb-6 text-xl font-bold text-white">
                Architecture Breakdown
              </h2>
              <div className="space-y-6">
                {blueprint.architecture.map((comp, i) => (
                  <div key={i} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5">
                    <h3 className="mb-1 text-lg font-semibold text-blue-400">
                      {comp.name}
                    </h3>
                    <p className="mb-3 text-sm text-slate-400">
                      {comp.description}
                    </p>
                    <ul className="space-y-1.5">
                      {comp.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-slate-300"
                        >
                          <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <h2 className="mb-4 text-lg font-bold text-white">Prompt</h2>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">
                {blueprint.prompt}
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleCopyPrompt}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" /> Copy Prompt
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <h2 className="mb-4 text-lg font-bold text-white">Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-sm text-slate-400">Stars</span>
                  <span className="font-semibold text-white">{blueprint.stars}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-sm text-slate-400">Downloads</span>
                  <span className="font-semibold text-white">{blueprint.downloads}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-sm text-slate-400">Category</span>
                  <span className="font-semibold text-blue-400">{blueprint.category}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-sm text-slate-400">Components</span>
                  <span className="font-semibold text-white">{blueprint.architecture.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <h2 className="mb-8 text-2xl font-bold text-white">
              Related <span className="text-blue-500">Blueprints</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((bp) => (
                <BlueprintCard key={bp.id} blueprint={bp} index={0} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
