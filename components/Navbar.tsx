"use client";

import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { name: "Каталог", path: "/universities" },
  { name: "Сравнение", path: "/compare" },
  { name: "Гранты", path: "/admission" },
  { name: "Помощь", path: "/help" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-universe-purple/10 text-universe-purple group-hover:bg-universe-purple group-hover:text-white transition-colors duration-300">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Uni<span className="text-universe-purple">Verse</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/40 bg-secondary/50 p-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="rounded-full px-5 py-2 text-base font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground hover:shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link href="/ai">
            <Button
              variant="ghost"
              className="hidden sm:flex gap-2 text-universe-cyan hover:bg-universe-cyan/10 hover:text-universe-cyan font-semibold text-base"
            >
              <Sparkles className="h-5 w-5" />
              AI Chat
            </Button>
          </Link>

          <Link href="/login">
            <Button className="rounded-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all hover:shadow-universe-purple/40 px-6 font-semibold text-base">
              Войти
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
