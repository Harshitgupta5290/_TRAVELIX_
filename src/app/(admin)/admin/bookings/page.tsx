import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Bookings | Admin | TRAVELIX" };

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
};

export default async function AdminBookingsPage() {
  const bookings = await db.booking.findMany({
    include: {
      user: { select: { name: true, email: true } },
      package: { select: { title: true, destination: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const total = bookings.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">{bookings.length} total · {formatPrice(total)} revenue</p>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((s) => {
          const count = bookings.filter((b) => b.status === s).length;
          return (
            <div key={s} className="bg-card rounded-xl p-4 border border-border/60">
              <p className="text-2xl font-bold">{count}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[s]}`}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Traveler</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Package</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Travel Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Booked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">No bookings yet.</td></tr>
              ) : bookings.map((b) => (
                <tr key={b.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium">{b.user.name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">{b.user.email}</p>
                  </td>
                  <td className="px-5 py-3 max-w-[200px]">
                    <p className="line-clamp-1 font-medium">{b.package.title}</p>
                    <p className="text-xs text-muted-foreground">{b.package.destination}</p>
                  </td>
                  <td className="px-5 py-3 font-semibold text-brand-600">{formatPrice(b.amount)}</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">
                    {b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status] ?? ""}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">
                    {new Date(b.createdAt).toLocaleDateString("en-IN")}
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
