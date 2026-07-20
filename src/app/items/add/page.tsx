import type { Metadata } from "next";
import AddBlueprintForm from "@/components/AddBlueprintForm";

export const metadata: Metadata = {
  title: "Submit a Blueprint",
  description: "Share your architecture blueprint with the DevArchify community.",
};

export default function AddBlueprintPage() {
  return <AddBlueprintForm />;
}
