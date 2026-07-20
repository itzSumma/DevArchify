"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import BlueprintCard from "./BlueprintCard";
import ExploreSkeleton from "./ExploreSkeleton";
import type { Blueprint } from "./BlueprintCard";

const allBlueprints: Blueprint[] = [
  { id: "1", title: "E-Commerce Marketplace", description: "Full-stack marketplace platform with multi-vendor support, real-time inventory, Stripe payments, and admin dashboard.", category: "Web Apps", techStack: ["Next.js", "MongoDB", "Stripe"], author: "Alex Rivera", stars: 342, createdAt: "2 days ago" },
  { id: "2", title: "AI Chat Dashboard", description: "Real-time chat application with AI-powered responses, user authentication, message history, and WebSocket integration.", category: "AI / ML", techStack: ["React", "Python", "WebSocket"], author: "Maya Chen", stars: 281, createdAt: "5 days ago" },
  { id: "3", title: "Cloud Cost Analyzer", description: "Multi-cloud cost tracking and optimization tool with real-time dashboards, budget alerts, and usage forecasting.", category: "Cloud & DevOps", techStack: ["Go", "AWS", "React"], author: "David Kim", stars: 195, createdAt: "1 week ago" },
  { id: "4", title: "Fitness Tracker App", description: "Cross-platform mobile fitness application with workout logging, progress tracking, social features, and wearable integration.", category: "Mobile Apps", techStack: ["React Native", "Node.js", "PostgreSQL"], author: "Sarah Okafor", stars: 167, createdAt: "1 week ago" },
  { id: "5", title: "SaaS Subscription Manager", description: "Complete billing and subscription management platform with tiered pricing, usage metering, invoicing, and customer portal.", category: "SaaS Platforms", techStack: ["Next.js", "Stripe", "MongoDB"], author: "James Hart", stars: 423, createdAt: "3 days ago" },
  { id: "6", title: "Security Audit Pipeline", description: "Automated security scanning pipeline with vulnerability detection, compliance reporting, and remediation tracking.", category: "Cybersecurity", techStack: ["Python", "Docker", "PostgreSQL"], author: "Priya Nair", stars: 156, createdAt: "2 weeks ago" },
  { id: "7", title: "Real-Time Data Pipeline", description: "Streaming data pipeline with Apache Kafka, real-time transformations, and dashboard visualizations for analytics teams.", category: "Data Pipelines", techStack: ["Python", "Kafka", "React"], author: "Tomás Silva", stars: 234, createdAt: "4 days ago" },
  { id: "8", title: "Component Library Starter", description: "Production-ready UI component library with Storybook, accessibility, theming, and tree-shakeable exports.", category: "UI Libraries", techStack: ["React", "TypeScript", "Tailwind"], author: "Emma Watson", stars: 512, createdAt: "1 day ago" },
  { id: "9", title: "Microservice Orchestrator", description: "Service mesh orchestration platform with auto-scaling, circuit breaking, distributed tracing, and health monitoring.", category: "Cloud & DevOps", techStack: ["Go", "Docker", "Kubernetes"], author: "Raj Patel", stars: 189, createdAt: "6 days ago" },
  { id: "10", title: "Social Media Scheduler", description: "Multi-platform content scheduling app with AI caption generation, analytics, team collaboration, and auto-posting.", category: "SaaS Platforms", techStack: ["Next.js", "PostgreSQL", "Redis"], author: "Lena Schmidt", stars: 278, createdAt: "3 days ago" },
  { id: "11", title: "Medical Records System", description: "HIPAA-compliant electronic health records system with patient portals, appointment scheduling, and e-prescriptions.", category: "Web Apps", techStack: ["React", "Node.js", "MongoDB"], author: "Dr. Karen Lee", stars: 145, createdAt: "1 week ago" },
  { id: "12", title: "ML Model Registry", description: "Machine learning model versioning, deployment, and monitoring platform with A/B testing and drift detection.", category: "AI / ML", techStack: ["Python", "Docker", "FastAPI"], author: "Yuki Tanaka", stars: 367, createdAt: "2 days ago" },
];

const allCategories = [...new Set(allBlueprints.map((b) => b.category))];
const allTechStacks = [...new Set(allBlueprints.flatMap((b) => b.techStack))].sort();

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
];

const ITEMS_PER_PAGE = 8;

export default function ExploreGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [techStack, setTechStack] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...allBlueprints];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((b) => b.category === category);
    }

    if (techStack !== "All") {
      result = result.filter((b) => b.techStack.includes(techStack));
    }

    if (sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result.sort((a, b) => b.stars - a.stars);
    }

    return result;
  }, [search, category, techStack, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, category, techStack, sort]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Explore <span className="text-blue-500">Blueprints</span>
          </h1>
          <p className="mx-auto max-w-xl text-slate-400">
            Browse community-built architecture blueprints or find the perfect
            starting point for your next project.
          </p>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blueprints by name or description..."
              className="h-13 w-full rounded-2xl border border-slate-800 bg-slate-900/50 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-3 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors md:hidden"
          >
            <SlidersHorizontal className="size-4" />
            {showFilters ? "Hide filters" : "Show filters"}
          </button>

          <div className={`flex flex-wrap items-center gap-3 ${showFilters ? "flex" : "hidden md:flex"}`}>
            <FilterSelect
              label="Category"
              value={category}
              onChange={setCategory}
              options={["All", ...allCategories]}
            />
            <FilterSelect
              label="Tech Stack"
              value={techStack}
              onChange={setTechStack}
              options={["All", ...allTechStacks]}
            />
            <div className="ml-auto" />
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="hidden sm:inline">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <ExploreSkeleton />
        ) : paginated.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-400">No blueprints found.</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-500">
              Showing {paginated.length} of {filtered.length} blueprints
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paginated.map((blueprint, i) => (
                <BlueprintCard key={blueprint.id} blueprint={blueprint} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex size-10 items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-800 text-slate-400 hover:border-blue-500/50 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-2xl border border-slate-800 bg-slate-900 pl-4 pr-10 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "All" ? `All ${label === "Category" ? "Categories" : "Tech Stacks"}` : opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
