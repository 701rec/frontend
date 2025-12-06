"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

// Компонент самой сферы с текстурой
function PanoSphere({ image }: { image: string }) {
  // Загружаем текстуру. Suspense будет ждать, пока она загрузится
  const texture = useTexture(image);

  // Переворачиваем текстуру по оси X, чтобы она смотрелась правильно изнутри
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      {/* Сфера радиусом 500, чтобы казалась бесконечным горизонтом */}
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

// Контроллер камеры, чтобы она вращалась "наоборот" (как в панорамах)
function CameraController({ autoRotate }: { autoRotate: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    // Начальная позиция камеры
    camera.position.set(0, 0, 0.1);
  }, [camera]);

  return (
    <OrbitControls
      enableZoom={true} // Разрешить зум (изменение FOV)
      enablePan={false} // Запретить сдвигать камеру (только вращение)
      enableDamping={true} // Плавная инерция
      dampingFactor={0.05}
      autoRotate={autoRotate} // Автовращение
      autoRotateSpeed={0.5} // Скорость автовращения
      rotateSpeed={-0.5} // Инвертируем управление, чтобы тянуть картинку, а не камеру
      maxDistance={100} // Ограничения зума
      minDistance={0}
    />
  );
}

interface PanoViewerProps {
  image: string;
  isAutoRotate: boolean;
}

export default function PanoViewer({ image, isAutoRotate }: PanoViewerProps) {
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas
        camera={{ fov: 75, position: [0, 0, 0.1] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <PanoSphere image={image} />
          <Preload all />
        </Suspense>
        <CameraController autoRotate={isAutoRotate} />
      </Canvas>

      {/* Спиннер загрузки поверх Canvas, пока useTexture грузит картинку */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Suspense
          fallback={<Loader2 className="h-10 w-10 text-white animate-spin" />}
        >
          {/* Пустой компонент, нужен только чтобы Suspense работал внутри Canvas */}
          <span className="hidden">Loaded</span>
        </Suspense>
      </div>
    </div>
  );
}
