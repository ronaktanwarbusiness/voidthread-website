"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname === "/cart" || pathname === "/checkout") {
    return null;
  }

  return <Footer />;
}
