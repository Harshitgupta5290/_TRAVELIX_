"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Users, MapPin, Star, ArrowRight, Plane, Train, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, mediumLabel } from "@/lib/utils";
import type { PackageWithRelations } from "@/types";

interface FeaturedPackagesProps {
  packages: PackageWithRelations[];
}

const mediumIcon = (medium: string) => {
  if (medium === "TRAIN") return Train;
  if (medium === "BUS") return Bus;
  return Plane;
};

function PackageCard({ pkg, index }: { pkg: PackageWithRelations; index: number }) {
  const avgRating =
    pkg.reviews && pkg.reviews.length > 0
      ? (pkg.reviews.reduce((a, r) => a + r.rating, 0) / pkg.reviews.length).toFixed(1)
      : null;
  const MediumIcon = mediumIcon(pkg.medium);
  const discount = pkg.salePrice
    ? Math.round(((pkg.price - pkg.salePrice) / pkg.price) * 100)
    : null;
  const displayPrice = pkg.salePrice ?? pkg.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/packages/${pkg.slug}`} className="group block h-full">
        <div className="relative h-full rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-52 overflow-hidden bg-muted">
            {pkg.image ? (
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ocean-400 to-brand-500 flex items-center justify-center">
                <Plane className="w-16 h-16 text-white/30" />
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {pkg.featured && (
                <Badge variant="default" className="text-xs">
                  ⭐ Featured
                </Badge>
              )}
              {discount && (
                <Badge className="bg-green-500 text-white text-xs">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            {/* Medium badge */}
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                <MediumIcon className="w-3 h-3" />
                <span>{pkg.medium}</span>
              </div>
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Route */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
              <MapPin className="w-3 h-3" />
              <span className="font-medium">{pkg.source}</span>
              <ArrowRight className="w-3 h-3 opacity-60" />
              <span className="font-medium">{pkg.destination}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading font-semibold text-lg leading-tight mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
              {pkg.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {pkg.description || `${pkg.days} days ${pkg.nights} nights trip from ${pkg.source} to ${pkg.destination}`}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-ocean-500" />
                {pkg.days}D / {pkg.nights}N
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-500" />
                {pkg.persons} persons
              </span>
              {avgRating && (
                <span className="flex items-center gap-1 ml-auto">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span className="font-semibold text-foreground">{avgRating}</span>
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-brand-600">
                    {formatPrice(displayPrice)}
                  </span>
                  {pkg.salePrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(pkg.price)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
              <div className="flex items-center gap-1 text-brand-500 text-sm font-semibold group-hover:gap-2 transition-all">
                View Details
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  if (!packages.length) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-4">
            ✈️ Handpicked Packages
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Featured{" "}
            <span className="gradient-text">Travel Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Curated experiences crafted for every kind of traveler — from budget
            adventures to luxury getaways.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 6).map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/packages">
            <Button size="lg" variant="outline" className="gap-2">
              View All Packages <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
