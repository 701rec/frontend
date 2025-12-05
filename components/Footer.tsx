import Link from "next/link";
import { GraduationCap, Send, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-universe-purple/10 p-2 rounded-lg text-universe-purple group-hover:bg-universe-purple group-hover:text-white transition-colors duration-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Uni<span className="text-universe-purple">Verse</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Единая экосистема для абитуриентов Казахстана. Анализируй,
              сравнивай и поступай с помощью AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Платформа</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/universities"
                  className="hover:text-universe-purple transition-colors"
                >
                  Каталог ВУЗов
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="hover:text-universe-purple transition-colors"
                >
                  Сравнение программ
                </Link>
              </li>
              <li>
                <Link
                  href="/ai"
                  className="flex items-center gap-2 hover:text-universe-pink transition-colors"
                >
                  AI Ментор{" "}
                  <span className="text-[10px] bg-universe-pink/10 text-universe-pink px-1.5 py-0.5 rounded border border-universe-pink/20">
                    NEW
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Абитуриенту</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/admission"
                  className="hover:text-universe-purple transition-colors"
                >
                  Гранты 2025
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-universe-purple transition-colors"
                >
                  Калькулятор ЕНТ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-universe-purple transition-colors"
                >
                  Помощь и FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Контакты</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Алматы, ул. Манаса 34 (IITU)</p>
              <a
                href="mailto:support@universe.kz"
                className="block hover:text-universe-purple transition-colors"
              >
                support@universe.kz
              </a>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-border/50 hover:border-universe-purple/50 hover:text-universe-purple hover:bg-universe-purple/10"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-border/50 hover:border-universe-pink/50 hover:text-universe-pink hover:bg-universe-pink/10"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-border/50 hover:border-universe-cyan/50 hover:text-universe-cyan hover:bg-universe-cyan/10"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            © 2025{" "}
            <span className="text-universe-purple font-medium">
              Team 701rec.
            </span>{" "}
            Developed for IT Fest.
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
