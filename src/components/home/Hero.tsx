"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Hotel, Train, Bus, Package, Search, MapPin,
  Calendar, Users, ArrowRight, ChevronDown, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS = [
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    border: "border-sky-500",
    text: "text-sky-600",
    placeholder: { from: "From (e.g. Mumbai)", to: "To (e.g. Delhi)" },
    href: "/packages?medium=FLIGHT",
    comingSoon: true,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
    color: "from-brand-500 to-brand-700",
    bg: "bg-brand-50",
    border: "border-brand-500",
    text: "text-brand-600",
    placeholder: { from: "City or hotel name", to: "" },
    href: "/hotels",
    comingSoon: false,
  },
  {
    id: "trains",
    label: "Trains",
    icon: Train,
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    border: "border-green-500",
    text: "text-green-600",
    placeholder: { from: "From station", to: "To station" },
    href: "/packages?medium=TRAIN",
    comingSoon: true,
  },
  {
    id: "buses",
    label: "Buses",
    icon: Bus,
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    border: "border-orange-500",
    text: "text-orange-600",
    placeholder: { from: "From city", to: "To city" },
    href: "/packages?medium=BUS",
    comingSoon: true,
  },
  {
    id: "packages",
    label: "Packages",
    icon: Package,
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    border: "border-purple-500",
    text: "text-purple-600",
    placeholder: { from: "Departing from", to: "Where to?" },
    href: "/packages",
    comingSoon: false,
  },
] as const;

const POPULAR = ["Goa", "Kerala", "Manali", "Rajasthan", "Maldives", "Bali", "Dubai"];

const STATS = [
  { value: "500+", label: "Destinations" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "24/7", label: "Support" },
];

export function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1");

  const tab = TABS.find((t) => t.id === activeTab)!;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (to) params.set("destination", to);
    if (from) params.set("source", from);
    router.push(`${tab.href}${params.toString() ? `&${params.toString()}` : ""}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=85"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/95 via-[#0a0f1e]/80 to-[#0a0f1e]/60" />
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-brand-500/20 blur-3xl" />
        <motion.div animate={{ y: [0, 15, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-ocean-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 container-custom pt-24 pb-12 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              India&apos;s Most Trusted Travel Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] mb-4"
          >
            One App,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-orange-400 to-gold-400">
              Endless Journeys
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-center text-white/60 text-lg mb-10"
          >
            Flights · Hotels · Trains · Buses · Holiday Packages — all in one place
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white dark:bg-card rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Booking type tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-border/60">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveTab(t.id); setFrom(""); setTo(""); }}
                  className={`flex-1 min-w-[90px] flex flex-col items-center gap-1.5 px-4 py-4 text-xs font-semibold transition-all duration-200 border-b-2 relative ${
                    activeTab === t.id
                      ? `${t.border} ${t.text} bg-opacity-5`
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <t.icon className={`w-5 h-5 ${activeTab === t.id ? t.text : ""}`} />
                  <span className="flex items-center gap-1">
                    {t.label}
                    {t.comingSoon && (
                      <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-amber-100 text-amber-600 leading-none">
                        SOON
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Search form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSearch}
                className="p-5"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* From / City field */}
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={tab.placeholder.from}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                    />
                  </div>

                  {/* To field (not shown for Hotels) */}
                  {activeTab !== "hotels" && (
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={tab.placeholder.to}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                      />
                    </div>
                  )}

                  {/* Date */}
                  <div className="relative sm:w-40">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-2 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                    />
                  </div>

                  {/* Travelers */}
                  <div className="relative sm:w-32">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full pl-9 pr-2 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search button */}
                  <Button type="submit" size="default" className={`bg-gradient-to-r ${tab.color} text-white border-0 px-6 py-3 rounded-xl font-semibold whitespace-nowrap hover:shadow-lg transition-all`}>
                    <Search className="w-4 h-4 mr-1" />
                    Search
                  </Button>
                </div>

                {/* Coming soon notice */}
                {tab.comingSoon && (
                  <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs">
                    <span className="text-sm">✈️</span>
                    <span>
                      <strong>Live {tab.label} booking coming soon!</strong> Showing curated {tab.label.toLowerCase()} packages for now.
                    </span>
                  </div>
                )}

                {/* Popular destinations */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">Popular:</span>
                  {POPULAR.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setTo(dest)}
                      className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-brand-50 hover:text-brand-600 border border-border/50 hover:border-brand-200 transition-all duration-150"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </motion.form>
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex justify-center gap-8 mt-10"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-2xl font-heading font-bold">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
