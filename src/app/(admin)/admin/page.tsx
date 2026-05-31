import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Package, Hotel, Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin Dashboard | TRAVELIX" };

export default async function AdminDashboard() {
  const [packageCount, hotelCount, userCount, bookingCount, revenueResult, recentBookings] =
    await Promise.all([
      db.package.count(),
      db.hotel.count(),
      db.user.count({ where: { role: "USER" } }),
      db.booking.count(),
      db.booking.aggregate({ _sum: { amount: true } }),
      db.booking.findMany({
        include: {
          package: true,
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);

  const totalRevenue = revenueResult._sum.amount ?? 0;

  const stats = [
    { label: "Total Packages", value: packageCount, icon: Package, href: "/admin/packages", color: "from-brand-500 to-brand-600", bg: "bg-brand-50 dark:bg-brand-950/30" },
    { label: "Total Hotels", value: hotelCount, icon: Hotel, href: "/admin/hotels", color: "from-ocean-500 to-ocean-600", bg: "bg-ocean-50 dark:bg-ocean-950/30" },
    { label: "Total Users", value: userCount, icon: Users, href: "/admin/users", color: "from-purple-500 to-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
    { label: "Total Bookings", value: bookingCount, icon: BookOpen, href: "/admin/bookings", color: "from-green-500 to-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: DollarSign, href: "/admin/bookings", color: "from-gold-500 to-gold-600", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className={`${stat.bg} rounded-2xl p-5 border border-border/40 hover:shadow-md transition-all`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: "/admin/packages", label: "Add Package", color: "bg-brand-500 hover:bg-brand-600" },
          { href: "/admin/hotels", label: "Add Hotel", color: "bg-ocean-500 hover:bg-ocean-600" },
          { href: "/admin/categories", label: "Add Category", color: "bg-purple-500 hover:bg-purple-600" },
          { href: "/admin/users", label: "Manage Users", color: "bg-green-500 hover:bg-green-600" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className={`${a.color} text-white rounded-xl px-4 py-3 text-sm font-semibold text-center transition-colors`}>
            {a.label}
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <h2 className="font-semibold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-xs text-brand-500 hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase">User</th>
                <th className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase">Package</th>
                <th className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase">Amount</th>
                <th className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-3">
                    <p className="font-medium">{b.user.name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">{b.user.email}</p>
                  </td>
                  <td className="px-6 py-3 max-w-xs">
                    <p className="line-clamp-1">{b.package.title}</p>
                  </td>
                  <td className="px-6 py-3 font-semibold">{formatPrice(b.amount)}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      b.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
