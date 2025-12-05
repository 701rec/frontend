"use client"; // 👈 ГЛАВНОЕ ИСПРАВЛЕНИЕ: Это делает компонент клиентским!

import dynamic from "next/dynamic";
import { FC } from "react";
import { Maximize2 } from "lucide-react";

// Тип пропсов, которые будет принимать компонент
interface DynamicPanoViewerProps {
  image: string;
}

// Динамический импорт PanoViewer (с отключенным SSR)
// Это разрешено, потому что мы находимся внутри Client Component
const PanoViewerComponent = dynamic<DynamicPanoViewerProps>(
  () => import("./PanoViewer"), // Путь к компоненту из Шага 2
  {
    ssr: false, // Отключаем рендеринг Pannellum на сервере
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
        <div className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center animate-spin">
          <Maximize2 className="h-5 w-5 opacity-50" />
        </div>
        <p className="text-sm font-medium">Загрузка 3D-тура...</p>
      </div>
    ),
  }
);

const DynamicPanoViewer: FC<DynamicPanoViewerProps> = (props) => {
  return <PanoViewerComponent {...props} />;
};

export default DynamicPanoViewer;
