"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// Импорт CSS обязателен!
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

interface UniversityMapProps {
  name: string;
  coords: [number, number];
}

export default function UniversityMap({ name, coords }: UniversityMapProps) {
  // Фикс для иконок Leaflet в Next.js
  // Делаем это внутри useEffect, чтобы код выполнялся только на клиенте
  useEffect(() => {
    // Удаляем старые дефолтные иконки (если они сломаны)
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  if (!coords) return null;

  return (
    // Важно: задаем явную высоту и ширину контейнеру
    <div className="w-full h-full min-h-[300px] z-0">
      <MapContainer
        center={coords}
        zoom={15}
        scrollWheelZoom={false}
        // MapContainer должен занимать 100% родителя
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
