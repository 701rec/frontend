"use client";

import { Suspense, FC } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

// --- КОМПОНЕНТЫ THREE.JS ---

// Компонент самой сферы с текстурой
function PanoSphere({ image }: { image: string }) {
  // Загружаем текстуру. Suspense будет ждать, пока она загрузится
  const texture = useTexture(image);

  // Настройка текстуры для правильной проекции и цвета
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      {/* Сфера радиусом 500 для создания бесконечного горизонта */}
      <sphereGeometry args={[500, 60, 40]} />
      {/* Рисуем текстуру на ВНУТРЕННЕЙ стороне сферы */}
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

// Контроллер камеры, который обеспечивает вращение как в панорамах
function CameraController({ autoRotate }: { autoRotate: boolean }) {
  return (
    <OrbitControls
      enableZoom={true}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={autoRotate} // Включаем/отключаем автовращение
      autoRotateSpeed={0.5}
      rotateSpeed={-0.5} // Инвертируем управление для эффекта "перетаскивания картинки"
      maxDistance={100}
      minDistance={0}
    />
  );
}

// --- ИНТЕРФЕЙС И ОСНОВНОЙ КОМПОНЕНТ ---

// 2. Экспортируем пропсы, чтобы их мог импортировать DynamicPanoViewer.tsx
export interface PanoViewerProps {
  image: string;
  isAutoRotate: boolean;
}

const PanoViewer: FC<PanoViewerProps> = ({ image, isAutoRotate }) => {
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas
        // Устанавливаем начальную позицию и FOV камеры
        camera={{ fov: 75, position: [0, 0, 0.1] }}
        gl={{ antialias: true }}
        // Спиннер загрузки, пока Three.js инициализируется и ждет Suspense
        fallback={<Loader2 className="h-10 w-10 text-white animate-spin" />}
      >
        {/* Suspense для ожидания загрузки текстуры */}
        <Suspense fallback={null}>
          <PanoSphere image={image} />
          <Preload all />
        </Suspense>
        <CameraController autoRotate={isAutoRotate} />
      </Canvas>
    </div>
  );
};

export default PanoViewer;
