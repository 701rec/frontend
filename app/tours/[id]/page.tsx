"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Maximize2,
  MapPin,
  Info,
  RotateCw,
  Share2,
  MousePointer2,
  Video,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "./loading";
import PanoViewer from "@/components/PanoViewer";

// --- МОК-ДАННЫЕ ---
const TOURS_DB: any = {
  iitu: {
    id: "8",
    title: "Главный корпус МУИТ",
    address: "ул. Манаса, 34/1, Алматы",
    description:
      "Виртуальный тур по главному IT-университету. Посетите современные лаборатории, лекционные залы и зоны отдыха.",
    live_video: "/iitu.mp4",
    scenes: [
      {
        id: "round_hall",
        name: "Круглый Зал",
        image:
          "https://raw.githubusercontent.com/aframevr/aframe/master/examples/boilerplate/panorama/puydesancy.jpg",
      },
      {
        id: "library",
        name: "Библиотека",
        image:
          "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/2294472375_24a3b8ef46_o.jpg",
      },
    ],
  },
  kbtu: {
    id: "3",
    title: "Кампус КБТУ",
    address: "ул. Толе би, 59, Алматы",
    description:
      "Здание КБТУ является памятником истории. Уникальная атмосфера, сочетающая классический стиль и технологии.",
    live_video: "/error.mp4",
    scenes: [
      {
        id: "round_hall",
        name: "Круглый Зал",
        image:
          "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/2294472375_24a3b8ef46_o.jpg",
      },
      {
        id: "library",
        name: "Библиотека",
        image:
          "https://raw.githubusercontent.com/aframevr/aframe/master/examples/boilerplate/panorama/puydesancy.jpg",
      },
    ],
  },
};

export default function TourDetailPage() {
  const params = useParams();

  const [tour, setTour] = useState<any>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Состояние для часов на камере
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const tourId = params.id as string;

    setTimeout(() => {
      // ИЗМЕНЕНИЕ ЗДЕСЬ:
      // Пытаемся найти тур по ID, если не находим — берем IITU
      const foundTour = TOURS_DB[tourId] || TOURS_DB["iitu"];

      setTour(foundTour);
      setIsLoading(false);
    }, 800);

    // Тикающие часы для камеры
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [params.id]);

  if (isLoading) return <Loading />;
  // Эта проверка теперь сработает только если даже 'iitu' нет в базе, но мы это предусмотрели
  if (!tour) return <div className="p-10 text-center">Тур не найден</div>;

  const activeScene = tour.scenes[activeSceneIndex];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* --- Header --- */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/tours"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку
          </Link>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-universe-purple text-universe-purple hidden md:flex"
            >
              <MousePointer2 className="mr-1 h-3 w-3" /> Крутите мышкой
            </Badge>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        {/* --- MAIN 3D VIEWER (Left Column) --- */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 overflow-hidden border-border/50 bg-black shadow-2xl relative group min-h-[500px] flex flex-col">
            {/* 3D Сцена */}
            <div className="relative flex-1 bg-black cursor-move">
              <PanoViewer
                key={activeScene.id}
                image={activeScene.image}
                isAutoRotate={isAutoRotate}
              />

              {/* UI поверх 3D сцены */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-10">
                <div className="flex justify-between items-start">
                  <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                    {activeScene.name}
                  </div>
                  <div className="bg-universe-cyan/80 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    <Maximize2 className="h-3 w-3" /> 360° VIEW
                  </div>
                </div>

                <div className="flex justify-center pointer-events-auto">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 text-white">
                    <button
                      className={`hover:text-universe-cyan transition flex items-center gap-2 text-sm ${
                        isAutoRotate ? "text-universe-cyan" : ""
                      }`}
                      onClick={() => setIsAutoRotate(!isAutoRotate)}
                    >
                      <RotateCw
                        className={`h-4 w-4 ${
                          isAutoRotate ? "animate-spin-slow" : ""
                        }`}
                      />
                      {isAutoRotate ? "Вращение: ВКЛ" : "Вращение: ВЫКЛ"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ПРЕВЬЮ СЦЕН */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tour.scenes.map((scene: any, index: number) => (
              <button
                key={scene.id}
                onClick={() => setActiveSceneIndex(index)}
                className={`relative min-w-[120px] h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeSceneIndex === index
                    ? "border-universe-purple opacity-100 ring-2 ring-universe-purple/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={scene.image}
                  alt={scene.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <div className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] py-1 text-center font-medium truncate px-1 z-10">
                  {scene.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* Блок 1: Информация */}
          <Card className="bg-card/50 backdrop-blur border-border/50 h-fit">
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-universe-cyan" />
                  {tour.address}
                </div>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="info">Локации</TabsTrigger>
                  <TabsTrigger value="desc">Описание</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-4 space-y-2">
                  <h3 className="font-semibold text-sm flex items-center mb-3">
                    <Info className="h-4 w-4 mr-2 text-universe-purple" />
                    Доступные комнаты:
                  </h3>
                  <ScrollArea className="h-[200px] pr-4">
                    <ul className="space-y-2">
                      {tour.scenes.map((scene: any, idx: number) => (
                        <li
                          key={scene.id}
                          onClick={() => setActiveSceneIndex(idx)}
                          className={`text-sm p-3 rounded-md cursor-pointer flex justify-between items-center group transition-colors border ${
                            activeSceneIndex === idx
                              ? "bg-universe-purple/10 border-universe-purple/30 text-universe-purple font-medium"
                              : "bg-secondary/30 border-transparent hover:bg-secondary/50 text-muted-foreground"
                          }`}
                        >
                          <span>{scene.name}</span>
                          {activeSceneIndex === idx && (
                            <div className="h-2 w-2 rounded-full bg-universe-purple animate-pulse" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="desc"
                  className="mt-4 text-sm text-muted-foreground leading-relaxed"
                >
                  {tour.description}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Блок 2: LIVE КАМЕРА (НОВЫЙ БЛОК) */}
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden shadow-lg hover:shadow-red-500/10 transition-shadow duration-500">
            <CardHeader className="py-3 px-4 border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Video className="h-4 w-4 text-red-500" />
                Live Cam #1 (Conference room)
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-xs font-mono text-red-500 font-bold">
                  LIVE
                </span>
              </div>
            </CardHeader>
            <div className="relative aspect-video bg-black">
              {/* Видео-плеер (loop, muted, autoplay) */}
              <video
                src={tour.live_video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              />

              {/* Оверлей интерфейса камеры */}
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-white/70 bg-black/40 px-1 rounded">
                    CAM-04
                  </span>
                  <span className="text-[10px] font-mono text-red-500 font-bold flex items-center gap-1">
                    <Radio className="h-3 w-3" /> REC
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs font-mono text-white/90 drop-shadow-md">
                    {currentTime}
                  </div>
                  <div className="text-[10px] font-mono text-white/50">
                    1080p | 30fps
                  </div>
                </div>
              </div>

              {/* Эффект помех/линий (Scanlines) */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
