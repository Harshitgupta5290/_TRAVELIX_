"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) {
        toast.error(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error);
      } else {
        toast.success("Welcome back! 🎉");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: "admin" | "user") => {
    if (role === "admin") setForm({ email: "admin@travelix.com", password: "admin123" });
    else setForm({ email: "priya@example.com", password: "user123" });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3 h-3" /> Welcome back
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Sign in to TRAVELIX</h1>
        <p className="text-muted-foreground text-sm">Your next adventure is just a sign-in away.</p>
      </div>

      {/* Demo quick-fill */}
      <div className="mb-6 p-4 rounded-2xl bg-muted/50 border border-border/60">
        <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Quick demo access
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className="flex-1 py-2 px-3 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors"
          >
            Admin Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemo("user")}
            className="flex-1 py-2 px-3 rounded-xl bg-background border border-border text-xs font-semibold hover:bg-muted transition-colors"
          >
            User Demo
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={<Lock className="w-4 h-4" />}
            iconRight={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            autoComplete="current-password"
          />
          <div className="flex justify-end mt-1.5">
            <Link href="/forgot-password" className="text-xs text-brand-500 hover:text-brand-600 font-medium transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Signing in...</>
            : <>Sign in <ArrowRight className="w-4 h-4 ml-1" /></>
          }
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">
          Create one free →
        </Link>
      </p>
    </motion.div>
  );
}
