import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Calculator,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdmissionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/"
        className="text-blue-600 hover:underline flex items-center gap-2 mb-6 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Поступление 2025
        </h1>
        <p className="text-xl text-slate-600">
          Единый навигатор абитуриента: сроки, документы и гранты.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Calendar className="h-5 w-5" /> Летнее ЕНТ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-1">15 Мая - 5 Июля</p>
            <p className="text-sm text-blue-600">
              Основной поток для участия в конкурсе грантов.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <FileText className="h-5 w-5" /> Прием документов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-1">13 - 20 Июля</p>
            <p className="text-sm text-green-600">
              Подача заявок на присуждение образовательных грантов.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <CheckCircle className="h-5 w-5" /> Зачисление
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl mb-1">до 25 Августа</p>
            <p className="text-sm text-purple-600">
              Издание приказов о зачислении в вузы.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Частые вопросы (FAQ)</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Какой проходной балл на IT специальности?
              </AccordionTrigger>
              <AccordionContent>
                В национальные вузы проходной балл — не менее 65, в другие — не
                менее 50. Для гранта в Алматы обычно требуется 100+ баллов.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Какие предметы сдавать на ЕНТ?
              </AccordionTrigger>
              <AccordionContent>
                Для IT и инженерии: Математика + Физика (или Информатика).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Что такое {'"'}Сельская квота{'"'}?
              </AccordionTrigger>
              <AccordionContent>
                Это преимущественное право (70% грантов) для выпускников
                сельских школ при равенстве баллов.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Card className="h-fit shadow-lg border-2 border-slate-100">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Шанс на грант
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Твой балл ЕНТ:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="0-140"
                  className="flex-1 border rounded px-3 py-2"
                />
              </div>
            </div>
            <Button className="w-full bg-slate-900">
              Рассчитать вероятность
            </Button>
            <p className="text-xs text-slate-400 text-center">
              *Прогноз основан на данных 2024 года
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
