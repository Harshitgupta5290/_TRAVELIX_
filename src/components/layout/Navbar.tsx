"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Plane,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  Shield,
  BookOpen,
  MapPin,
  Hotel,
  Package,
  Phone,
  Info,
  HelpCircle,
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

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
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-brand-glow transition-shadow duration-300">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <span
                className={cn(
                  "text-xl font-heading font-bold tracking-wider transition-colors duration-300",
                  isTransparent ? "text-white" : "text-foreground"
                )}
              >
                TRAVEL<span className="text-brand-500">IX</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-brand-500"
                      : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
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
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        userMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="p-2">
                          <div className="px-3 py-2 mb-1">
                            <p className="text-xs text-muted-foreground">Signed in as</p>
                            <p className="text-sm font-semibold truncate">{session.user?.email}</p>
                          </div>
                          <div className="h-px bg-border my-1" />
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-brand-500" />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/bookings"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-ocean-500" />
                            My Bookings
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            Settings
                          </Link>
                          {(session.user as any)?.role === "ADMIN" && (
                            <>
                              <div className="h-px bg-border my-1" />
                              <Link
                                href="/admin"
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                              >
                                <Shield className="w-4 h-4 text-gold-500" />
                                Admin Panel
                              </Link>
                            </>
                          )}
                          <div className="h-px bg-border my-1" />
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(isTransparent && "text-white hover:bg-white/10")}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
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
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
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

              <div className="h-px bg-border my-2" />

              {session ? (
                <div className="space-y-1">
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
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Sign in</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full">Get Started Free</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
}
