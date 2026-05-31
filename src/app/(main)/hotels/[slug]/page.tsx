import { notFound } from "next/navigation";
import db from "@/lib/db";
import { formatPrice, parseJsonField } from "@/lib/utils";
import Link from "next/link";
import { MapPin, Star, Package, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hotel = await db.hotel.findUnique({ where: { slug: params.slug } });
  if (!hotel) return { title: "Hotel Not Found" };
  return { title: hotel.name, description: hotel.description };
}

export default async function HotelDetailPage({ params }: Props) {
  const hotel = await db.hotel.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      packages: { where: { status: "ACTIVE" }, take: 4 },
      reviews: {
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        take: 8,
      },
    },
  });

  if (!hotel) notFound();

  const amenities = parseJsonField<string[]>(hotel.amenities, []);
  const avgRating = hotel.reviews.length
    ? (hotel.reviews.reduce((a, r) => a + r.rating, 0) / hotel.reviews.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-80 md:h-[30rem] overflow-hidden bg-muted">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
        <div className="absolute bottom-6 container-custom">
          <Link href="/hotels" className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to hotels
          </Link>
        </div>
      </div>

      <div className="container-custom pb-16 grid lg:grid-cols-3 gap-8 -mt-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">{hotel.name}</h1>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {hotel.city}, {hotel.country}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">{"⭐".repeat(hotel.stars)}</div>
                {avgRating && (
                  <div className="flex items-center gap-1 justify-center">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="font-bold">{avgRating}</span>
                    <span className="text-xs text-muted-foreground">({hotel.reviews.length})</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">{hotel.description}</p>
          </div>

          {/* Second image */}
          {hotel.image2 && (
            <div className="rounded-2xl overflow-hidden h-60">
              <img src={hotel.image2} alt={`${hotel.name} gallery`} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">🏷️ Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 border border-border/50 text-sm capitalize">
                    <span className="text-base">✓</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available packages */}
          {hotel.packages.length > 0 && (
            <div className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">✈️ Available Packages</h2>
              <div className="space-y-3">
                {hotel.packages.map((pkg) => (
                  <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors group">
                    <div>
                      <p className="font-semibold text-sm group-hover:text-brand-600 transition-colors">{pkg.title}</p>
                      <p className="text-xs text-muted-foreground">{pkg.source} → {pkg.destination} · {pkg.days} days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-600">{formatPrice(pkg.salePrice ?? pkg.price)}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {hotel.reviews.length > 0 && (
            <div className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-5">💬 Guest Reviews</h2>
              <div className="space-y-4">
                {hotel.reviews.map((review) => (
                  <div key={review.id} className="flex gap-3 pb-4 border-b border-border/40 last:border-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {review.user?.name?.[0] ?? "G"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{review.user?.name ?? "Guest"}</span>
                        <span className="text-xs text-gold-500">{"★".repeat(review.rating)}</span>
                      </div>
                      {review.description && <p className="text-sm text-muted-foreground">{review.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="h-fit sticky top-24">
          <div className="bg-card rounded-2xl border border-border/60 shadow-lg p-6">
            <div className="bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-xl p-5 text-white mb-5">
              <p className="text-white/70 text-sm mb-1">Starting from</p>
              {hotel.pricePerNight > 0 ? (
                <>
                  <p className="text-3xl font-bold">{formatPrice(hotel.pricePerNight)}</p>
                  <p className="text-white/60 text-xs">per night</p>
                </>
              ) : (
                <p className="text-xl font-semibold">Contact for pricing</p>
              )}
            </div>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hotel Class</span>
                <span className="font-semibold">{"⭐".repeat(hotel.stars)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-semibold">{hotel.city}</span>
              </div>
              {hotel.category && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold">{hotel.category.name}</span>
                </div>
              )}
            </div>
            <Link href="/packages">
              <button className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                <Package className="w-4 h-4" /> Browse Packages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
