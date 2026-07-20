"use client";

import { useEffect } from "react";
import AddBlueprintForm from "@/components/AddBlueprintForm";
import RoleCheck from "@/components/RoleCheck";

export default function AddBlueprintPage() {
  useEffect(() => {
    document.title = "Submit a Blueprint | DevArchify";
  }, []);

  return (
    <RoleCheck>
      <AddBlueprintForm />
    </RoleCheck>
  );
}
