"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Users, Globe, Award, Heart, Zap, CheckCircle,
  MapPin, Plane, Star, TrendingUp, Clock, Headphones,
  ArrowRight, Quote, Linkedin, Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "500+", label: "Destinations", icon: Globe, color: "from-brand-500 to-brand-600" },
  { value: "10K+", label: "Happy Travelers", icon: Users, color: "from-ocean-500 to-ocean-600" },
  { value: "4.9★", label: "Avg Rating", icon: Star, color: "from-gold-500 to-yellow-500" },
  { value: "24/7", label: "Customer Support", icon: Headphones, color: "from-purple-500 to-purple-600" },
  { value: "50+", label: "Countries", icon: MapPin, color: "from-pink-500 to-rose-500" },
  { value: "₹0", label: "Hidden Fees", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bio: "Former product lead at Goibibo. 10+ years in travel-tech. Believes every trip should tell a story.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Sneha Kapoor",
    role: "Head of Experiences",
    bio: "Ex-travel journalist. Has visited 60+ countries and personally curates every package on TRAVELIX.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
  },
  {
    name: "Rohit Nair",
    role: "CTO",
    bio: "Built payment systems for 3 unicorns. Obsessed with making travel booking fast and frictionless.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    name: "Priya Iyer",
    role: "Head of Customer Success",
    bio: "Makes sure every traveler feels like a VIP. Led support at MakeMyTrip for 5 years.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
];

const MILESTONES = [
  { year: "2019", title: "TRAVELIX Founded", desc: "Started as a weekend-trip booking service out of a Mumbai apartment." },
  { year: "2020", title: "First 1,000 Bookings", desc: "Hit our first milestone during a challenging year by pivoting to staycations." },
  { year: "2021", title: "Expanded Pan-India", desc: "Launched packages covering all 29 states. Crossed ₹1 Cr in GMV." },
  { year: "2022", title: "International Launch", desc: "Added Maldives, Bali, Dubai, and Thailand. 5,000+ customers served." },
  { year: "2023", title: "Mobile App & ₹10Cr GMV", desc: "Launched iOS & Android apps. Crossed 10,000 happy travelers milestone." },
  { year: "2024", title: "Award Winning Platform", desc: "Named 'Best Travel Startup' by TechIndia. Now serving 50+ countries." },
];

const VALUES = [
  { icon: Shield, title: "Trust & Safety", desc: "Bank-grade encryption, secure payments, and verified hotel partners. Your safety is non-negotiable.", color: "from-blue-500 to-blue-600" },
  { icon: Zap, title: "Simplicity First", desc: "Book your dream vacation in under 3 minutes. No hidden fees, no complicated flows.", color: "from-brand-500 to-brand-600" },
  { icon: Heart, title: "Made With Passion", desc: "Every package is hand-picked by people who've been there. We don't list what we wouldn't book ourselves.", color: "from-pink-500 to-rose-600" },
  { icon: TrendingUp, title: "Best Price Guarantee", desc: "Find a cheaper rate elsewhere? We'll match it plus give you ₹500 off your next booking.", color: "from-green-500 to-emerald-600" },
  { icon: Clock, title: "24/7 Support", desc: "Humans answer our phones, not bots. Day or night, someone from our team is always available.", color: "from-purple-500 to-violet-600" },
  { icon: Globe, title: "Sustainable Travel", desc: "We partner with eco-certified properties and offset carbon for every flight booking.", color: "from-teal-500 to-cyan-600" },
];

