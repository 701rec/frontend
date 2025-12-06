"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Динамический импорт с отключением SSR
const UniversityMap = dynamic(() => import("./UniversityMap"), {
  ssr: false, // ЭТО САМАЯ ВАЖНАЯ СТРОЧКА
  loading: () => (
    <div className="h-full w-full bg-secondary/30 animate-pulse flex items-center justify-center text-muted-foreground text-sm flex-col gap-2 min-h-[300px]">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Загрузка карты...</span>
    </div>
  ),
});

interface MapWrapperProps {
  name: string;
  coords: [number, number];
}

export default function MapWrapper(props: MapWrapperProps) {
  return <UniversityMap {...props} />;
}
