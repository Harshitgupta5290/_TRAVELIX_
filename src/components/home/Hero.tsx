"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ArrowRight, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85",
  "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=1600&q=85",
];

const destinations = ["Goa", "Kerala", "Rajasthan", "Himachal", "Maldives", "Dubai", "Bangkok", "Bali"];

const stats = [
  { value: "500+", label: "Destinations" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];

export function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"packages" | "hotels">("packages");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (days) params.set("days", days);
    router.push(
      activeTab === "packages"
        ? `/packages?${params.toString()}`
        : `/hotels?${params.toString()}`
    );
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <img
          src={heroImages[0]}
          alt="Hero travel background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/75 to-[#0f172a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-[#0f172a]/30" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen pointer-events-none"
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${10 + i * 16}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0
              ? "radial-gradient(circle, rgba(241,80,25,0.4), transparent)"
              : "radial-gradient(circle, rgba(14,165,233,0.3), transparent)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            ✈️ &nbsp;Discover the World&apos;s Most Beautiful Places
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] mb-6"
          >
            Your Next
            <br />
            <span className="relative">
              <span className="text-brand-400">Adventure</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full origin-left"
              />
            </span>
            <br />
            Awaits You
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            From serene beaches to majestic mountains — explore curated travel packages
            and luxury hotels tailored for every kind of traveler.
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden max-w-2xl"
          >
            {/* Tabs */}
            <div className="flex border-b border-border">
              {(["packages", "hotels"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-3.5 text-sm font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "text-brand-600 border-b-2 border-brand-500 bg-brand-50/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab === "packages" ? "✈️ Packages" : "🏨 Hotels"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSearch} className="p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={
                      activeTab === "packages"
                        ? "Where do you want to go?"
                        : "Search hotels by city..."
                    }
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    list="destinations"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                  />
                  <datalist id="destinations">
                    {destinations.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>
                {activeTab === "packages" && (
                  <div className="relative sm:w-36">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all appearance-none"
                    >
                      <option value="">Any days</option>
                      {[3, 5, 7, 10, 14, 21].map((d) => (
                        <option key={d} value={d}>{d} days</option>
                      ))}
                    </select>
                  </div>
                )}
                <Button type="submit" className="sm:w-auto py-3 px-6 whitespace-nowrap">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </form>

            {/* Popular destinations */}
            <div className="px-5 pb-4">
              <p className="text-xs text-muted-foreground mb-2">Popular:</p>
              <div className="flex flex-wrap gap-1.5">
                {destinations.slice(0, 5).map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-brand-50 hover:text-brand-600 border border-border/50 hover:border-brand-200 transition-all duration-150"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-8 mt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-white"
            >
              <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
