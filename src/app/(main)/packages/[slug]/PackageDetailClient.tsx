"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock, Users, MapPin, Star, Plane, Train, Bus, Hotel,
  Calendar, CreditCard, CheckCircle, ArrowLeft, Share2, Heart,
  ChevronDown, ChevronUp, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, parseJsonField } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props {
  pkg: any;
  session: any;
}

export function PackageDetailClient({ pkg, session }: Props) {
  const router = useRouter();
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    cardType: "VISA",
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    travelDate: "",
  });

  const includes = parseJsonField<string[]>(pkg.includes, []);
  const highlights = parseJsonField<string[]>(pkg.highlights, []);
  const displayPrice = pkg.salePrice ?? pkg.price;
  const discount = pkg.salePrice
    ? Math.round(((pkg.price - pkg.salePrice) / pkg.price) * 100)
    : null;
  const avgRating = pkg.reviews?.length
    ? (pkg.reviews.reduce((a: number, r: any) => a + r.rating, 0) / pkg.reviews.length).toFixed(1)
    : null;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push(`/login?callbackUrl=/packages/${pkg.slug}`);
      return;
    }

    if (!bookingForm.nameOnCard || !bookingForm.cardNumber || !bookingForm.cvv ||
      !bookingForm.expiryMonth || !bookingForm.expiryYear) {
      toast.error("Please fill in all payment details");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, ...bookingForm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("🎉 Booking confirmed! Check your dashboard.");
      router.push("/dashboard/bookings");
    } catch (err: any) {
      toast.error(err.message ?? "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden bg-muted">
        {pkg.image ? (
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ocean-500 to-brand-600 flex items-center justify-center">
            <Plane className="w-24 h-24 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4">
          <div className="container-custom">
            <Link href="/packages" className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to packages
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom pb-16">
        <div className="grid lg:grid-cols-3 gap-8 -mt-8 relative">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {pkg.featured && <Badge>⭐ Featured</Badge>}
                <Badge variant="ocean">{pkg.medium}</Badge>
                <Badge variant="secondary">{pkg.status}</Badge>
                {discount && <Badge className="bg-green-500 text-white">{discount}% OFF</Badge>}
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{pkg.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  {pkg.source} → {pkg.destination}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-ocean-500" />
                  {pkg.days} Days / {pkg.nights} Nights
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-green-500" />
                  {pkg.persons} persons
                </span>
                {avgRating && (
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    {avgRating} ({pkg._count?.reviews} reviews)
                  </span>
                )}
              </div>
              {pkg.description && (
                <p className="mt-4 text-foreground/80 leading-relaxed">{pkg.description}</p>
              )}
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
                <h2 className="text-xl font-heading font-semibold mb-4">✨ Package Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* What's included */}
            {includes.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
                <h2 className="text-xl font-heading font-semibold mb-4">📦 What's Included</h2>
                <div className="space-y-2">
                  {includes.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2.5 py-2 border-b border-border/40 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-brand-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Hotel info */}
            {pkg.hotel && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm">
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.hotel.image} alt={pkg.hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white font-semibold">{pkg.hotel.name}</p>
                    <p className="text-white/70 text-sm">{"⭐".repeat(pkg.hotel.stars)} {pkg.hotel.city}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground line-clamp-2">{pkg.hotel.description}</p>
                  <Link href={`/hotels/${pkg.hotel.slug}`} className="text-brand-500 text-sm font-semibold hover:underline mt-2 inline-block">
                    View Hotel →
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            {pkg.reviews?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
                <h2 className="text-xl font-heading font-semibold mb-5">💬 Traveler Reviews</h2>
                <div className="space-y-4">
                  {pkg.reviews.slice(0, 5).map((review: any) => (
                    <div key={review.id} className="flex gap-3 pb-4 border-b border-border/40 last:border-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {review.user?.name?.[0] ?? "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{review.user?.name ?? "Traveler"}</span>
                          <span className="text-xs text-gold-500">{"★".repeat(review.rating)}</span>
                        </div>
                        {review.title && <p className="text-sm font-medium mb-1">{review.title}</p>}
                        {review.description && <p className="text-sm text-muted-foreground">{review.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky booking card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border/60 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white">
                <p className="text-white/70 text-sm">Starting from</p>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-3xl font-bold">{formatPrice(displayPrice)}</span>
                  {pkg.salePrice && (
                    <span className="text-white/50 line-through text-sm">{formatPrice(pkg.price)}</span>
                  )}
                </div>
                <p className="text-white/70 text-xs">per person · {pkg.days} days</p>
              </div>

              <div className="p-6">
                {!showBooking ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      if (!session) {
                        router.push(`/login?callbackUrl=/packages/${pkg.slug}`);
                        return;
                      }
                      setShowBooking(true);
                    }}
                  >
                    {session ? "Book Now" : "Sign in to Book"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                ) : (
                  <form onSubmit={handleBook} className="space-y-3">
                    <h3 className="font-semibold text-sm">Payment Details</h3>

                    <select
                      value={bookingForm.cardType}
                      onChange={(e) => setBookingForm({ ...bookingForm, cardType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background"
                    >
                      {["VISA", "MASTERCARD", "AMEX", "RUPAY"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Name on card"
                      value={bookingForm.nameOnCard}
                      onChange={(e) => setBookingForm({ ...bookingForm, nameOnCard: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background"
                    />

                    <input
                      placeholder="Card number (16 digits)"
                      value={bookingForm.cardNumber}
                      onChange={(e) => setBookingForm({ ...bookingForm, cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                      maxLength={16}
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background font-mono tracking-wider"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={bookingForm.expiryMonth}
                        onChange={(e) => setBookingForm({ ...bookingForm, expiryMonth: e.target.value })}
                        className="px-2 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background"
                      >
                        <option value="">MM</option>
                        {[...Array(12)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, "0")}>{String(i + 1).padStart(2, "0")}</option>)}
                      </select>
                      <select
                        value={bookingForm.expiryYear}
                        onChange={(e) => setBookingForm({ ...bookingForm, expiryYear: e.target.value })}
                        className="px-2 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background"
                      >
                        <option value="">YYYY</option>
                        {[2024, 2025, 2026, 2027, 2028, 2029].map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <input
                        placeholder="CVV"
                        value={bookingForm.cvv}
                        onChange={(e) => setBookingForm({ ...bookingForm, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                        maxLength={3}
                        className="px-2 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background font-mono"
                      />
                    </div>

                    <input
                      type="date"
                      placeholder="Travel date (optional)"
                      value={bookingForm.travelDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, travelDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-background"
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Confirm Booking</>}
                    </Button>

                    <button type="button" onClick={() => setShowBooking(false)} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Cancel
                    </button>
                  </form>
                )}

                <div className="mt-4 space-y-2">
                  {[
                    "✅ Instant confirmation",
                    "✅ Secure payment",
                    "✅ Free cancellation (24h)",
                  ].map((item) => (
                    <p key={item} className="text-xs text-muted-foreground">{item}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
