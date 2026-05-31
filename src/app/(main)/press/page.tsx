import type { Metadata } from "next";
import { Mail, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Press",
  description: "TRAVELIX press room — media resources, press releases, and brand assets.",
};

const PRESS_RELEASES = [
  { date: "May 2025", title: "TRAVELIX Crosses 10,000 Bookings Milestone", excerpt: "India's fastest-growing travel platform celebrates a major achievement in just its first year of operations." },
  { date: "March 2025", title: "TRAVELIX Launches Train Booking Feature", excerpt: "New feature allows seamless booking of train journeys alongside existing flight, hotel, and package offerings." },
  { date: "January 2025", title: "TRAVELIX Raises Series A Funding", excerpt: "Travel tech startup secures funding to expand its portfolio of destinations and improve platform experience." },
];

export default function PressPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Press Room</h1>
          <p className="text-white/60 text-lg">Media resources, press releases, and brand information.</p>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Press releases */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-heading font-bold mb-6">Press Releases</h2>
              <div className="space-y-4">
                {PRESS_RELEASES.map((pr) => (
                  <div key={pr.title} className="p-6 bg-card rounded-2xl border border-border/60">
                    <p className="text-xs text-muted-foreground mb-2">{pr.date}</p>
                    <h3 className="font-semibold text-lg mb-2">{pr.title}</h3>
                    <p className="text-sm text-muted-foreground">{pr.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Media kit */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Media Kit</h2>
              <div className="space-y-4">
                <div className="p-5 bg-muted/30 rounded-2xl border border-border/60">
                  <p className="font-semibold mb-1">Brand Assets</p>
                  <p className="text-sm text-muted-foreground mb-3">Logos, colors, and brand guidelines</p>
                  <button className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
                    <Download className="w-4 h-4" /> Download Kit
                  </button>
                </div>
                <div className="p-5 bg-muted/30 rounded-2xl border border-border/60">
                  <p className="font-semibold mb-1">Press Contact</p>
                  <p className="text-sm text-muted-foreground mb-2">For media inquiries:</p>
                  <a href="mailto:press@travelix.com" className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
                    <Mail className="w-4 h-4" /> press@travelix.com
                  </a>
                </div>
                <div className="p-5 bg-muted/30 rounded-2xl border border-border/60 space-y-2">
                  <p className="font-semibold">Company Facts</p>
                  <p className="text-sm text-muted-foreground">Founded: 2024</p>
                  <p className="text-sm text-muted-foreground">HQ: Mumbai, India</p>
                  <p className="text-sm text-muted-foreground">Employees: 50+</p>
                  <p className="text-sm text-muted-foreground">Bookings: 10,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
