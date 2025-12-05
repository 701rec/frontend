"use client";

import { usePathname } from "next/navigation";

export default function GridBackground() {
  const pathname = usePathname();

  if (pathname === "/ai") {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-grid-pattern" />
  );
}
