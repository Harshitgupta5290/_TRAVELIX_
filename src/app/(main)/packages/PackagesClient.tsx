"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Plane, Train, Bus, SlidersHorizontal, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Category } from "@prisma/client";

interface Package {
  id: string;
  slug: string;
  title: string;
  source: string;
  destination: string;
  description: string;
  image: string | null;
  days: number;
  nights: number;
  persons: number;
  price: number;
  salePrice: number | null;
  medium: string;
  featured: boolean;
  reviews: { rating: number }[];
}

interface PackagesClientProps {
  categories: Category[];
  sources: string[];
  destinations: string[];
  dayOptions: number[];
}

const MEDIUM_OPTIONS = [
  { value: "FLIGHT", label: "Flight", icon: Plane },
  { value: "TRAIN", label: "Train", icon: Train },
  { value: "BUS", label: "Bus", icon: Bus },
];

function PackageSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden animate-pulse">
      <div className="h-52 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex justify-between mt-4">
          <div className="h-6 bg-muted rounded w-24" />
          <div className="h-6 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function PackagesClient({ categories, sources, destinations, dayOptions }: PackagesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [packages, setPackages] = useState<Package[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") ?? "",
    destination: searchParams.get("destination") ?? "",
    source: searchParams.get("source") ?? "",
    days: searchParams.get("days") ?? "",
    medium: searchParams.get("medium") ?? "",
    categoryId: searchParams.get("categoryId") ?? "",
    page: parseInt(searchParams.get("page") ?? "1"),
  });

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.set(k, String(v));
      });
      const res = await fetch(`/api/packages?${params.toString()}`);
      const data = await res.json();
      setPackages(data.items ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: "", destination: "", source: "", days: "", medium: "", categoryId: "", page: 1 });
  };

  const activeFilterCount = [
    filters.destination, filters.source, filters.days, filters.medium, filters.categoryId
  ].filter(Boolean).length;

  return (
    <div className="container-custom py-10">
      {/* Search + Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search destinations, packages..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
          {filters.search && (
            <button onClick={() => updateFilter("search", "")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setFilterOpen(!filterOpen)}
          className="gap-2 relative"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="gap-1 text-muted-foreground">
            <X className="w-3 h-3" /> Clear
          </Button>
        )}
      </div>

      {/* Collapsible filters */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-muted/30 rounded-2xl border border-border/60">
              {/* Destination */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Destination</label>
                <select
                  value={filters.destination}
                  onChange={(e) => updateFilter("destination", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                >
                  <option value="">All destinations</option>
                  {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Departure City</label>
                <select
                  value={filters.source}
                  onChange={(e) => updateFilter("source", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                >
                  <option value="">Any city</option>
                  {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Days */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Duration</label>
                <select
                  value={filters.days}
                  onChange={(e) => updateFilter("days", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                >
                  <option value="">Any duration</option>
                  {dayOptions.map((d) => <option key={d} value={d}>{d} days</option>)}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Category</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => updateFilter("categoryId", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Medium */}
              <div className="col-span-2 md:col-span-4">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Travel Mode</label>
                <div className="flex flex-wrap gap-2">
                  {MEDIUM_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateFilter("medium", filters.medium === value ? "" : value)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        filters.medium === value
                          ? "bg-brand-500 text-white border-brand-500"
                          : "bg-background border-border hover:border-brand-300 hover:bg-brand-50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results summary */}
      {!loading && (
        <p className="text-sm text-muted-foreground mb-6">
          {total === 0 ? "No packages found" : `Showing ${packages.length} of ${total} packages`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <PackageSkeleton key={i} />)}
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-heading font-semibold mb-2">No packages found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
          <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const avgRating = pkg.reviews?.length
              ? (pkg.reviews.reduce((a, r) => a + r.rating, 0) / pkg.reviews.length).toFixed(1)
              : null;
            const displayPrice = pkg.salePrice ?? pkg.price;
            const discount = pkg.salePrice ? Math.round(((pkg.price - pkg.salePrice) / pkg.price) * 100) : null;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/packages/${pkg.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {pkg.image ? (
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-ocean-400 to-brand-500 flex items-center justify-center">
                          <Plane className="w-12 h-12 text-white/30" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {pkg.featured && <Badge>⭐ Featured</Badge>}
                        {discount && <Badge className="bg-green-500 text-white">{discount}% OFF</Badge>}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium">
                        📍 {pkg.source} → {pkg.destination}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-base leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">{pkg.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pkg.description || `${pkg.days} days trip`}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span>🕐 {pkg.days}D/{pkg.nights}N</span>
                        <span>👥 {pkg.persons} pax</span>
                        {avgRating && <span className="ml-auto">⭐ {avgRating}</span>}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div>
                          <span className="text-lg font-bold text-brand-600">{formatPrice(displayPrice)}</span>
                          {pkg.salePrice && <span className="text-xs text-muted-foreground line-through ml-1.5">{formatPrice(pkg.price)}</span>}
                          <span className="block text-xs text-muted-foreground">per person</span>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setFilters((f) => ({ ...f, page: i + 1 }))}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                filters.page === i + 1
                  ? "bg-brand-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
