import Link from "next/link";
import { Plane, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Animated plane */}
      <div className="relative mb-8">
        <div className="text-8xl font-heading font-black text-muted-foreground/10 select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-2xl shadow-brand-500/30 animate-bounce-gentle">
            <Plane className="w-10 h-10 text-white -rotate-45" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-heading font-bold mb-3">Oops! Page Not Found</h1>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
        Looks like this page flew away! The destination you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/packages"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted text-sm font-semibold transition-colors"
        >
          <Search className="w-4 h-4" /> Browse Packages
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-10">
        Need help?{" "}
        <Link href="/contact" className="text-brand-500 hover:underline">
          Contact our support team
        </Link>
      </p>
    </div>
  );
}
