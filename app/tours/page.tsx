"use client";

import { Maximize2, ArrowLeft, Glasses } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

// 1. Имитация компонента просмотрщика панорам
// В будущем замените <img> на реальную библиотеку (например, react-photo-sphere-viewer)
const DynamicPanoViewer: FC<{ image: string }> = ({ image }) => {
  return (
    <div className="w-full h-full relative group">
      {/* Используем обычный img для теста, чтобы работало с любыми ссылками */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt="360 Panorama Preview"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Эффект виньетки для кинематографичности */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
    </div>
  );
};

// 2. Данные туров (Мок данные)
const toursData = [
  {
    id: "iitu",
    title: "Главный корпус МУИТ",
    description: "Холл, инновационные лаборатории и коворкинг зоны.",
    // Временное фото с Unsplash (современный IT офис/кампус)
    // Когда будут свои фото: замените на "/images/muit_main_hall_pano.jpg"
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
    color: "group-hover:text-universe-cyan",
  },
  {
    id: "kbtu",
    title: "Кампус КБТУ",
    description: "Историческое здание, Большой круглый зал и библиотека.",
    // Временное фото с Unsplash (классическая библиотека)
    // Когда будут свои фото: замените на "/images/kbtu_library_pano.jpg"
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop",
    color: "group-hover:text-universe-purple",
  },
];

const ToursPage: FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Хедер страницы */}
        <div className="flex flex-col gap-6 mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> На главную
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-universe-purple/10 rounded-xl">
              <Glasses className="h-8 w-8 text-universe-purple" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Виртуальные туры
              </h1>
              <p className="text-muted-foreground mt-1">
                Погуляйте по университетам не выходя из дома
              </p>
            </div>
          </div>
        </div>

        {/* Сетка туров */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toursData.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-lg hover:shadow-xl hover:border-universe-purple/30 transition-all duration-300 group"
            >
              {/* Область просмотра (Имитация панорамы) */}
              <div className="relative h-72 md:h-80 bg-secondary/30 cursor-pointer overflow-hidden">
                <DynamicPanoViewer image={tour.image} />

                {/* Кнопка "Развернуть" по центру */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-background/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    <Maximize2 className="h-5 w-5 text-universe-purple" />
                    <span className="font-medium text-sm">Открыть 360°</span>
                  </div>
                </div>

                {/* Бейдж "3D Tour" */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded border border-white/10">
                  3D VIEW
                </div>
              </div>

              {/* Контент карточки */}
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className={`font-bold text-xl text-foreground transition-colors ${tour.color}`}
                  >
                    {tour.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {tour.description}
                </p>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium">
                  Начать экскурсию
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
