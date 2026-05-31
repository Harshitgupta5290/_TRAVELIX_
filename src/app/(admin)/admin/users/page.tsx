import db from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Users | Admin | TRAVELIX" };

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    include: {
      _count: { select: { bookings: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const admins = users.filter((u) => u.role === "ADMIN").length;
  const regular = users.filter((u) => u.role === "USER").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} total · {admins} admin · {regular} users</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Bookings</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {users.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">No users yet.</td></tr>
              ) : users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="font-medium">{u.name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{u.phone ?? "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{[u.city, u.country].filter(Boolean).join(", ") || "—"}</td>
                  <td className="px-5 py-3 font-semibold">{u._count.bookings}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      u.role === "ADMIN"
                        ? "bg-gold-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString("en-IN")}
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
