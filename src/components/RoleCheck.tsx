"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RoleCheckProps {
  requiredRole?: "admin" | "user";
  children: React.ReactNode;
}

export default function RoleCheck({ requiredRole, children }: RoleCheckProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requiredRole === "admin" && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-16">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole === "admin" && user.role !== "admin") return null;

  return <>{children}</>;
}
