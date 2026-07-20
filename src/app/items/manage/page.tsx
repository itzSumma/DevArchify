import type { Metadata } from "next";
import ManageBlueprintTable from "@/components/ManageBlueprintTable";

export const metadata: Metadata = {
  title: "Manage Blueprints",
  description: "View, edit, and delete your submitted architecture blueprints.",
};

export default function ManageBlueprintsPage() {
  return <ManageBlueprintTable />;
}
