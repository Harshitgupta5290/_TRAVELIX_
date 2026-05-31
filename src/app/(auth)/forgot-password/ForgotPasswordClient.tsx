"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email"); return; }
    setError("");
    setLoading(true);
    // Simulate sending (no email service wired up yet)
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-5 shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Forgot password?</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Enter the email address linked to your account and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                error={error}
                autoComplete="email"
                autoFocus
              />
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending link...</>
                  : <>Send Reset Link <ArrowRight className="w-4 h-4 ml-1" /></>
                }
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-2xl bg-muted/40 border border-border/50 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note:</strong> Email delivery requires an SMTP service to be configured.
              For demo accounts, use the{" "}
              <Link href="/login" className="text-brand-500 hover:underline font-medium">sign in page</Link>{" "}
              quick-fill buttons.
            </div>

            <div className="mt-5 text-center">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-3">Check your inbox</h2>
            <p className="text-muted-foreground text-sm mb-2">
              We&apos;ve sent a password reset link to
            </p>
            <p className="font-semibold text-sm mb-6 text-brand-600">{email}</p>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
              Didn&apos;t receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSent(false)}
                className="text-brand-500 hover:underline font-medium"
              >
                try again
              </button>
              .
            </p>
            <Link href="/login">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
