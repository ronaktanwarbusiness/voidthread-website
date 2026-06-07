"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  ShoppingBag,
  Heart,
  User,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/auth";

const navItems = [
  {
    title: "New Drops",
    href: "/collections/new-drops",
    description: "Discover our latest releases and limited editions.",
  },
  {
    title: "Collections",
    href: "/collections",
    description: "Browse our curated seasonal collections.",
  },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl py-3 shadow-sm"
          : "bg-background py-5",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              VoidThread
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-muted/50 focus:bg-muted/50 text-foreground/70 hover:text-foreground transition-colors rounded-full px-4",
                      )}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-1 mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full hover:bg-muted/50 text-foreground/70 hover:text-foreground"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 rounded-full hover:bg-muted/50 text-foreground/70 hover:text-foreground"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
                0
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-11 w-11 rounded-full hover:bg-muted/50 text-foreground/70 hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
              0
            </span>
          </Button>

          <div className="hidden md:flex items-center">
            {user ? (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full hover:bg-muted/50 text-foreground/70 hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="h-10 rounded-full px-6 text-sm font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-muted/50 text-foreground transition-colors hover:bg-muted ml-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{ top: scrolled ? "65px" : "76px" }}
      >
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "group flex flex-col gap-1 py-4 border-b border-border/50 transition-all",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground line-clamp-1">
                  {item.description}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "flex flex-col gap-3 mt-auto pb-10 transition-all duration-500",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              "delay-300",
            )}
          >
            <div className="flex flex-col gap-2.5 pt-6">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-sm font-semibold border-2 flex gap-2.5"
              >
                <Search className="h-4 w-4" /> Search Products
              </Button>
              {user ? (
                <div className="flex flex-col gap-2.5 w-full">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl text-sm font-semibold border-2 flex gap-2.5"
                    >
                      My Profile <User className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full h-12 rounded-xl text-sm font-semibold shadow-lg shadow-primary/10 flex gap-2"
                  >
                    Logout ({user.first_name}) <User className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full h-12 rounded-xl text-sm font-semibold shadow-lg shadow-primary/10 flex gap-2">
                    Sign In <User className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
