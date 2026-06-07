"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const { register, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to create account. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-xl">
        {/* Brand Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Join the Void</h1>
          <p className="text-muted-foreground mt-2">
            Create an account to start your collection
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-muted/20 border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold px-2 flex items-center gap-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold px-2 flex items-center gap-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" /> Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <div className="flex items-start gap-3 px-2 py-1">
              <div className="h-4 w-4 rounded border border-border/50 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms-of-service"
                  className="text-primary font-bold hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
            <ShieldCheck className="h-3 w-3" /> Secure 256-bit SSL Encryption
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
