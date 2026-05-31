import { Suspense } from "react";
import { PackagesClient } from "./PackagesClient";
import db from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Browse our curated travel packages — flights, trains, and more.",
};

async function getFiltersData() {
  const [categories, allPackages] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.package.findMany({
      where: { status: "ACTIVE" },
      select: { source: true, destination: true, days: true, medium: true },
    }),
  ]);

  const sources = [...new Set(allPackages.map((p) => p.source))].sort();
  const destinations = [...new Set(allPackages.map((p) => p.destination))].sort();
  const dayOptions = [...new Set(allPackages.map((p) => p.days))].sort((a, b) => a - b);

  return { categories, sources, destinations, dayOptions };
}

export default async function PackagesPage() {
  const filtersData = await getFiltersData();

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            ✈️ Explore the World
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Travel Packages
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Handcrafted itineraries for every budget, every season, every dream.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="container-custom py-12 text-center text-muted-foreground">Loading packages...</div>}>
        <PackagesClient {...filtersData} />
      </Suspense>
    </div>
  );
}