const PRESS = [
  { outlet: "TechIndia", quote: "Best Travel Startup of 2024", logo: "🏆" },
  { outlet: "YourStory", quote: "Disrupting the ₹1.5 Lakh Cr travel industry", logo: "📰" },
  { outlet: "Economic Times", quote: "The MakeMyTrip for the next generation", logo: "📊" },
  { outlet: "Startup India", quote: "Top 50 Most Innovative Startups", logo: "🚀" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80"
            alt="About TRAVELIX"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 to-[#0f172a]/90" />
        </div>
        {/* floating orbs */}
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-ocean-500/10 blur-3xl pointer-events-none" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-5">
              🌍 Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Travel with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">Purpose</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              TRAVELIX was born from a simple belief: every journey should be extraordinary.
              We&apos;re a team of passionate travelers making world-class travel accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/packages">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white border-0 px-8">
                  Explore Packages <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="bg-background border-b border-border/50">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.07}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-heading font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <div className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-5">
                💡 Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
                Making Every Trip <span className="text-brand-500">Unforgettable</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe travel is more than visiting places — it&apos;s about creating memories that last
                a lifetime. Our platform connects you with carefully curated experiences, luxurious
                accommodations, and a seamless booking process.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From budget backpackers to luxury honeymooners, we serve every kind of explorer with
                personalized packages, transparent pricing, and human support — always.
              </p>
              <div className="space-y-3">
                {["No hidden fees, ever", "Verified hotels and packages only", "Human support 24×7", "Best price guarantee"].map((p) => (
                  <div key={p} className="flex items-center gap-2.5 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80"
                  alt="Travel"
                  className="w-full rounded-3xl shadow-2xl object-cover h-96"
                />
                <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white -rotate-45" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">10,000+ Trips</p>
                      <p className="text-xs text-muted-foreground">Booked this year</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="font-bold text-sm">4.9/5</span>
                    <span className="text-xs text-muted-foreground">Rating</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <div className="section-padding bg-muted/20">
        <div className="container-custom max-w-5xl">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 dark:bg-ocean-950/30 border border-ocean-200 dark:border-ocean-800 text-ocean-600 dark:text-ocean-400 text-sm font-semibold mb-4">
              ✨ What We Stand For
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Our Core Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide every decision we make.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.07}>
                <div className="bg-card rounded-2xl p-6 border border-border/60 hover:shadow-md transition-shadow duration-300">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <v.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-base mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <div className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 dark:bg-gold-950/30 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 text-sm font-semibold mb-4">
              📅 Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Milestones That Define Us</h2>
            <p className="text-muted-foreground">Five years of connecting people with extraordinary places.</p>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
                    <div className="md:w-1/2 flex items-start gap-4 md:gap-0">
                      {i % 2 === 0 ? (
                        <div className="md:text-right md:pr-10 pl-12 md:pl-0">
                          <span className="text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 rounded-full">{m.year}</span>
                          <h3 className="font-heading font-semibold mt-2 mb-1">{m.title}</h3>
                          <p className="text-sm text-muted-foreground">{m.desc}</p>
                        </div>
                      ) : (
                        <div className="md:hidden pl-12">
                          <span className="text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 rounded-full">{m.year}</span>
                          <h3 className="font-heading font-semibold mt-2 mb-1">{m.title}</h3>
                          <p className="text-sm text-muted-foreground">{m.desc}</p>
                        </div>
                      )}
                    </div>
                    {/* dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-500 border-2 border-background shadow-sm md:-translate-x-1.5 mt-1" />
                    {i % 2 !== 0 && (
                      <div className="hidden md:block md:w-1/2 md:pl-10">
                        <span className="text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 rounded-full">{m.year}</span>
                        <h3 className="font-heading font-semibold mt-2 mb-1">{m.title}</h3>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <div className="section-padding bg-muted/20">
        <div className="container-custom max-w-5xl">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-sm font-semibold mb-4">
              👥 The People Behind It
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Travelers, technologists, and storytellers — united by a love for exploration.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="bg-card rounded-2xl p-6 border border-border/60 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-2xl object-cover ring-2 ring-brand-200 dark:ring-brand-800"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f15019&color=fff&size=80`;
                      }}
                    />
                  </div>
                  <h3 className="font-heading font-semibold mb-0.5">{member.name}</h3>
                  <p className="text-xs text-brand-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Press ────────────────────────────────────────────────────────── */}
      <div className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold mb-2">As Seen In</h2>
            <p className="text-muted-foreground text-sm">What the press says about us.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESS.map((p, i) => (
              <FadeIn key={p.outlet} delay={i * 0.07}>
                <div className="bg-muted/30 rounded-2xl p-5 border border-border/40 text-center hover:border-brand-200 transition-colors">
                  <span className="text-3xl mb-3 block">{p.logo}</span>
                  <p className="font-heading font-semibold text-sm mb-1.5">{p.outlet}</p>
                  <p className="text-xs text-muted-foreground italic">&ldquo;{p.quote}&rdquo;</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="section-padding bg-gradient-to-br from-brand-600 to-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=60" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative text-center max-w-2xl">
          <FadeIn>
            <div className="text-5xl mb-4">✈️</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join 10,000+ travelers who trust TRAVELIX for their dream vacations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/packages">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-white/90 border-0 px-8 font-bold">
                  Browse Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

    </div>
  );
}
