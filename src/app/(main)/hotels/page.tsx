import { Suspense } from "react";
import { HotelsClient } from "./HotelsClient";
import db from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Browse luxury hotels and resorts hand-picked for exceptional stays.",
};

async function getFiltersData() {
  const [categories, allHotels] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.hotel.findMany({ select: { city: true, stars: true } }),
  ]);

  const cities = [...new Set(allHotels.map((h) => h.city))].sort();
  const starOptions = [...new Set(allHotels.map((h) => h.stars))].sort((a, b) => b - a);

  return { categories, cities, starOptions };
}

export default async function HotelsPage() {
  const filtersData = await getFiltersData();

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-ocean-900 to-[#0f172a] py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            🏨 Luxury Stays
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Hotels & Resorts</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            From boutique hideaways to grand 5-star palaces — find your perfect stay.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="container-custom py-12 text-center text-muted-foreground">Loading hotels...</div>}>
        <HotelsClient {...filtersData} />
      </Suspense>
    </div>
  );
}
