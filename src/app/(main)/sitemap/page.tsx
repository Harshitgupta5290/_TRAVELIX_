import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sitemap", description: "TRAVELIX sitemap — all pages and sections." };

const LINKS = [
  { section: "Main", links: [{ href: "/", label: "Home" }, { href: "/packages", label: "Travel Packages" }, { href: "/hotels", label: "Hotels & Resorts" }, { href: "/about", label: "About Us" }, { href: "/contact", label: "Contact" }, { href: "/faq", label: "FAQ" }] },
  { section: "Account", links: [{ href: "/login", label: "Sign In" }, { href: "/register", label: "Create Account" }, { href: "/dashboard", label: "My Dashboard" }, { href: "/dashboard/bookings", label: "My Bookings" }, { href: "/dashboard/profile", label: "My Profile" }] },
  { section: "Company", links: [{ href: "/careers", label: "Careers" }, { href: "/press", label: "Press Room" }, { href: "/feedback", label: "Feedback" }] },
  { section: "Legal", links: [{ href: "/privacy", label: "Privacy Policy" }, { href: "/terms", label: "Terms of Service" }, { href: "/sitemap", label: "Sitemap" }] },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Sitemap</h1>
          <p className="text-white/60">All pages on TRAVELIX</p>
        </div>
      </div>
      <div className="container-custom max-w-4xl py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {LINKS.map((group) => (
            <div key={group.section}>
              <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">{group.section}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground/80 hover:text-brand-500 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
