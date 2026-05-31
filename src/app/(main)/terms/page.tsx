import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TRAVELIX Terms of Service — rules and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/60">Last updated: June 1, 2025</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-14">
        <div className="space-y-8">
          <div className="p-5 bg-brand-50 dark:bg-brand-950/20 rounded-2xl border border-brand-200 dark:border-brand-800">
            <p className="text-sm text-brand-700 dark:text-brand-300">
              By using TRAVELIX, you agree to these Terms of Service. Please read them carefully before making any bookings.
            </p>
          </div>

          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing or using TRAVELIX, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform. We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.",
            },
            {
              title: "2. Account Registration",
              content: "You must create an account to make bookings. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, complete information and update it as necessary. You must be at least 18 years old to create an account. You may not use another person's account without their permission.",
            },
            {
              title: "3. Booking and Payment",
              content: "All bookings are subject to availability. Prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Payment must be made in full at the time of booking. By providing payment information, you confirm that you are authorized to use the payment method. TRAVELIX does not store full card numbers — only the last 4 digits for reference.",
            },
            {
              title: "4. Cancellations and Refunds",
              content: "Cancellation policies vary by package and hotel. The applicable policy is displayed on each listing page. Generally: Cancellations made 48+ hours before travel: full refund. Cancellations made 24-48 hours before travel: 50% refund. Cancellations within 24 hours: no refund. Refunds are processed within 7-10 business days to the original payment method. No-shows are treated as same-day cancellations.",
            },
            {
              title: "5. Travel Documents",
              content: "It is your responsibility to ensure you have valid travel documents (passport, visa, government ID) for your trip. TRAVELIX is not responsible for denied boarding or entry due to missing or invalid documents. For international travel, ensure your passport is valid for at least 6 months beyond your travel date.",
            },
            {
              title: "6. Limitation of Liability",
              content: "TRAVELIX acts as an intermediary between travelers and service providers (hotels, transport operators). We are not liable for: acts or omissions of third-party service providers, natural disasters or force majeure events, delays or cancellations caused by weather or other factors beyond our control, loss or damage to personal belongings during travel. Our maximum liability is limited to the amount paid for the affected booking.",
            },
            {
              title: "7. Prohibited Conduct",
              content: "You agree not to: use the platform for unlawful purposes, make fraudulent bookings, impersonate another person, attempt to gain unauthorized access to our systems, scrape or extract data from the platform, post false reviews or misleading content, harass or abuse our staff or other users.",
            },
            {
              title: "8. Intellectual Property",
              content: "All content on TRAVELIX including text, images, logos, and software is owned by TRAVELIX or our licensors and is protected by copyright law. You may not reproduce, distribute, or create derivative works without written permission.",
            },
            {
              title: "9. Governing Law",
              content: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra. Both parties agree to attempt to resolve disputes amicably before pursuing legal action.",
            },
            {
              title: "10. Contact",
              content: "For questions about these Terms, contact us at legal@travelix.com or write to TRAVELIX Legal Team, Mumbai, Maharashtra, India.",
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-heading font-bold mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
