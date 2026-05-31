"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    packages: 12,
    tag: "Beach",
    size: "large",
  },
  {
    name: "Kerala",
    country: "India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    packages: 8,
    tag: "Nature",
    size: "small",
  },
  {
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    packages: 6,
    tag: "Luxury",
    size: "small",
  },
  {
    name: "Rajasthan",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    packages: 10,
    tag: "Heritage",
    size: "large",
  },
  {
    name: "Manali",
    country: "India",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    packages: 7,
    tag: "Adventure",
    size: "small",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    packages: 5,
    tag: "International",
    size: "small",
  },
];

export function PopularDestinations() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 dark:bg-ocean-950/30 border border-ocean-200 dark:border-ocean-800 text-ocean-600 dark:text-ocean-400 text-sm font-semibold mb-3">
              🌏 Trending Now
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Popular <span className="gradient-text-ocean">Destinations</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            View all destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Large card — Goa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-2 row-span-2"
          >
            <DestCard dest={DESTINATIONS[0]} tall />
          </motion.div>

          {/* Small cards */}
          {DESTINATIONS.slice(1, 5).map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.08 }}
            >
              <DestCard dest={dest} />
            </motion.div>
          ))}

          {/* Large card — Bali */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="col-span-2"
          >
            <DestCard dest={DESTINATIONS[5]} wide />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DestCard({
  dest,
  tall = false,
  wide = false,
}: {
  dest: (typeof DESTINATIONS)[number];
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <Link href={`/packages?destination=${dest.name}`} className="group block h-full">
      <div
        className={`relative overflow-hidden rounded-2xl bg-muted ${
          tall ? "h-72 sm:h-[420px]" : wide ? "h-44" : "h-44"
        } hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5`}
      >
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
            {dest.tag}
          </span>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 inset-x-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-white font-heading font-bold text-lg leading-tight">
                {dest.name}
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {dest.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold text-sm">{dest.packages}+</p>
              <p className="text-white/60 text-xs">packages</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
