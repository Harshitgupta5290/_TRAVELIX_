"use client";

import { useState } from "react";
import { Star, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      toast.success("Thank you for your feedback!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-4">
            💬 Share Your Experience
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Your Feedback Matters</h1>
          <p className="text-white/60 max-w-md mx-auto">
            Help us improve by sharing your travel experience with TRAVELIX.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-2xl py-14">
        {sent ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border/60 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your feedback has been received. We truly appreciate it.</p>
            <Button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); setRating(0); }} variant="outline" className="mt-6">
              Submit Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/60 shadow-sm p-8 space-y-5">
            <h2 className="text-xl font-heading font-semibold">Tell us about your experience</h2>

            {/* Star rating */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Overall Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hovered || rating)
                          ? "fill-gold-500 text-gold-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground self-center">
                    {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                  </span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Your name *" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email *" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Phone" placeholder="Optional" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input label="Subject" placeholder="e.g. Goa Package Review" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Your message *</label>
              <textarea
                rows={5}
                placeholder="Share your experience, suggestions, or concerns..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
              />
            </div>
            <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Feedback</>}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
