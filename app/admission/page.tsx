"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle,
  Calculator,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function AdmissionPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-universe-purple transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-universe-purple/10 text-universe-purple text-sm font-medium border border-universe-purple/20">
          <Sparkles className="h-4 w-4" />
          Приемная кампания 2025
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Поступление <span className="text-universe-purple">2025</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Единый навигатор абитуриента: сроки, документы и гранты.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-universe-cyan/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-universe-cyan">
              <div className="p-2 bg-universe-cyan/10 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              Летнее ЕНТ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-2 text-foreground">
              15 Мая - 5 Июля
            </p>
            <p className="text-sm text-muted-foreground">
              Основной поток для участия в конкурсе грантов.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-universe-purple/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-universe-purple">
              <div className="p-2 bg-universe-purple/10 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              Прием документов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-2 text-foreground">
              13 - 20 Июля
            </p>
            <p className="text-sm text-muted-foreground">
              Подача заявок на присуждение образовательных грантов.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-universe-pink/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-universe-pink">
              <div className="p-2 bg-universe-pink/10 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
              Зачисление
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-2 text-foreground">
              до 25 Августа
            </p>
            <p className="text-sm text-muted-foreground">
              Издание приказов о зачислении в вузы.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Частые вопросы (FAQ)
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-purple text-left text-foreground">
                Какой проходной балл на IT специальности?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                В национальные вузы проходной балл — не менее 65, в другие — не
                менее 50. Для гранта в Алматы (IITU, KBTU, Satbayev) обычно
                требуется{" "}
                <span className="text-universe-purple font-bold">
                  100+ баллов
                </span>
                .
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-purple text-left text-foreground">
                Какие предметы сдавать на ЕНТ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Для IT и инженерии комбинация:{" "}
                <span className="text-foreground font-medium">
                  Математика + Физика
                </span>{" "}
                (или Информатика).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-purple text-left text-foreground">
                Что такое "Сельская квота"?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Это преимущественное право (70% грантов) для выпускников
                сельских школ. Она применяется только при равенстве баллов с
                городскими абитуриентами.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Card className="h-fit shadow-lg border-universe-purple/20 bg-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-universe-purple/20 blur-3xl -z-10 rounded-full"></div>

          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calculator className="h-5 w-5 text-universe-purple" />
              Шанс на грант
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Твой балл ЕНТ:
              </label>
              <Input
                type="number"
                placeholder="Например: 110"
                className="bg-background border-border focus:ring-universe-purple"
              />
            </div>
            <Button className="w-full bg-universe-purple hover:bg-universe-purple/90 text-white font-medium shadow-lg shadow-universe-purple/20">
              <Sparkles className="mr-2 h-4 w-4" />
              Рассчитать
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              *Прогноз основан на статистике 2024 года
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
