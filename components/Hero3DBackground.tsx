"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Icosahedron,
  Sphere,
  Torus, // Импортируем Торус для создания "тарелки"
} from "@react-three/drei";
import * as THREE from "three";

const colors = {
  purple: "#8B5CF6",
  pink: "#EC4899",
  cyan: "#06b6d4",
};

// --- НОВЫЙ КОМПОНЕНТ "ТАРЕЛКА СО СФЕРОЙ" ---
function SciFiPlate({
  initialPosition,
  primaryColor,
  secondaryColor,
  ...props
}) {
  // Используем ref для всей группы объектов
  const groupRef = useRef();

  const startPos = useMemo(
    () => new THREE.Vector3(...initialPosition),
    [initialPosition]
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      // 1. Вращение всей конструкции
      groupRef.current.rotation.y += delta * 0.2;
      // Немного наклоняем для динамики
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // 2. Следование за мышкой (та же логика)
      const { mouse } = state;
      const moveIntensity = 1.5;

      const targetX = startPos.x + mouse.x * moveIntensity;
      const targetY = startPos.y + mouse.y * moveIntensity;

      // 3. Плавность (Lerp)
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.08
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.08
      );

      // Наклон в сторону движения мыши
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.2,
        0.1
      );
    }
  });

  return (
    // Группируем сферу и диск, чтобы они двигались вместе
    <group ref={groupRef} {...props}>
      {/* --- ЦЕНТРАЛЬНАЯ СФЕРА (ЯДРО) --- */}
      <Sphere args={[0.7, 32, 32]}>
        <MeshDistortMaterial
          color={primaryColor}
          emissive={secondaryColor}
          emissiveIntensity={0.8} // Ядро светится ярче
          roughness={0.1}
          distort={0.3}
          speed={2}
        />
      </Sphere>

      {/* --- ДИСК (ТАРЕЛКА) ВОКРУГ СФЕРЫ --- */}
      {/* Torus args: [радиус кольца, толщина трубки, сегменты, сегменты] */}
      {/* rotation поворорачивает его плашмя, scale сплющивает по Z */}
      <Torus
        args={[1.4, 0.25, 64, 64]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 1, 0.1]}
      >
        <MeshDistortMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.3} // Диск светится слабее
          roughness={0.4} // Диск более матовый, металлический
          metalness={0.8}
          distort={0.4} // Сильнее искажается по краям
          speed={1.5}
        />
      </Torus>
    </group>
  );
}

// Камни/спутники (без изменений)
function FloatingGem({ initialPosition, color, ...props }) {
  const ref = useRef();
  const startPos = useMemo(
    () => new THREE.Vector3(...initialPosition),
    [initialPosition]
  );

  useFrame((state) => {
    if (ref.current) {
      const { mouse } = state;
      const targetX = startPos.x + mouse.x * 0.3;
      const targetY = startPos.y + mouse.y * 0.3;

      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        targetX,
        0.05
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        targetY,
        0.05
      );
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.015;
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} {...props}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        radius={1}
        distort={0.4}
        speed={3}
        roughness={0.1}
        metalness={1}
      />
    </Icosahedron>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-90 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          color={colors.pink}
        />
        <pointLight
          position={[-10, -10, -5]}
          intensity={1.5}
          color={colors.purple}
        />
        <spotLight
          position={[0, -10, 0]}
          intensity={1}
          color={colors.cyan}
          angle={0.5}
        />
        <Environment preset="city" />

        {/* --- ТАРЕЛКА СЛЕВА --- */}
        <Float
          speed={1.5}
          rotationIntensity={0.2} // Уменьшили, чтобы тарелка не сильно кувыркалась
          floatIntensity={1}
        >
          <SciFiPlate
            initialPosition={[-6.5, 0.5, 0]}
            scale={1.4}
            primaryColor={colors.purple}
            secondaryColor={colors.cyan}
          />
        </Float>

        <Float speed={3} floatIntensity={0.5}>
          <FloatingGem
            initialPosition={[-4.5, 2.5, 1]}
            scale={0.3}
            color={colors.pink}
          />
        </Float>

        {/* --- ТАРЕЛКА СПРАВА --- */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
          <SciFiPlate
            initialPosition={[7, -0.5, 0]}
            scale={1.3}
            primaryColor={colors.pink}
            secondaryColor={colors.purple}
            rotation={[0, 0, Math.PI / 6]} // Небольшой начальный наклон
          />
        </Float>

        <Float speed={2.5} floatIntensity={0.8}>
          <FloatingGem
            initialPosition={[5, -3, 1.5]}
            scale={0.4}
            color={colors.cyan}
          />
        </Float>
      </Canvas>
    </div>
  );
}
