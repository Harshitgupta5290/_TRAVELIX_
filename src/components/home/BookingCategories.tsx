"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Hotel, Train, Bus, Package, Map } from "lucide-react";

const CATEGORIES = [
  {
    icon: Plane,
    label: "Flights",
    desc: "Domestic & international",
    href: "/packages?medium=FLIGHT",
    gradient: "from-sky-400 to-blue-600",
    shadow: "hover:shadow-sky-200 dark:hover:shadow-sky-900/40",
    bg: "bg-sky-50 dark:bg-sky-950/20",
  },
  {
    icon: Hotel,
    label: "Hotels",
    desc: "Luxury stays & resorts",
    href: "/hotels",
    gradient: "from-brand-400 to-brand-600",
    shadow: "hover:shadow-brand-200 dark:hover:shadow-brand-900/40",
    bg: "bg-brand-50 dark:bg-brand-950/20",
  },
  {
    icon: Train,
    label: "Trains",
    desc: "Comfortable rail journeys",
    href: "/packages?medium=TRAIN",
    gradient: "from-green-400 to-emerald-600",
    shadow: "hover:shadow-green-200 dark:hover:shadow-green-900/40",
    bg: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Bus,
    label: "Buses",
    desc: "Intercity AC coaches",
    href: "/packages?medium=BUS",
    gradient: "from-orange-400 to-amber-600",
    shadow: "hover:shadow-orange-200 dark:hover:shadow-orange-900/40",
    bg: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    icon: Package,
    label: "Packages",
    desc: "All-inclusive holidays",
    href: "/packages",
    gradient: "from-purple-400 to-violet-600",
    shadow: "hover:shadow-purple-200 dark:hover:shadow-purple-900/40",
    bg: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: Map,
    label: "Honeymoon",
    desc: "Romantic getaways",
    href: "/packages?categoryId=honeymoon",
    gradient: "from-pink-400 to-rose-600",
    shadow: "hover:shadow-pink-200 dark:hover:shadow-pink-900/40",
    bg: "bg-pink-50 dark:bg-pink-950/20",
  },
];

export function BookingCategories() {
  return (
    <section className="py-14 bg-muted/30 dark:bg-muted/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            What are you looking for?
          </h2>
          <p className="text-muted-foreground">
            Book anything travel — all under one roof
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link href={cat.href} className="group block">
                <div className={`${cat.bg} rounded-2xl p-5 flex flex-col items-center gap-3 border border-border/40 hover:border-border/80 hover:shadow-lg ${cat.shadow} transition-all duration-300 hover:-translate-y-1 text-center`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{cat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
