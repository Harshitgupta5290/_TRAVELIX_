"use client";

import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  services: [
    { label: "Travel Packages", href: "/packages" },
    { label: "Hotels", href: "/hotels" },
    { label: "Flight Booking", href: "/packages?medium=FLIGHT" },
    { label: "Train Booking", href: "/packages?medium=TRAIN" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Share Feedback", href: "/feedback" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0f1e] text-white/80 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-ocean-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Newsletter strip */}
        <div className="border-b border-white/5">
          <div className="container-custom py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-heading font-semibold text-white">
                  Get the best travel deals 🎉
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  Subscribe to our newsletter. No spam, ever.
                </p>
              </div>
              <form
                className="flex w-full md:w-auto gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="container-custom py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
                  <Plane className="w-5 h-5 text-white -rotate-45" />
                </div>
                <span className="text-2xl font-heading font-bold text-white tracking-wider">
                  TRAVEL<span className="text-brand-400">IX</span>
                </span>
              </Link>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Your premium travel companion. Discover stunning destinations, book
                luxury hotels, and create unforgettable memories with curated travel
                experiences.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>hello@travelix.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all duration-200 text-white/50 ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Company", links: footerLinks.company },
              { title: "Services", links: footerLinks.services },
              { title: "Support", links: footerLinks.support },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-brand-400 transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30 text-center md:text-left">
              © {new Date().getFullYear()} TRAVELIX. All rights reserved. Built with ❤️ for travelers.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
