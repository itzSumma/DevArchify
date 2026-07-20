"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import api from "@/lib/api";

type Status = "pending" | "approved" | "rejected";

interface BlueprintItem {
  _id: string;
  projectTitle: string;
  category: string;
  techStack?: { frontend?: string; backend?: string; database?: string; extras?: string[] };
  status: Status;
  userId?: { name: string };
  createdAt: string;
}

const statusColors: Record<Status, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

const categories = ["Web Apps", "Mobile Apps", "Cloud & DevOps", "AI / ML", "Cybersecurity", "SaaS Platforms", "Data Pipelines", "UI Libraries"];

const ease = [0.22, 1, 0.36, 1] as const;

async function fetchBlueprints(): Promise<BlueprintItem[]> {
  const res = await api.get("/blueprints");
  return res.data.data;
}

async function deleteBlueprint(id: string): Promise<void> {
  await api.delete(`/blueprints/${id}`);
}

async function createBlueprint(data: Partial<BlueprintItem>): Promise<BlueprintItem> {
  const res = await api.post("/blueprints", data);
  return res.data.data;
}

export default function ManageBlueprintTable() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<BlueprintItem | null>(null);

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blueprints"],
    queryFn: fetchBlueprints,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlueprint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blueprints"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createBlueprint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blueprints"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditSave = (updated: BlueprintItem) => {
    setEditing(null);
  };

  return (
    <section className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div>
            <h1 className="text-3xl font-black text-white md:text-4xl">
              Manage <span className="text-blue-500">Blueprints</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              View, edit, and delete your submitted blueprints.
            </p>
          </div>
          <a href="/items/add">
            <Button className="h-11 gap-2 bg-blue-600 px-5 text-sm hover:bg-blue-700">
              <Plus className="size-4" /> Add New
            </Button>
          </a>
        </motion.div>

        {isLoading ? (
          <motion.div
            className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="size-8 animate-spin text-blue-500" />
          </motion.div>
        ) : isError ? (
          <motion.div
            className="rounded-2xl border border-red-900/50 bg-red-950/20 py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg text-red-400">Failed to load blueprints.</p>
            <p className="mt-1 text-sm text-slate-500">Try refreshing the page.</p>
          </motion.div>
        ) : items.length === 0 ? (
          <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-900/50 py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg text-slate-400">No blueprints yet.</p>
            <p className="mt-1 text-sm text-slate-500">
              Submit your first blueprint to see it here.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.tr
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="border-b border-slate-800 transition-colors hover:bg-slate-800/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">{item.projectTitle}</p>
                          <p className="mt-0.5 text-xs text-slate-500 md:hidden">
                            {item.category}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-slate-300">
                        {item.category}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-xl border px-3 py-0.5 text-xs font-medium ${statusColors[item.status]}`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditing(item)}
                            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-blue-400 transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deleteMutation.isPending}
                            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors disabled:opacity-50"
                            aria-label="Delete"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>
        )}

        <AnimatePresence>
          {editing && (
            <EditModal
              item={editing}
              onSave={handleEditSave}
              onClose={() => setEditing(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function EditModal({
  item,
  onSave,
  onClose,
}: {
  item: BlueprintItem;
  onSave: (item: BlueprintItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    _id: item._id,
    projectTitle: item.projectTitle,
    category: item.category,
    status: item.status,
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl md:p-8"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Edit Blueprint</h2>
          <button onClick={onClose} className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Title</label>
            <input
              value={form.projectTitle}
              onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <Button
            onClick={() => onSave({ ...item, ...form })}
            className="bg-blue-600 px-5 py-2.5 text-sm hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
