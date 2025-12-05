"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle,
  Calculator,
  Sparkles,
  Zap,
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

// Импорт функции и типа из TypeScript сервиса
import { calculateGrantChance } from "@/services/grantService";
import { GrantChanceResult } from "@/types/grant";

export default function AdmissionPage() {
  // 1. State для inputs: используем string для Input, Number для логики
  const [untScoreInput, setUntScoreInput] = useState<string>("");
  const [preferredMajor, setPreferredMajor] = useState<string>("");
  // 2. State для результата: используем тип GrantChanceResult или null
  const [calculationResult, setCalculationResult] =
    useState<GrantChanceResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 3. Функция для обработки расчета: Сделана АСИНХРОННОЙ
  const handleCalculate = async () => {
    // Проверка и конвертация балла
    const score = parseInt(untScoreInput, 10);

    // Базовая валидация
    if (
      isNaN(score) ||
      score < 0 ||
      score > 140 ||
      preferredMajor.trim() === ""
    ) {
      alert(
        "Пожалуйста, введите корректный балл ЕНТ (от 0 до 140) и укажите специальность."
      );
      return;
    }

    setIsLoading(true);
    setCalculationResult(null); // Сброс предыдущего результата

    try {
      // Использование await для ожидания результата асинхронной функции
      const result = await calculateGrantChance({ score, preferredMajor });
      setCalculationResult(result);
    } catch (error) {
      console.error("Ошибка при расчете шанса на грант:", error);
      setCalculationResult(null); // Сброс или установка ошибки, если нужно
      alert("Произошла ошибка при расчете. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* ... (Existing Card components) ... */}
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
                Что такое {'"'}Сельская квота{'"'}?
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
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="unt-score"
              >
                Твой балл ЕНТ:
              </label>
              <Input
                id="unt-score"
                type="number"
                placeholder="Например: 110"
                className="bg-background border-border focus:ring-universe-purple"
                value={untScoreInput}
                onChange={(e) => setUntScoreInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="preferred-major"
              >
                Желаемая специальность:
              </label>
              <Input
                id="preferred-major"
                type="text"
                placeholder="Например: Медицина, IT"
                className="bg-background border-border focus:ring-universe-purple"
                value={preferredMajor}
                onChange={(e) => setPreferredMajor(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-universe-purple hover:bg-universe-purple/90 text-white font-medium shadow-lg shadow-universe-purple/20"
              onClick={handleCalculate}
              disabled={isLoading || preferredMajor.trim() === ""}
            >
              {isLoading ? (
                "Расчет..."
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Рассчитать
                </>
              )}
            </Button>

            {/* Отображение результата расчета */}
            {calculationResult && (
              <div
                className={`mt-4 p-4 rounded-lg space-y-2 transition-all duration-500 
                  ${
                    calculationResult.percentage > 50
                      ? "border border-green-500/50 bg-green-500/10"
                      : calculationResult.percentage > 30
                      ? "border border-yellow-500/50 bg-yellow-500/10"
                      : "border border-red-500/50 bg-red-500/10"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Zap
                    className={`h-5 w-5 flex-shrink-0 ${
                      calculationResult.percentage > 50
                        ? "text-green-500"
                        : "text-universe-purple"
                    }`}
                  />
                  <p className="text-sm font-semibold text-foreground">
                    Ваш прогнозируемый шанс:
                  </p>
                </div>
                <p
                  className="text-3xl font-bold"
                  style={{
                    color:
                      calculationResult.percentage > 50 ? "#10B981" : "#8B5CF6",
                  }}
                >
                  {calculationResult.percentage}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {calculationResult.comment}
                </p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              *Прогноз основан на статистике 2024 года
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
