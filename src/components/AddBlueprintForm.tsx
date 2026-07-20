"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

const categories = [
  "Web Apps",
  "Mobile Apps",
  "Cloud & DevOps",
  "AI / ML",
  "Cybersecurity",
  "SaaS Platforms",
  "Data Pipelines",
  "UI Libraries",
];

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  category: z.string().min(1, "Please select a category"),
  techStack: z
    .string()
    .min(1, "Enter at least one technology")
    .refine(
      (val) => val.split(",").every((t) => t.trim().length > 0),
      "Each technology must be non-empty"
    ),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be under 500 characters"),
  prompt: z
    .string()
    .min(20, "Prompt must be at least 20 characters")
    .max(2000, "Prompt must be under 2000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ease = [0.22, 1, 0.36, 1] as const;

export default function AddBlueprintForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      techStack: "",
      description: "",
      prompt: "",
    },
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto max-w-2xl px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <Sparkles className="size-7 text-blue-500" />
          </div>
          <h1 className="mb-2 text-3xl font-black text-white md:text-4xl">
            Submit a <span className="text-blue-500">Blueprint</span>
          </h1>
          <p className="text-slate-400">
            Share your architecture blueprint with the community.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-500/20">
              <Check className="size-6 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Blueprint Submitted!</h2>
            <p className="mt-1 text-sm text-slate-400">
              Your blueprint is pending review. It will appear in the explore page
              once approved.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <Field label="Title" error={errors.title?.message}>
              <input
                {...register("title")}
                placeholder="E-Commerce Marketplace"
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </Field>

            <Field label="Category" error={errors.category?.message}>
              <select
                {...register("category")}
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Tech Stack"
              error={errors.techStack?.message}
              hint="Comma-separated, e.g. Next.js, MongoDB, Stripe"
            >
              <input
                {...register("techStack")}
                placeholder="Next.js, MongoDB, Stripe"
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </Field>

            <Field label="Description" error={errors.description?.message}>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe what your blueprint does and who it's for..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </Field>

            <Field label="AI Prompt" error={errors.prompt?.message}>
              <textarea
                {...register("prompt")}
                rows={5}
                placeholder="The exact prompt you used to generate this blueprint..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </Field>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full bg-blue-600 text-base hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Blueprint"}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      {hint && <p className="mb-2 text-xs text-slate-500">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
