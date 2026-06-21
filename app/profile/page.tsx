"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, LogOut, Save, Package } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, loading, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated");
      setIsDirty(false);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
          Loading
        </span>
      </div>
    );
  }

  const initial = (user.first_name?.[0] ?? user.email?.[0] ?? "?").toUpperCase();
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="relative pt-10 pb-10 overflow-hidden">
          {/* Ghost initial */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
            style={{
              fontSize: "clamp(12rem, 36vw, 22rem)",
              color: "transparent",
              WebkitTextStroke: "1px",
              opacity: 0.045,
              letterSpacing: "-0.04em",
            }}
          >
            {initial}
          </span>

          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-6 relative">
            VoidThread — Member
          </p>

          <h1
            className="font-black uppercase tracking-[-0.03em] leading-[0.88] relative"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            {fullName || "My Profile"}
          </h1>

          <p className="mt-4 text-muted-foreground text-sm font-medium relative">
            {user.email}
          </p>
        </div>

        {/* ── Divider ──────────────────────────────────────── */}
        <div className="h-px bg-border mb-10" />

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-10 pb-16">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-muted-foreground">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
                className="w-full h-11 bg-transparent border-b border-border focus:border-foreground outline-none text-sm font-medium transition-colors duration-200 placeholder:text-muted-foreground/40"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-muted-foreground">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full h-11 bg-transparent border-b border-border focus:border-foreground outline-none text-sm font-medium transition-colors duration-200 placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-muted-foreground">
              <Mail className="h-3 w-3" /> Email Address
            </label>
            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className="w-full h-11 bg-transparent border-b border-border/30 outline-none text-sm text-muted-foreground/50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-muted-foreground">
              <Phone className="h-3 w-3" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full h-11 bg-transparent border-b border-border focus:border-foreground outline-none text-sm font-medium transition-colors duration-200 placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              disabled={loading || !isDirty}
              className="inline-flex items-center gap-2.5 h-12 px-8 bg-foreground text-background text-[11px] font-bold tracking-[0.15em] uppercase rounded-full hover:opacity-70 transition-opacity duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <Save className="h-3.5 w-3.5" />
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-muted-foreground hover:text-destructive transition-colors duration-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </form>

        {/* ── Divider ──────────────────────────────────────── */}
        <div className="h-px bg-border mb-8" />

        {/* ── Bottom nav ───────────────────────────────────── */}
        <div className="pb-16">
          <Link
            href="/orders"
            className="group inline-flex items-center gap-3 text-sm font-semibold hover:text-primary transition-colors duration-200"
          >
            <Package className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            My Orders
            <span className="text-muted-foreground/50 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
