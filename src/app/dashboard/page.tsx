"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FolderOpen, Clock, Plus, ArrowRight, FileEdit, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import RoleCheck from "@/components/RoleCheck";

const stats = [
  { label: "Total Blueprints", value: "12", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Active Projects", value: "4", icon: FolderOpen, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Pending Tasks", value: "3", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

const recentBlueprints = [
  { id: "1", title: "E-Commerce Marketplace", status: "Approved", updated: "2 days ago" },
  { id: "5", title: "SaaS Subscription Manager", status: "Approved", updated: "3 days ago" },
  { id: "10", title: "Social Media Scheduler", status: "Draft", updated: "5 days ago" },
  { id: "2", title: "AI Chat Dashboard", status: "Pending", updated: "1 week ago" },
];

const statusColors: Record<string, string> = {
  Approved: "text-green-400",
  Draft: "text-slate-400",
  Pending: "text-yellow-400",
};

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * delay, duration: 0.6, ease },
  }),
});

function DashboardContent() {
  const { user } = useAuth();
  const name = user?.name || "Developer";
  const isAdmin = user?.role === "admin";

  return (
    <section className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="text-3xl font-black text-white md:text-4xl">
            Welcome back, <span className="text-blue-500">{name}</span>
          </h1>
          <p className="mt-2 text-slate-400">
            Here&apos;s an overview of your blueprint activity.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              initial="hidden"
              animate="visible"
              custom={i}
              variants={stagger(0.1)}
            >
              <div className={`mb-3 flex size-11 items-center justify-center rounded-xl ${s.bg}`}>
                <s.icon className={`size-5 ${s.color}`} />
              </div>
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={stagger(0.1)}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Recent Blueprints</h2>
              <Link
                href="/items/manage"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {recentBlueprints.map((bp) => (
                <div
                  key={bp.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <FileEdit className="size-4 shrink-0 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-white">{bp.title}</p>
                      <p className="text-xs text-slate-500">{bp.updated}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${statusColors[bp.status] || "text-slate-400"}`}>
                    {bp.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={stagger(0.1)}
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-bold text-white">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/items/add">
                  <Button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-6 hover:bg-blue-700">
                    <Plus className="size-5" />
                    <span>New Blueprint</span>
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-slate-700 py-6 text-slate-300 hover:bg-slate-800"
                  >
                    <ArrowRight className="size-5" />
                    <span>Explore Blueprints</span>
                  </Button>
                </Link>
                <Link href="/items/manage">
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-slate-700 py-6 text-slate-300 hover:bg-slate-800"
                  >
                    <FileEdit className="size-5" />
                    <span>Manage Blueprints</span>
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-slate-700 py-6 text-slate-300 hover:bg-slate-800"
                    >
                      <Shield className="size-5" />
                      <span>Admin Panel</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | DevArchify";
  }, []);

  return (
    <RoleCheck>
      <DashboardContent />
    </RoleCheck>
  );
}
