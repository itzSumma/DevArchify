"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== "admin") return null;

  return (
    <div className="p-6 border border-red-500 rounded-2xl bg-red-950/20 my-4">
      <h2 className="text-xl font-bold text-red-400">Admin Controls</h2>
      <p className="text-sm text-slate-300 mb-4">You are currently logged in as an Admin.</p>
      <div className="flex gap-4">
        <Link href="/admin/users" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
          Manage Users
        </Link>
        <Link href="/admin/settings" className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm">
          Site Settings
        </Link>
      </div>
    </div>
  );
}
