import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the TRAVELIX team — help us build the future of travel.",
};

const OPENINGS = [
  { title: "Senior Full Stack Engineer", dept: "Engineering", location: "Mumbai / Remote", type: "Full-time" },
  { title: "Travel Content Writer", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Customer Support Executive", dept: "Operations", location: "Mumbai", type: "Full-time" },
  { title: "UI/UX Designer", dept: "Design", location: "Remote", type: "Full-time" },
  { title: "Travel Partnerships Manager", dept: "Business Dev", location: "Mumbai", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-4">
            🚀 We&apos;re Hiring
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Join TRAVELIX</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Help us make travel accessible, joyful, and unforgettable for millions of people.
          </p>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-3">Open Positions</h2>
            <p className="text-muted-foreground">Join a passionate team building the future of travel in India.</p>
          </div>

          <div className="space-y-4">
            {OPENINGS.map((job) => (
              <div key={job.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-card rounded-2xl border border-border/60 hover:border-brand-300 hover:shadow-md transition-all group">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-brand-600 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">{job.dept}</span>
                  </div>
                </div>
                <Link
                  href={`/contact?subject=Job Application: ${job.title}`}
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-muted/30 rounded-2xl border border-border/60">
            <h3 className="text-xl font-heading font-semibold mb-2">Don&apos;t see a fit?</h3>
            <p className="text-muted-foreground mb-4">Send us your resume — we&apos;re always looking for exceptional talent.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:underline">
              Send open application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
