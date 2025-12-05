import Link from "next/link";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ToursPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/"
            className="text-blue-600 hover:underline flex items-center gap-2 mb-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> На главную
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Виртуальные 3D-туры
          </h1>
        </div>
        <Button variant="outline">Показать на карте</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="relative h-64 bg-slate-200 group cursor-pointer">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1sCAoSLEFGMVFpcE5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5wbW5!2m2!1d43.235!2d76.909!3f240!4f10!5f0.7820865974627469"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none group-hover:pointer-events-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition pointer-events-none">
              <div className="bg-white/90 p-3 rounded-full shadow-lg">
                <Maximize2 className="h-6 w-6 text-slate-900" />
              </div>
            </div>
          </div>
          <CardContent className="pt-4">
            <h3 className="font-bold text-lg mb-1">Главный корпус МУИТ</h3>
            <p className="text-slate-500 text-sm">
              Холл, библиотека и коворкинг зоны
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-64 bg-slate-200 group cursor-pointer">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-white">
              <p>Загрузка панорамы...</p>
            </div>
          </div>
          <CardContent className="pt-4">
            <h3 className="font-bold text-lg mb-1">Кампус КБТУ</h3>
            <p className="text-slate-500 text-sm">
              Историческое здание, Большой зал
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
