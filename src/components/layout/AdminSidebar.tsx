"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Hotel, Users, BookOpen, Tag, ArrowLeft } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/hotels", label: "Hotels", icon: Hotel },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {adminLinks.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                  : "text-white/60 hover:text-white hover:bg-white/10 border border-transparent"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-brand-400" : "")} />
              {label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2.5 text-white/40 hover:text-white/80 text-xs rounded-xl hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to site
        </Link>
      </div>
    </>
  );
}
