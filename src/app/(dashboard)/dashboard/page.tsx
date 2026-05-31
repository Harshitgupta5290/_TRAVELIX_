import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { BookOpen, User, Package, TrendingUp, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = session.user?.id as string;

  const [user, recentBookings, bookingCount] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, avatar: true, createdAt: true },
    }),
    db.booking.findMany({
      where: { userId },
      include: { package: { include: { hotel: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.booking.count({ where: { userId } }),
  ]);

  const totalSpent = await db.booking.aggregate({
    where: { userId },
    _sum: { amount: true },
  });

  const stats = [
    { label: "Total Bookings", value: bookingCount, icon: BookOpen, color: "text-brand-500", bg: "bg-brand-50 dark:bg-brand-950/30" },
    { label: "Total Spent", value: formatPrice(totalSpent._sum.amount ?? 0), icon: TrendingUp, color: "text-ocean-500", bg: "bg-ocean-50 dark:bg-ocean-950/30" },
    { label: "Member Since", value: user ? formatDate(user.createdAt).split(" ").slice(-1)[0] : "—", icon: Clock, color: "text-gold-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  ];

  return (
    <div className="container-custom py-10 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-1">
          Welcome back, {user?.name?.split(" ")[0] ?? "Traveler"}! 👋
        </h1>
        <p className="text-muted-foreground">Here's an overview of your travel activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-6 border border-border/40`}>
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/packages", label: "Browse Packages", icon: Package, desc: "Find your next adventure" },
          { href: "/dashboard/bookings", label: "My Bookings", icon: BookOpen, desc: "View all trips" },
          { href: "/dashboard/profile", label: "Edit Profile", icon: User, desc: "Update your details" },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="group flex items-center gap-4 p-5 rounded-2xl border border-border/60 bg-card hover:border-brand-300 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center">
              <action.icon className="w-5 h-5 text-brand-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm group-hover:text-brand-600 transition-colors">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border/60">
          <h2 className="font-heading font-semibold text-lg">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-sm text-brand-500 hover:underline font-medium">
            View all →
          </Link>
        </div>
        {recentBookings.length === 0 ? (
          <div className="py-14 text-center">
            <p className="text-4xl mb-3">✈️</p>
            <p className="font-semibold mb-1">No bookings yet</p>
            <p className="text-muted-foreground text-sm mb-4">Your next adventure awaits!</p>
            <Link href="/packages" className="inline-flex items-center gap-1.5 text-brand-500 font-semibold text-sm hover:underline">
              Browse packages <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden shrink-0">
                    {booking.package.image ? (
                      <img src={booking.package.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-400 to-ocean-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm line-clamp-1">{booking.package.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatPrice(booking.amount)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                    booking.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
