import Link from "next/link";
import { ArrowLeft, Maximize2, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

// 🟢 Импортируем готовый Dynamic Client Component
import DynamicPanoViewer from "@/components/DynamicPanoViewer";

// Убедитесь, что Maximize2 импортирован, если он нужен для оверлея
// (в лоадере он уже есть)

const ToursPage: FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          {/* ... Навигация и заголовок ... */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-64 bg-secondary/50 group cursor-pointer overflow-hidden">
              {/* 🟢 ВСТАВЛЯЕМ КОМПОНЕНТ 1 */}
              <DynamicPanoViewer
                image="/images/muit_main_hall_pano.jpg" // 👈 ПУТЬ К ВАШЕЙ ПАНОРАМЕ!
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition pointer-events-none">
                <div className="bg-background/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-border/20 group-hover:scale-110 transition-transform">
                  <Maximize2 className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </div>
            <CardContent className="pt-5 pb-5">
              <h3 className="font-bold text-lg mb-1 text-foreground group-hover:text-universe-cyan transition-colors">
                Главный корпус МУИТ
              </h3>
              <p className="text-muted-foreground text-sm">
                Холл, библиотека и коворкинг зоны
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-64 bg-secondary/50 group cursor-pointer overflow-hidden">
              {/* 🟢 ВСТАВЛЯЕМ КОМПОНЕНТ 2 */}
              <DynamicPanoViewer
                image="/images/kbtu_library_pano.jpg" // 👈 ПУТЬ К ВАШЕЙ ВТОРОЙ ПАНОРАМЕ!
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition pointer-events-none">
                <div className="bg-background/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-border/20 group-hover:scale-110 transition-transform">
                  <Maximize2 className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </div>
            <CardContent className="pt-5 pb-5">
              <h3 className="font-bold text-lg mb-1 text-foreground group-hover:text-universe-purple transition-colors">
                Кампус КБТУ
              </h3>
              <p className="text-muted-foreground text-sm">
                Историческое здание, Большой зал
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
