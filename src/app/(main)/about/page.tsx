import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { Shield, Users, Globe, Award, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about TRAVELIX — your premium travel booking platform.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80"
            alt="About"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 to-[#0f172a]/90" />
        </div>
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            🌍 Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5">
            Travel with <span className="text-brand-400">Purpose</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            TRAVELIX was born from a simple belief: every journey should be extraordinary.
            We&apos;re a team of passionate travelers dedicated to making world-class travel
            accessible to everyone.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-5">
                💡 Our Mission
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Making Every Trip Unforgettable
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We believe travel is more than just visiting places — it&apos;s about creating
                memories that last a lifetime. Our platform connects travelers with
                carefully curated experiences, luxurious accommodations, and seamless
                booking processes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From backpackers to luxury travelers, we serve every kind of explorer with
                personalized packages, competitive pricing, and 24/7 support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, title: "500+ Destinations", desc: "Across 50+ countries", color: "from-brand-500 to-brand-600" },
                { icon: Users, title: "10,000+ Travelers", desc: "Trust us every year", color: "from-ocean-500 to-ocean-600" },
                { icon: Award, title: "Award Winning", desc: "Best travel platform 2024", color: "from-gold-500 to-gold-600" },
                { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority", color: "from-pink-500 to-pink-600" },
              ].map((item) => (
                <div key={item.title} className="bg-muted/30 rounded-2xl p-5 border border-border/40">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-padding bg-muted/20">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-3">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Trust & Safety", desc: "Your payments and personal data are protected with bank-grade encryption and fraud prevention.", color: "from-blue-500 to-blue-600" },
              { icon: Zap, title: "Simplicity", desc: "Book your dream vacation in minutes — no complicated processes or hidden fees.", color: "from-brand-500 to-brand-600" },
              { icon: Heart, title: "Passion", desc: "We genuinely love travel and it shows in every experience we craft.", color: "from-pink-500 to-rose-600" },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-2xl p-7 border border-border/60 text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
