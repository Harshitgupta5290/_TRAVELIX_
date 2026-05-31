import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TRAVELIX Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60">Last updated: June 1, 2025</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-14">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect information you provide directly to us when you create an account, make a booking, or contact us. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Personal information: name, email address, phone number</li>
              <li>Profile information: date of birth, gender, address, city, state</li>
              <li>Payment information: card type and last 4 digits only (we never store full card numbers)</li>
              <li>Booking information: travel dates, package preferences, travel history</li>
              <li>Communications: messages you send us through our contact forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Process and confirm your travel bookings</li>
              <li>Send booking confirmations and travel updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Personalize your experience and show relevant travel recommendations</li>
              <li>Send promotional offers (only with your consent)</li>
              <li>Improve our platform and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-3">
              <li><strong>Service providers:</strong> Hotels, airlines, and tour operators need your name and contact details to fulfill your booking</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-3">
              <li>All passwords are hashed using bcrypt with 12 rounds — we cannot see your password</li>
              <li>We store only the last 4 digits of your payment card — never the full number</li>
              <li>All data transmission is encrypted via HTTPS/TLS</li>
              <li>JWT tokens are used for secure session management</li>
              <li>Regular security audits are performed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to maintain your session and preferences. We use analytics cookies (with your consent) to understand how users interact with our platform. You can disable cookies in your browser settings, though some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Update your information via your profile dashboard</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide services. Booking records are retained for 7 years as required by Indian tax regulations. You may request deletion of your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              TRAVELIX is not intended for children under 18. We do not knowingly collect personal information from children. If we discover that a child under 18 has provided us with personal information, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions, contact our Data Protection Officer:
            </p>
            <div className="mt-3 p-4 bg-muted/40 rounded-xl border border-border/60">
              <p className="font-semibold">TRAVELIX Privacy Team</p>
              <p className="text-muted-foreground text-sm mt-1">Email: privacy@travelix.com</p>
              <p className="text-muted-foreground text-sm">Address: Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
