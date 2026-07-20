import type { Metadata } from "next";
import ExploreGrid from "@/components/ExploreGrid";

export const metadata: Metadata = {
  title: "Explore Blueprints",
  description: "Browse community-built architecture blueprints across every category and tech stack.",
};

export default function ExplorePage() {
  return <ExploreGrid />;
}
