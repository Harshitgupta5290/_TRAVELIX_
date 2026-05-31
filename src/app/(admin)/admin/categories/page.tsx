import db from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Categories | Admin | TRAVELIX" };

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    include: {
      _count: { select: { packages: true, hotels: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Categories</h1>
        <p className="text-muted-foreground text-sm mt-1">{categories.length} categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-3 bg-card rounded-2xl border border-border/60 p-12 text-center text-muted-foreground">No categories yet.</div>
        ) : categories.map((c) => (
          <div key={c.id} className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-all">
            {c.image && (
              <div className="h-28 overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <h3 className="font-semibold text-base mb-1">{c.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">Slug: {c.slug}</p>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-brand-600">{c._count.packages}</p>
                  <p className="text-xs text-muted-foreground">Packages</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-ocean-600">{c._count.hotels}</p>
                  <p className="text-xs text-muted-foreground">Hotels</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
