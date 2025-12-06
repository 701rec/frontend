"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { Maximize2 } from "lucide-react";
// 1. Импортируем пропсы из PanoViewer для правильной типизации
import { PanoViewerProps } from "./PanoViewer";

// Создаем динамический компонент, используя PanoViewerProps для типизации
const PanoViewerComponent = dynamic<PanoViewerProps>(
  () => import("./PanoViewer"),
  {
    ssr: false, // Отключаем рендеринг на стороне сервера
    loading: () => (
      // Компонент загрузки
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2 bg-black/50">
        <div className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center animate-spin">
          <Maximize2 className="h-5 w-5 opacity-50" />
        </div>
        <p className="text-sm font-medium text-white">Загрузка 3D-тура...</p>
      </div>
    ),
  }
);

// Оборачивающий компонент, который передает пропсы
const DynamicPanoViewer: FC<PanoViewerProps> = (props) => {
  return <PanoViewerComponent {...props} />;
};

export default DynamicPanoViewer;
