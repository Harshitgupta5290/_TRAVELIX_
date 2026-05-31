import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Hotels | Admin | TRAVELIX" };

export default async function AdminHotelsPage() {
  const hotels = await db.hotel.findMany({
    include: {
      category: { select: { name: true } },
      _count: { select: { reviews: true, packages: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Hotels</h1>
        <p className="text-muted-foreground text-sm mt-1">{hotels.length} total hotels</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.length === 0 ? (
          <div className="col-span-3 bg-card rounded-2xl border border-border/60 p-12 text-center text-muted-foreground">No hotels yet.</div>
        ) : hotels.map((h) => (
          <div key={h.id} className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-all">
            <div className="h-36 overflow-hidden relative">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
                {"⭐".repeat(Math.min(h.stars, 5))}
              </div>
              {h.featured && (
                <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Featured</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-0.5">{h.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">📍 {h.city}, {h.country} · {h.category?.name}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-brand-600 text-sm">{formatPrice(h.pricePerNight)}</span>
                  <span className="text-xs text-muted-foreground">/night</span>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>📦 {h._count.packages} pkgs</span>
                  <span>⭐ {h._count.reviews} reviews</span>
                </div>
              </div>
              <Link href={`/hotels/${h.slug}`} className="mt-3 block text-center text-xs text-brand-500 hover:underline" target="_blank">
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
