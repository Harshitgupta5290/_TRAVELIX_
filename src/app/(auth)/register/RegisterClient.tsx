"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight,
  Loader2, CheckCircle2, Sparkles, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const BENEFITS = [
  "Instant booking confirmation",
  "Exclusive member-only deals",
  "24/7 priority support",
  "Free cancellation on select trips",
];

export function RegisterClient() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordStrength = (p: string) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500", "bg-green-600"][strength];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = "10-digit number only";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Registration failed"); return; }
      const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      if (result?.ok) {
        toast.success("Welcome to TRAVELIX! 🎉");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3 h-3" /> Free forever
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Create your account</h1>
        <p className="text-muted-foreground text-sm">Join 10,000+ travelers exploring the world with TRAVELIX.</p>
      </div>

      {/* Benefits */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        {BENEFITS.map((b) => (
          <div key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
            {b}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Your full name"
          icon={<User className="w-4 h-4" />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="10-digit mobile number"
          icon={<Phone className="w-4 h-4" />}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
          maxLength={10}
        />
        <div>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 6 characters"
            icon={<Lock className="w-4 h-4" />}
            iconRight={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-foreground transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-muted"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{strengthLabel}</p>
            </div>
          )}
        </div>
        <Input
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          icon={<Lock className="w-4 h-4" />}
          iconRight={
            form.confirmPassword && form.password === form.confirmPassword
              ? <CheckCircle2 className="w-4 h-4 text-green-500" />
              : <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="hover:text-foreground transition-colors" tabIndex={-1}>
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
          }
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />
        <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating account...</>
            : <>Create Free Account <ArrowRight className="w-4 h-4 ml-1" /></>
          }
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-4">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-brand-500 hover:underline">Terms</Link> and{" "}
        <Link href="/privacy" className="text-brand-500 hover:underline">Privacy Policy</Link>.
      </p>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">
          Sign in →
        </Link>
      </p>
    </motion.div>
  );
}
