"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-20" id="cta">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-gradient-to-b from-blue-950/30 to-slate-950 p-10 text-center md:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <Sparkles className="size-7 text-blue-500" />
          </div>
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
            Ready to <span className="text-blue-500">Architect</span> Your Next Project?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-slate-400">
            Join thousands of developers who are building smarter with AI-generated blueprints. Start free, upgrade when you scale.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-14 w-full bg-blue-600 px-8 text-base shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 sm:w-auto"
                >
                  Start Building Free <ArrowRight className="ml-2 size-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/explore">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 w-full border-slate-700 bg-transparent px-8 text-base text-white hover:bg-slate-900 sm:w-auto"
                >
                  Browse Blueprints
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
