"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Plane, ChevronDown, User, LogOut,
  LayoutDashboard, Settings, Shield, BookOpen,
  MapPin, Hotel, Package, Phone, Info, HelpCircle,
  Sun, Moon, Percent, Globe, Tag, Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Hotels", href: "/hotels", icon: Hotel },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

const DESTINATIONS = [
  { name: "Goa", tag: "Beach", href: "/packages?destination=Goa", emoji: "🏖️" },
  { name: "Kerala", tag: "Nature", href: "/packages?destination=Kerala", emoji: "🌿" },
  { name: "Rajasthan", tag: "Heritage", href: "/packages?destination=Rajasthan", emoji: "🏰" },
  { name: "Manali", tag: "Adventure", href: "/packages?destination=Manali", emoji: "🏔️" },
  { name: "Maldives", tag: "Luxury", href: "/packages?destination=Maldives", emoji: "🌊" },
  { name: "Bali", tag: "International", href: "/packages?destination=Bali", emoji: "🌺" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setDestOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHome
            ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-brand-glow transition-shadow duration-300">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <span className={cn(
                "text-xl font-heading font-bold tracking-wider transition-colors duration-300",
                isTransparent ? "text-white" : "text-foreground"
              )}>
                TRAVEL<span className="text-brand-500">IX</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group",
                    pathname === link.href
                      ? "text-brand-500"
                      : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 bg-brand-500 rounded-full"
                    />
                  )}
                </Link>
              ))}

              {/* Destinations dropdown */}
              <div ref={destRef} className="relative">
                <button
                  onClick={() => setDestOpen(!destOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <Compass className="w-3.5 h-3.5" />
                  Explore
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", destOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {destOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-72 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">Popular Destinations</p>
                        <div className="grid grid-cols-2 gap-1">
                          {DESTINATIONS.map((d) => (
                            <Link
                              key={d.name}
                              href={d.href}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <span className="text-xl">{d.emoji}</span>
                              <div>
                                <p className="text-sm font-medium group-hover:text-brand-600 transition-colors">{d.name}</p>
                                <p className="text-xs text-muted-foreground">{d.tag}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border mt-2 pt-2">
                          <Link
                            href="/packages"
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/30 text-brand-600 transition-colors text-sm font-semibold"
                          >
                            View all packages
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isTransparent
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-foreground/60 hover:bg-muted hover:text-foreground"
                  )}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200",
                      isTransparent
                        ? "text-white/90 hover:bg-white/10"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">
                      {session.user?.name?.split(" ")[0] ?? "User"}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", userMenuOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="p-2">
                          <div className="px-3 py-2.5 mb-1 bg-muted/50 rounded-xl">
                            <p className="text-xs text-muted-foreground">Signed in as</p>
                            <p className="text-sm font-semibold truncate">{session.user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                          </div>
                          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-brand-500" /> Dashboard
                          </Link>
                          <Link href="/dashboard/bookings" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                            <BookOpen className="w-4 h-4 text-ocean-500" /> My Bookings
                          </Link>
                          <Link href="/dashboard/profile" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                            <Settings className="w-4 h-4 text-muted-foreground" /> Settings
                          </Link>
                          {(session.user as any)?.role === "ADMIN" && (
                            <>
                              <div className="h-px bg-border my-1" />
                              <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                                <Shield className="w-4 h-4 text-gold-500" /> Admin Panel
                              </Link>
                            </>
                          )}
                          <div className="h-px bg-border my-1" />
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className={cn(isTransparent && "text-white hover:bg-white/10 border-white/20")}>
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="shadow-sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isTransparent ? "text-white/80 hover:bg-white/10" : "text-foreground/60 hover:bg-muted"
                  )}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
                )}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/98 backdrop-blur-xl border-b border-border shadow-xl overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400"
                        : "hover:bg-muted text-foreground/80"
                    )}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Popular destinations in mobile */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Popular Destinations</p>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map((d) => (
                    <Link key={d.name} href={d.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-brand-50 hover:text-brand-600 text-sm transition-colors">
                      <span>{d.emoji}</span>{d.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border my-2" />

              {session ? (
                <div className="space-y-1">
                  <div className="px-4 py-2">
                    <p className="text-xs text-muted-foreground">Signed in as <span className="font-semibold text-foreground">{session.user?.name}</span></p>
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-muted transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-brand-500" /> Dashboard
                  </Link>
                  <Link href="/dashboard/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-muted transition-colors">
                    <BookOpen className="w-4 h-4 text-ocean-500" /> My Bookings
                  </Link>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-muted transition-colors">
                      <Shield className="w-4 h-4 text-gold-500" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 pb-2">
                  <Link href="/login"><Button variant="outline" className="w-full">Sign in</Button></Link>
                  <Link href="/register"><Button className="w-full">Get Started Free</Button></Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {(userMenuOpen || destOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setUserMenuOpen(false); setDestOpen(false); }} />
      )}
    </>
  );
}
