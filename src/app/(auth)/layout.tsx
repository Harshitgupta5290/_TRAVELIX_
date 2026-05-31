import Link from "next/link";
import { Plane } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Decorative panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-[#0f172a] flex-col justify-between p-12">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85"
            alt="Travel"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#0f172a]/70 to-brand-900/50" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-wider">
              TRAVEL<span className="text-brand-400">IX</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="text-2xl font-heading font-medium text-white/90 leading-relaxed mb-6">
            &ldquo;The world is a book, and those who do not travel read only one page.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm">— Saint Augustine</p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {["500+ Destinations", "10K+ Travelers", "4.9★ Rating"].map((s) => (
              <div key={s} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white text-sm font-semibold">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
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
