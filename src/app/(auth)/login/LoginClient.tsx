"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
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
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your TRAVELIX account to continue exploring.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Email address" type="email" placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} autoComplete="email" />
        <div>
          <Input label="Password" type={showPassword ? "text" : "password"} placeholder="Enter your password" icon={<Lock className="w-4 h-4" />}
            iconRight={<button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-foreground transition-colors">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} autoComplete="current-password" />
          <div className="flex justify-end mt-1.5">
            <Link href="/forgot-password" className="text-xs text-brand-500 hover:text-brand-600 font-medium">Forgot password?</Link>
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
        </Button>
      </form>
      <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          <span className="font-semibold">Demo admin:</span> admin@travelix.com / admin123
        </p>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-500 font-semibold hover:text-brand-600">Create one free</Link>
      </p>
    </motion.div>
  );
}
