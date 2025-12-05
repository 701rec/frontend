import Link from "next/link";
import { ArrowLeft, Maximize2, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="text-muted-foreground hover:text-universe-purple flex items-center gap-2 mb-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> На главную
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
              Виртуальные <span className="text-universe-cyan">3D-туры</span>
            </h1>
          </div>
          <Button variant="outline" className="gap-2 border-border/60">
            <Map className="h-4 w-4" /> Показать на карте
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-64 bg-secondary/50 group cursor-pointer overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1sCAoSLEFGMVFpcE5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5!2m2!1d43.235!2d76.909!3f240!4f10!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none group-hover:pointer-events-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500"
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
            <div className="relative h-64 bg-secondary/50 group cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
                <div className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <Maximize2 className="h-5 w-5 opacity-50" />
                </div>
                <p className="text-sm font-medium">Загрузка панорамы...</p>
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
}
