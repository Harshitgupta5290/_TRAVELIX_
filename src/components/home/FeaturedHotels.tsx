"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Star, ArrowRight, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, parseJsonField } from "@/lib/utils";
import type { HotelWithRelations } from "@/types";

interface FeaturedHotelsProps {
  hotels: HotelWithRelations[];
}

const amenityEmojis: Record<string, string> = {
  wifi: "📶",
  pool: "🏊",
  spa: "💆",
  gym: "💪",
  restaurant: "🍽️",
  parking: "🅿️",
  bar: "🍸",
  ac: "❄️",
};

function HotelCard({ hotel, index }: { hotel: HotelWithRelations; index: number }) {
  const amenities = parseJsonField<string[]>(hotel.amenities, []);
  const avgRating =
    hotel.reviews && hotel.reviews.length > 0
      ? (hotel.reviews.reduce((a, r) => a + r.rating, 0) / hotel.reviews.length).toFixed(1)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/hotels/${hotel.slug}`} className="group block">
        <div className="rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-muted">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
              }}
            />
            {/* Stars badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
              {"⭐".repeat(Math.min(hotel.stars, 5))}
              <span className="font-semibold">{hotel.stars}-Star</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
              <MapPin className="w-3 h-3" />
              <span className="font-medium">{hotel.city}, {hotel.country}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-heading font-semibold text-lg leading-tight group-hover:text-brand-600 transition-colors">
                {hotel.name}
              </h3>
              {avgRating && (
                <div className="flex items-center gap-1 shrink-0 bg-gold-50 dark:bg-gold-900/20 px-2 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span className="text-sm font-bold text-gold-600">{avgRating}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {hotel.description}
            </p>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {amenities.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="text-xs px-2 py-0.5 rounded-md bg-muted border border-border/60 text-muted-foreground capitalize"
                  >
                    {amenityEmojis[a.toLowerCase()] ?? "✓"} {a}
                  </span>
                ))}
                {amenities.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                    +{amenities.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <div>
                {hotel.pricePerNight > 0 && (
                  <>
                    <span className="text-xl font-bold text-brand-600">
                      {formatPrice(hotel.pricePerNight)}
                    </span>
                    <span className="text-xs text-muted-foreground"> / night</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 text-brand-500 text-sm font-semibold group-hover:gap-2 transition-all">
                View Hotel <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedHotels({ hotels }: FeaturedHotelsProps) {
  if (!hotels.length) return null;

  return (
    <section className="section-padding bg-muted/30 dark:bg-muted/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 dark:bg-ocean-950/30 border border-ocean-200 dark:border-ocean-800 text-ocean-600 dark:text-ocean-400 text-sm font-semibold mb-4">
            🏨 Top Rated Hotels
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Luxury{" "}
            <span className="gradient-text-ocean">Hotels & Resorts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Stay in the finest hotels handpicked for exceptional comfort,
            stunning views, and world-class service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.slice(0, 6).map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/hotels">
            <Button size="lg" variant="outline" className="gap-2">
              Explore All Hotels <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
