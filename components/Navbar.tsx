"use client";

import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Menu,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Каталог", path: "/universities" },
  { name: "Сравнение", path: "/compare" },
  { name: "Гранты", path: "/admission" },
  { name: "Помощь", path: "/help" },
];

export default function Navbar() {
  const { isLogin, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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

          <div className="hidden md:block">
            {isLogin ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold leading-none">
                    Студент
                  </span>
                  <span className="text-xs text-muted-foreground">IITU</span>
                </div>

                {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer hover:opacity-80 transition-opacity ring-2 ring-universe-purple/20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Student"
                      />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Пункт: Профиль */}
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Профиль</span>
                    </DropdownMenuItem>

                    {/* Пункт: Настройки (можно добавить позже) */}
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Настройки</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Пункт: Выйти */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* КОНЕЦ МЕНЮ */}
              </div>
            ) : (
              <Link href="/login">
                <Button className="rounded-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all hover:shadow-universe-purple/40 px-6 font-semibold text-base">
                  Войти
                </Button>
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 pt-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <Link
                      href={link.path}
                      className="text-lg font-medium py-2 px-4 rounded-lg transition-colors hover:bg-muted-foreground/10"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}

                <div className="h-px bg-border my-2" />

                <SheetClose asChild>
                  <Link href="/ai">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-universe-cyan hover:bg-universe-cyan/10 hover:text-universe-cyan font-semibold text-base"
                    >
                      <Sparkles className="h-5 w-5" />
                      AI Chat
                    </Button>
                  </Link>
                </SheetClose>

                {isLogin ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-secondary/30 rounded-xl mt-2 border border-border/50">
                    <Avatar className="h-10 w-10 ring-2 ring-universe-purple/20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Student"
                      />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">Студент IITU</p>
                      <p className="text-xs text-muted-foreground">
                        student@iitu.edu.kz
                      </p>
                    </div>
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Link href="/login">
                      <Button className="w-full rounded-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all hover:shadow-universe-purple/40 px-6 font-semibold text-base">
                        Войти
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
