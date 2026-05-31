"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, X, SlidersHorizontal, Hotel as HotelIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, parseJsonField } from "@/lib/utils";
import type { Category } from "@prisma/client";

interface Hotel {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
  amenities: string;
  stars: number;
  pricePerNight: number;
  featured: boolean;
  reviews: { rating: number }[];
}

interface HotelsClientProps {
  categories: Category[];
  cities: string[];
  starOptions: number[];
}

function HotelSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden animate-pulse">
      <div className="h-52 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex justify-between mt-4">
          <div className="h-6 bg-muted rounded w-24" />
          <div className="h-6 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function HotelsClient({ categories, cities, starOptions }: HotelsClientProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "", city: "", categoryId: "", stars: "", page: 1,
  });

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, String(v)); });
      const res = await fetch(`/api/hotels?${params.toString()}`);
      const data = await res.json();
      setHotels(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch { setHotels([]); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { fetchHotels(); }, [fetchHotels]);

  const updateFilter = (key: string, value: string) =>
    setFilters((p) => ({ ...p, [key]: value, page: 1 }));

  const clearFilters = () =>
    setFilters({ search: "", city: "", categoryId: "", stars: "", page: 1 });

  const activeFilterCount = [filters.city, filters.categoryId, filters.stars].filter(Boolean).length;

  return (
    <div className="container-custom py-10">
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search hotels, cities..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
          {filters.search && (
            <button onClick={() => updateFilter("search", "")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="gap-2 relative">
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">{activeFilterCount}</span>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground gap-1">
            <X className="w-3 h-3" /> Clear
          </Button>
        )}
      </div>

      {filterOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-muted/30 rounded-2xl border border-border/60 mb-6">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">City</label>
            <select value={filters.city} onChange={(e) => updateFilter("city", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40">
              <option value="">All cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Stars</label>
            <select value={filters.stars} onChange={(e) => updateFilter("stars", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40">
              <option value="">Any stars</option>
              {starOptions.map((s) => <option key={s} value={s}>{s} Stars</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Category</label>
            <select value={filters.categoryId} onChange={(e) => updateFilter("categoryId", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40">
              <option value="">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      )}

      {!loading && <p className="text-sm text-muted-foreground mb-6">{total === 0 ? "No hotels found" : `${hotels.length} of ${total} hotels`}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <HotelSkeleton key={i} />)}
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-heading font-semibold mb-2">No hotels found</h3>
          <p className="text-muted-foreground mb-6">Try different filters.</p>
          <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, i) => {
            const amenities = parseJsonField<string[]>(hotel.amenities, []);
            const avgRating = hotel.reviews?.length
              ? (hotel.reviews.reduce((a, r) => a + r.rating, 0) / hotel.reviews.length).toFixed(1)
              : null;

            return (
              <motion.div key={hotel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link href={`/hotels/${hotel.slug}`} className="group block">
                  <div className="rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"; }} />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
                        {"⭐".repeat(Math.min(hotel.stars, 5))}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white text-xs">
                        📍 {hotel.city}, {hotel.country}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading font-semibold text-base group-hover:text-brand-600 transition-colors">{hotel.name}</h3>
                        {avgRating && <span className="text-xs font-bold text-gold-600 bg-gold-50 dark:bg-gold-900/20 px-2 py-0.5 rounded-lg shrink-0">⭐ {avgRating}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{hotel.description}</p>
                      {amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {amenities.slice(0, 3).map((a) => (
                            <span key={a} className="text-xs px-2 py-0.5 rounded bg-muted border border-border/60 text-muted-foreground capitalize">{a}</span>
                          ))}
                          {amenities.length > 3 && <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">+{amenities.length - 3}</span>}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div>
                          {hotel.pricePerNight > 0 ? (
                            <>
                              <span className="text-lg font-bold text-brand-600">{formatPrice(hotel.pricePerNight)}</span>
                              <span className="text-xs text-muted-foreground">/night</span>
                            </>
                          ) : <span className="text-sm text-muted-foreground">Enquire for price</span>}
                        </div>
                        <span className="text-brand-500 text-xs font-semibold">View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
