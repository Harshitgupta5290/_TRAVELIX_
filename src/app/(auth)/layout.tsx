import Link from "next/link";
import { Plane, Star, Shield, Globe } from "lucide-react";

const REVIEWS = [
  { name: "Priya S.", text: "Booked Goa in 2 mins. Absolutely seamless!", rating: 5 },
  { name: "Rahul V.", text: "Best price for Kerala I found anywhere.", rating: 5 },
  { name: "Anita P.", text: "Maldives trip was a dream. Highly recommend!", rating: 5 },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left: Decorative panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-[#0a0f1e] flex-col justify-between p-12">
        {/* Background collage */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85"
            alt="Travel"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/95 via-[#0a0f1e]/80 to-brand-950/70" />
        </div>

        {/* Floating accent blobs */}
        <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-ocean-500/10 blur-3xl pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Plane className="w-6 h-6 text-white -rotate-45" />
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-wider">
              TRAVEL<span className="text-brand-400">IX</span>
            </span>
          </Link>
        </div>

        {/* Middle: Quote + stats */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="text-5xl text-brand-400 font-heading leading-none mb-4">&ldquo;</div>
            <blockquote className="text-2xl font-heading font-medium text-white/90 leading-relaxed">
              The world is a book, and those who do not travel read only one page.
            </blockquote>
            <p className="text-white/40 text-sm mt-3">— Saint Augustine</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "500+", label: "Destinations" },
              { value: "10K+", label: "Travelers" },
              { value: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                <p className="text-white font-heading font-bold text-lg">{s.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Mini reviews + trust */}
        <div className="relative z-10 space-y-5">
          {/* Reviews */}
          <div className="space-y-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white/80 text-xs font-semibold">{r.name}</span>
                    <div className="flex">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-xs leading-snug">{r.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> SSL Secured</div>
            <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> 50+ Countries</div>
          </div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-background min-h-screen">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                <Plane className="w-4 h-4 text-white -rotate-45" />
              </div>
              <span className="text-xl font-heading font-bold tracking-wider">
                TRAVEL<span className="text-brand-500">IX</span>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
