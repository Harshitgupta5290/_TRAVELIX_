import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our travel experts at TRAVELIX.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1a2744] to-[#0f172a] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=70"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 to-[#0f172a]/90" />
        </div>
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            💬 Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Have a question or need help planning your perfect trip? We&apos;re here 24/7 for you.
          </p>
        </div>
      </div>

      {/* Form section */}
      <ContactForm />
    </div>
  );
}
