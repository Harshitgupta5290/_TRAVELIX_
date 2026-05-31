import { Metadata } from "next";

export const dynamic = "force-dynamic";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about TRAVELIX travel booking.",
};

const faqs = [
  {
    category: "Booking",
    items: [
      { q: "How do I book a travel package?", a: "Simply browse our packages, click on the one you like, and click 'Book Now'. You'll need to create an account and provide payment details to complete your booking." },
      { q: "Can I book without creating an account?", a: "No, you need to create a free account to book packages. This allows us to send you confirmation details and manage your booking history." },
      { q: "What payment methods are accepted?", a: "We accept Visa, Mastercard, American Express, and RuPay debit/credit cards." },
    ],
  },
  {
    category: "Cancellations & Refunds",
    items: [
      { q: "Can I cancel my booking?", a: "Yes. Cancellations made 24 hours before the travel date are eligible for a full refund. After that, cancellation charges may apply." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5-7 business days and will be credited back to your original payment method." },
    ],
  },
  {
    category: "Packages & Hotels",
    items: [
      { q: "What does a package include?", a: "Each package has a detailed 'What's Included' section listing all inclusions such as accommodation, transfers, sightseeing, and meals where applicable." },
      { q: "Are there any hidden charges?", a: "No. The price shown is the final price per person. Any applicable taxes are included in the displayed amount." },
      { q: "Can I customize a package?", a: "Yes! Contact our team via the Contact page and we'll create a custom package tailored to your preferences." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "How do I change my password?", a: "Go to Dashboard → Profile Settings → Change Password. Enter your current password and set a new one." },
      { q: "Can I update my profile details?", a: "Yes. Visit your Dashboard → Profile to update your name, phone, address, and other personal details." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            ❓ Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Everything you need to know about booking and traveling with TRAVELIX.
          </p>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="space-y-10">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-heading font-bold mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950/40 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-brand-500" />
                  </span>
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.items.map((faq, i) => (
                    <details key={i} className="group bg-card rounded-2xl border border-border/60 overflow-hidden">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm hover:bg-muted/30 transition-colors">
                        {faq.q}
                        <span className="text-muted-foreground group-open:rotate-180 transition-transform duration-200 text-lg ml-4 shrink-0">+</span>
                      </summary>
                      <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still need help? */}
          <div className="mt-12 text-center p-8 bg-gradient-to-br from-brand-50 to-ocean-50 dark:from-brand-950/20 dark:to-ocean-950/20 rounded-2xl border border-brand-200 dark:border-brand-800">
            <h3 className="text-xl font-heading font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-5">Our team is ready to help you 24/7.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold text-sm transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
