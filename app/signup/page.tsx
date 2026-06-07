"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex  justify-center py-8 px-6">
      <div className="w-full max-w-xl">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Join the Void</h1>
          <p className="text-muted-foreground mt-2">
            Create an account to start your collection
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/5">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-14 rounded-2xl bg-background border border-border/50 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full h-14 rounded-2xl bg-background border border-border/50 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" /> Create
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-14 rounded-2xl bg-background border border-border/50 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex items-start gap-3 px-2 py-2">
              <div className="h-5 w-5 rounded border border-border/50 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
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

            <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]">
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
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
