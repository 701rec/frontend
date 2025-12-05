"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModernUniCard from "@/components/ModernUniCard";

const universities = [
  {
    id: "iitu",
    name: "International IT University",
    short: "IITU (МУИТ)",
    type: "IT & Инжиниринг",
    price: "1.2 млн ₸",
    rating: 4.9,
    loc: "Алматы",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kbtu",
    name: "Kazakh-British Technical Univ",
    short: "KBTU (КБТУ)",
    type: "Технический",
    price: "1.8 млн ₸",
    rating: 4.8,
    loc: "Алматы",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nu",
    name: "Nazarbayev University",
    short: "NU (НУ)",
    type: "Исследовательский",
    price: "Грант",
    rating: 5.0,
    loc: "Астана",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sdu",
    name: "Suleyman Demirel University",
    short: "SDU (СДУ)",
    type: "Гуманитарно-Tech",
    price: "1.4 млн ₸",
    rating: 4.7,
    loc: "Каскелен",
    img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
  },
];

export default function UniversitiesList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden pb-24 pt-16 bg-secondary/10 border-b border-border/40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-universe-purple/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-universe-cyan/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-universe-purple/10 text-universe-purple border border-universe-purple/20 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Каталог 2025
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Найди свой{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-universe-cyan to-universe-purple">
              идеальный
            </span>{" "}
            университет
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Единый каталог всех вузов Казахстана. Сравнивай условия, рейтинги и
            цены в один клик.
          </p>

          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию, специальности или городу..."
                className="pl-12 h-12 rounded-2xl border-border/60 shadow-lg text-base bg-card/60 backdrop-blur-md focus:bg-card focus:border-universe-purple transition-all"
              />
            </div>
            <Button className="h-12 w-12 rounded-2xl bg-universe-purple hover:bg-universe-purple/90 shadow-lg shadow-universe-purple/20">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((u) => (
            <ModernUniCard key={u.id} u={u} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-card/50 backdrop-blur rounded-3xl mt-6 shadow-sm border border-border/50">
            <p className="text-xl text-muted-foreground">
              По запросу {'"'}{searchQuery}{'"'} ничего не найдено.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-universe-purple font-bold mt-2 hover:underline hover:text-universe-pink transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
