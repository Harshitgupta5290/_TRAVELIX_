import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Packages | Admin | TRAVELIX" };

const MEDIUM_ICON: Record<string, string> = { FLIGHT: "✈️", TRAIN: "🚂", BUS: "🚌", ROAD: "🚗" };

export default async function AdminPackagesPage() {
  const packages = await db.package.findMany({
    include: {
      category: { select: { name: true } },
      _count: { select: { bookings: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Packages</h1>
          <p className="text-muted-foreground text-sm mt-1">{packages.length} total packages</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Package</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Route</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Price</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Duration</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Bookings</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {packages.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No packages yet.</td></tr>
              ) : packages.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span>{MEDIUM_ICON[p.medium] ?? "🌍"}</span>
                      <div>
                        <p className="font-medium line-clamp-1">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.category?.name ?? "Uncategorised"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{p.source} → {p.destination}</td>
                  <td className="px-5 py-3 font-semibold text-brand-600">
                    {formatPrice(p.salePrice ?? p.price)}
                    {p.salePrice && <span className="text-xs text-muted-foreground line-through ml-1">{formatPrice(p.price)}</span>}
                  </td>
                  <td className="px-5 py-3 text-xs">{p.days}D/{p.nights}N</td>
                  <td className="px-5 py-3 font-semibold">{p._count.bookings}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      p.status === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" :
                      p.status === "SOLDOUT" ? "bg-orange-100 text-orange-700" :
                      "bg-muted text-muted-foreground"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/packages/${p.slug}`} className="text-xs text-brand-500 hover:underline" target="_blank">
                      View →
                    </Link>
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
