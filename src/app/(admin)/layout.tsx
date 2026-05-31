import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Plane } from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if ((session.user as any)?.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#0a0f1e] text-white fixed inset-y-0 left-0 z-50 border-r border-white/5">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
            <Plane className="w-4 h-4 text-white -rotate-45" />
          </div>
          <span className="font-heading font-bold text-base tracking-wider">
            TRAVEL<span className="text-brand-400">IX</span>
          </span>
          <span className="ml-auto text-[10px] bg-brand-500/20 text-brand-400 border border-brand-500/30 px-2 py-0.5 rounded-full font-semibold">
            ADMIN
          </span>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {session.user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{session.user?.name ?? "Admin"}</p>
              <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links (client component for active state) */}
        <AdminSidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 lg:pl-64 min-h-screen bg-muted/20 dark:bg-[#0a0f1e]/30">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-14 bg-[#0a0f1e] text-white sticky top-0 z-40 border-b border-white/10">
          <Plane className="w-4 h-4 text-brand-400 -rotate-45" />
          <span className="font-heading font-bold text-sm tracking-wider">
            TRAVELIX <span className="text-brand-400 text-xs">ADMIN</span>
          </span>
        </div>
        <main className="p-4 md:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
