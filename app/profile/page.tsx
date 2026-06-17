"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { toast } from "sonner";
import { PageHeader } from "@/common/components/page-header";

export default function ProfilePage() {
  const { user, loading, logout, updateProfile, isLoggedIn } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = React.useState(false);

  // React.useEffect(() => {
  //   if (!user) {
  //     router.replace("/login");
  //   }
  // }, [user, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setIsDirty(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Account"
        title="My Profile"
        description="Manage your account details."
      />
      <div className="container mx-auto py-12 px-6">

        {/* Avatar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 border border-border/50 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-primary">
                {(user.first_name?.[0] ?? user.email?.[0] ?? "?").toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Form Card */}
        <div className="bg-muted/20 border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold px-2 flex items-center gap-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
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
                value={user.email ?? ""}
                disabled
                className="w-full h-12 rounded-2xl bg-muted/40 border border-border/50 px-4 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !isDirty}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              <Save className="mr-2 h-5 w-5" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
