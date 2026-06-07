"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success("Welcome back to VoidThread!");
      router.push("/");
    } catch (err: any) {
      toast.error(
        err.message || "Failed to sign in. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Enter your details to access your account
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-muted/20 border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-14 rounded-2xl bg-background border border-border/50 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" /> Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-primary hover:underline underline-offset-4"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 rounded-2xl bg-background border border-border/50 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]"
            >
              {loading ? "Signing In..." : "Sign In"}{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="h-14 rounded-2xl border-2 flex gap-3 font-bold"
            >
              Google
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
