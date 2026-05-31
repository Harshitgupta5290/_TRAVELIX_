import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { ArrowLeft, Package, Hotel, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Bookings" };

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const bookings = await db.booking.findMany({
    where: { userId: session.user?.id as string },
    include: {
      package: {
        include: { hotel: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-custom py-10 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold">My Bookings</h1>
          <p className="text-muted-foreground text-sm">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl border border-border/60">
          <p className="text-6xl mb-4">✈️</p>
          <h3 className="text-xl font-heading font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">Start exploring amazing travel packages!</p>
          <Link href="/packages" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold text-sm transition-colors">
            <Package className="w-4 h-4" /> Browse Packages
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Image */}
                <div className="relative w-full sm:w-40 h-36 sm:h-auto shrink-0 bg-muted overflow-hidden">
                  {booking.package.image ? (
                    <img src={booking.package.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-400 to-ocean-500" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg line-clamp-1">{booking.package.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.package.source} → {booking.package.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.package.days} days / {booking.package.nights} nights
                        </span>
                        {booking.package.hotel && (
                          <span className="flex items-center gap-1">
                            <Hotel className="w-3 h-3" />
                            {booking.package.hotel.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border ${
                      booking.status === "CONFIRMED" ? "bg-green-50 text-green-700 border-green-200" :
                      booking.status === "CANCELLED" ? "bg-red-50 text-red-700 border-red-200" :
                      booking.status === "COMPLETED" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>{booking.status}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Booked on {formatDate(booking.createdAt)}</p>
                      {booking.travelDate && (
                        <p className="text-xs text-muted-foreground">Travel date: {formatDate(booking.travelDate)}</p>
                      )}
                      {booking.cardType && (
                        <p className="text-xs text-muted-foreground">{booking.cardType} •••• {booking.cardLast4}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-brand-600">{formatPrice(booking.amount)}</p>
                      <p className="text-xs text-muted-foreground">per person · {booking.package.persons} pax</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
