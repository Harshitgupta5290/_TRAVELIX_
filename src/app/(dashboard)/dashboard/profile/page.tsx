"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeft, User, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", gender: "", dob: "",
    city: "", state: "", country: "", address: "", pinCode: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        if (data.user) {
          const u = data.user;
          setForm({
            name: u.name ?? "",
            phone: u.phone ?? "",
            gender: u.gender ?? "",
            dob: u.dob ?? "",
            city: u.city ?? "",
            state: u.state ?? "",
            country: u.country ?? "",
            address: u.address ?? "",
            pinCode: u.pinCode ?? "",
          });
        }
      } catch { } finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to update profile");
    } finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="container-custom py-10 max-w-2xl flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="container-custom py-10 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold">Edit Profile</h1>
          <p className="text-muted-foreground text-sm">Update your personal information</p>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border/60 shadow-sm mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold">
          {form.name?.[0]?.toUpperCase() ?? <User className="w-7 h-7" />}
        </div>
        <div>
          <p className="font-semibold">{form.name || "Your Name"}</p>
          <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-lg border-b border-border/60 pb-3">Personal Information</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
          <Input label="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" maxLength={10} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">Gender</label>
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all">
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Input label="Date of birth" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
        </div>

        <div>
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" />
          <Input label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" />
          <Input label="PIN Code" value={form.pinCode} onChange={(e) => setForm({ ...form, pinCode: e.target.value })} placeholder="PIN code" maxLength={6} />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
