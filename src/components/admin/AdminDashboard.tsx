"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  LayoutDashboard,
  Users,
  Flag,
  FileText,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

type Tab = "overview" | "users" | "moderation";

const sidebarItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="size-5" /> },
  { id: "users", label: "Users", icon: <Users className="size-5" /> },
  { id: "moderation", label: "Moderation", icon: <Flag className="size-5" /> },
];

const chartData = [
  { month: "Jan", blueprints: 12, users: 45 },
  { month: "Feb", blueprints: 19, users: 78 },
  { month: "Mar", blueprints: 28, users: 120 },
  { month: "Apr", blueprints: 35, users: 165 },
  { month: "May", blueprints: 42, users: 210 },
  { month: "Jun", blueprints: 55, users: 280 },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  joined: string;
  blueprints: number;
}

const initialUsers: User[] = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", role: "admin", status: "active", joined: "2026-01-15", blueprints: 12 },
  { id: "2", name: "Maya Chen", email: "maya@example.com", role: "user", status: "active", joined: "2026-02-20", blueprints: 8 },
  { id: "3", name: "David Kim", email: "david@example.com", role: "user", status: "active", joined: "2026-03-05", blueprints: 5 },
  { id: "4", name: "Sarah Okafor", email: "sarah@example.com", role: "user", status: "suspended", joined: "2026-03-12", blueprints: 3 },
  { id: "5", name: "James Hart", email: "james@example.com", role: "user", status: "active", joined: "2026-04-01", blueprints: 15 },
  { id: "6", name: "Priya Nair", email: "priya@example.com", role: "user", status: "active", joined: "2026-04-18", blueprints: 6 },
  { id: "7", name: "Emma Watson", email: "emma@example.com", role: "admin", status: "active", joined: "2026-05-02", blueprints: 20 },
  { id: "8", name: "Tomás Silva", email: "tomas@example.com", role: "user", status: "active", joined: "2026-05-14", blueprints: 9 },
];

interface FlaggedItem {
  id: string;
  title: string;
  author: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  reportedAt: string;
}

const initialFlagged: FlaggedItem[] = [
  { id: "1", title: "Crypto Mining Bot", author: "Unknown User", reason: "Plagiarized content from another platform", status: "pending", reportedAt: "2026-07-14" },
  { id: "2", title: "Phishing Simulator", author: "Jane Doe", reason: "Potentially harmful / unethical use case", status: "pending", reportedAt: "2026-07-15" },
  { id: "3", title: "E-Commerce Marketplace", author: "Alex Rivera", reason: "Incorrect category tag", status: "resolved", reportedAt: "2026-07-10" },
  { id: "4", title: "Fitness Tracker App", author: "Sarah Okafor", reason: "Spam / duplicate submission", status: "dismissed", reportedAt: "2026-07-08" },
  { id: "5", title: "Data Scraper API", author: "Mark Lee", reason: "Contains hardcoded API keys in prompt", status: "pending", reportedAt: "2026-07-16" },
];

const tabContentVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen bg-slate-950 pt-16">
      <div className="flex">
        <aside
          className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-800 bg-slate-950 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:sticky lg:translate-x-0`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="min-h-[calc(100vh-4rem)] flex-1 overflow-hidden">
          <div className="sticky top-16 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ChevronDown className={`size-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
              {sidebarItems.find((i) => i.id === activeTab)?.label || "Menu"}
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease }}
              >
                {activeTab === "overview" && <OverviewPanel />}
                {activeTab === "users" && <UsersPanel />}
                {activeTab === "moderation" && <ModerationPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </section>
  );
}

function OverviewPanel() {
  const metrics = [
    { label: "Total Blueprints", value: "156", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pending Approvals", value: "8", icon: Flag, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Active Users", value: "1,240", icon: Users, color: "text-green-400", bg: "bg-green-500/10" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white md:text-3xl">
        Admin <span className="text-blue-500">Dashboard</span>
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease }}
          >
            <div className={`mb-3 flex size-11 items-center justify-center rounded-xl ${m.bg}`}>
              <m.icon className={`size-5 ${m.color}`} />
            </div>
            <p className="text-3xl font-black text-white">{m.value}</p>
            <p className="mt-1 text-sm text-slate-400">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease }}
        >
          <h2 className="mb-6 text-lg font-semibold text-white">
            Monthly Blueprint Submissions
          </h2>
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
              <Bar dataKey="blueprints" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease }}
        >
          <h2 className="mb-6 text-lg font-semibold text-white">
            User Growth
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={13} />
              <YAxis stroke="#64748b" fontSize={13} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

function UsersPanel() {
  const [users, setUsers] = useState(initialUsers);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" as const : "active" as const }
          : u
      )
    );
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white md:text-3xl">
        User <span className="text-blue-500">Management</span>
      </h1>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Blueprints</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500 md:hidden">{user.email}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell text-slate-300">
                  {user.email}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-xl border px-3 py-0.5 text-xs font-medium ${
                      user.role === "admin"
                        ? "border-purple-500/30 bg-purple-500/10 text-purple-400"
                        : "border-slate-600 bg-slate-800 text-slate-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={`inline-block rounded-xl border px-3 py-0.5 text-xs font-medium ${
                      user.status === "active"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-slate-300">
                  {user.blueprints}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                      user.status === "active"
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    }`}
                  >
                    {user.status === "active" ? "Suspend" : "Activate"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ModerationPanel() {
  const [flagged, setFlagged] = useState(initialFlagged);

  const updateStatus = (id: string, status: "resolved" | "dismissed") => {
    setFlagged((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const pendingCount = flagged.filter((f) => f.status === "pending").length;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Content <span className="text-blue-500">Moderation</span>
        </h1>
        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-yellow-500/10 px-3 py-1.5 text-sm font-medium text-yellow-400">
            <Flag className="size-4" />
            {pendingCount} pending
          </span>
        )}
      </div>

      {flagged.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 py-20 text-center">
          <p className="text-lg text-slate-400">All clear.</p>
          <p className="mt-1 text-sm text-slate-500">No reported content.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blueprint</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell">Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flagged.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 md:hidden">{item.author}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-slate-300">
                    {item.author}
                  </TableCell>
                  <TableCell className="hidden max-w-[200px] truncate lg:table-cell text-slate-300">
                    {item.reason}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-xl border px-3 py-0.5 text-xs font-medium ${
                        item.status === "pending"
                          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                          : item.status === "resolved"
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : "border-slate-600 bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status === "pending" ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => updateStatus(item.id, "resolved")}
                          className="rounded-xl p-2 text-green-400 hover:bg-green-500/10 transition-colors"
                          aria-label="Approve"
                        >
                          <Check className="size-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(item.id, "dismissed")}
                          className="rounded-xl p-2 text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label="Dismiss"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {item.status === "resolved" ? "Resolved" : "Dismissed"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
