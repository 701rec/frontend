"use client";

import Link from "next/link";
import { GraduationCap, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-600"
        >
          <GraduationCap className="h-8 w-8" />
          <span>UniVerse</span>
        </Link>

        <div className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link href="/universities" className="hover:text-blue-600 transition">
            Вузы
          </Link>
          <Link href="/compare" className="hover:text-blue-600 transition">
            Сравнение
          </Link>
          <Link
            href="/ai"
            className="hover:text-blue-600 transition text-purple-600 flex gap-1"
          >
            AI-Помощник ✨
          </Link>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
          <User className="h-4 w-4" />
          <span>Войти как гость</span>
        </button>
      </div>
    </nav>
  );
}
