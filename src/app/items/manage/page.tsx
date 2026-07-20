"use client";

import { useEffect } from "react";
import ManageBlueprintTable from "@/components/ManageBlueprintTable";
import RoleCheck from "@/components/RoleCheck";

export default function ManageBlueprintsPage() {
  useEffect(() => {
    document.title = "Manage Blueprints | DevArchify";
  }, []);

  return (
    <RoleCheck>
      <ManageBlueprintTable />
    </RoleCheck>
  );
}
