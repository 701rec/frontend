import React, { useEffect, useRef } from "react";

interface PanoViewerProps {
  image: string;
  width?: string;
  height?: string;
}

const PanoViewer: React.FC<PanoViewerProps> = ({
  image,
  width = "100%",
  height = "100%",
}) => {
  // Типизируем ref для div-контейнера
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPannellum() {
      if (viewerRef.current) {
        // Динамический импорт 'pannellum'. Используем 'any' для обхода отсутствия типов.
        const pannellum: any = await import("pannellum");

        // Инициализация Pannellum в контейнере
        pannellum.viewer(viewerRef.current, {
          type: "equirectangular", // Тип панорамы
          panorama: image, // URL вашего изображения
          autoLoad: true, // Автоматическая загрузка
          hfov: 100, // Горизонтальное поле обзора
        });
      }
    }

    // Загрузка должна происходить только на клиенте
    if (typeof window !== "undefined") {
      loadPannellum();
    }

    // Cleanup-функция для удаления вьювера при размонтировании компонента (необязательно, но полезно)
    return () => {
      // Логика очистки Pannellum, если она нужна
    };
  }, [image]);

  return (
    // Контейнер для встраивания Pannellum
    <div
      ref={viewerRef}
      style={{ width: width, height: height, background: "#000" }}
      className="pannellum-viewer"
    />
  );
};

export default PanoViewer;
