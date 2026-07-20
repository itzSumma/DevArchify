"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-slate-950 py-20" id="newsletter">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-gradient-to-b from-blue-950/30 to-slate-950 p-10 text-center md:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <Mail className="size-7 text-blue-500" />
          </div>
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
            Stay <span className="text-blue-500">Ahead</span> of the Curve
          </h2>
          <p className="mx-auto mb-8 max-w-md text-slate-400">
            Get weekly tips, new blueprint releases, and architecture best
            practices delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 font-medium text-green-400">
              <Check className="size-5" />
              <span>You&apos;re subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="h-12 w-full whitespace-nowrap bg-blue-600 px-6 hover:bg-blue-700 sm:w-auto"
                >
                  Subscribe
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
