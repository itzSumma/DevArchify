"use client";

import { useEffect } from "react";
import RoleCheck from "@/components/RoleCheck";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  useEffect(() => {
    document.title = "Admin Dashboard | DevArchify";
  }, []);

  return (
    <RoleCheck requiredRole="admin">
      <AdminDashboard />
    </RoleCheck>
  );
}
