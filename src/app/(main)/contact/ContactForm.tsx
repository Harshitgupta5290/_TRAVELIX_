"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
      toast.success("Message sent! We'll reply within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Failed to send message");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
            💬 Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Have a question or need help planning your perfect trip? We&apos;re here for you.
          </p>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-heading font-bold">How can we help?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our team of travel experts is available 24/7 to help you plan your perfect
                trip, resolve any issues, or answer any questions.
              </p>
              {[
                { icon: Phone, title: "Call Us", info: "+91 98765 43210", sub: "Mon-Sun, 8am-10pm IST", color: "from-brand-500 to-brand-600" },
                { icon: Mail, title: "Email Us", info: "hello@travelix.com", sub: "Response within 24 hours", color: "from-ocean-500 to-ocean-600" },
                { icon: MapPin, title: "Visit Us", info: "Mumbai, Maharashtra", sub: "India 400001", color: "from-green-500 to-green-600" },
                { icon: Clock, title: "Support Hours", info: "24/7 Available", sub: "Round the clock support", color: "from-purple-500 to-purple-600" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm">{item.info}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border/60 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <MessageSquare className="w-9 h-9 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">Message Received!</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSent(false)} variant="outline" className="mt-6">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/60 shadow-sm p-8 space-y-5">
                  <h3 className="text-xl font-heading font-semibold">Send us a message</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Your name *" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <Input label="Email address *" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Phone number" placeholder="Optional" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <Input label="Subject *" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Message *</label>
                    <textarea
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
