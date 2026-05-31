import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Plane, LayoutDashboard, Package, Hotel, Users, BookOpen, Tag, MessageSquare, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/hotels", label: "Hotels", icon: Hotel },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if ((session.user as any)?.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-[#0f172a] text-white fixed inset-y-0 left-0 z-50">
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <Plane className="w-4 h-4 text-white -rotate-45" />
          </div>
          <span className="font-heading font-bold text-lg tracking-wider">
            TRAVEL<span className="text-brand-400">IX</span>
          </span>
          <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 border border-brand-500/30 px-1.5 py-0.5 rounded">ADMIN</span>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
              {session.user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{session.user?.name ?? "Admin"}</p>
              <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-xs rounded-lg hover:bg-white/5 transition-colors mt-1">
            <LogOut className="w-3.5 h-3.5" /> Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-60 min-h-screen bg-muted/30 dark:bg-background">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-14 bg-[#0f172a] text-white sticky top-0 z-40">
          <Plane className="w-5 h-5 text-brand-400 -rotate-45" />
          <span className="font-heading font-bold text-base tracking-wider">
            TRAVELIX <span className="text-brand-400 text-xs">ADMIN</span>
          </span>
        </div>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
