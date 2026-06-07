import Link from "next/link";
import { ChevronRight, ShieldCheck, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                VoidThread
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Redefining the essentials of streetwear with premium, heavyweight
              t-shirts designed for the modern wardrobe.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/collections/new-drops"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  New Drops
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/oversized"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Oversized Essentials
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/graphic"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Graphic Series
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/basics"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Premium Basics
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/shipping-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns-exchanges"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {new Date().getFullYear()} VoidThread. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] tracking-widest uppercase font-medium">
                Secure Payments via
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 group">
                <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold tracking-tight">
                  CASHFREE
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 group">
                <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold tracking-tight">
                  RAZORPAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
