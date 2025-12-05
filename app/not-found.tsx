import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4 py-12 min-h-[75vh] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-universe-purple/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <h1 className="text-[10rem] md:text-[30rem] font-black text-foreground/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 leading-none">
        404
      </h1>

      <div className="relative z-10 space-y-6 max-w-lg mx-auto backdrop-blur-sm p-8 rounded-3xl border border-border/30 bg-card/20 shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-destructive/10 rounded-full text-destructive animate-pulse">
            <AlertTriangle className="h-10 w-10" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Упс! Страница <span className="text-universe-purple">не найдена</span>
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Кажется, вы забрели в цифровую пустоту. Возможно, этот факультет еще
          не открылся или страницу переместили.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="bg-universe-purple hover:bg-universe-purple/90 text-white gap-2 h-11 px-8 shadow-lg shadow-universe-purple/20 w-full sm:w-auto transition-all hover:scale-105">
              <Home className="h-4 w-4" /> На главную
            </Button>
          </Link>
          <Link href="/universities">
            <Button
              variant="outline"
              className="gap-2 h-11 px-8 w-full sm:w-auto border-universe-purple/30 text-universe-purple hover:bg-universe-purple/10 hover:text-universe-purple transition-all"
            >
              <Search className="h-4 w-4" /> В каталог
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
