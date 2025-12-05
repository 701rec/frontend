import Link from "next/link";
import { ArrowLeft, Globe, Plane, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CooperationPage() {
  const partners = [
    { country: "USA", name: "Boston University", type: "Dual Degree" },
    { country: "South Korea", name: "Inha University", type: "Exchange" },
    { country: "Germany", name: "Hof University", type: "Research" },
    { country: "Malaysia", name: "APU", type: "Double Major" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-600 hover:underline flex items-center gap-2 mb-6 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Международное сотрудничество
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Открой мир возможностей с программами академической мобильности и
            двойного диплома.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partners.map((p, i) => (
              <Card key={i} className="hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      {p.country}
                    </Badge>
                    <Globe className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap className="h-4 w-4" />
                    {p.type} Program
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="w-full md:w-80 bg-blue-600 text-white border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-6 w-6" /> Erasmus+
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-blue-100">
              Открыт прием заявок на осенний семестр 2026 года. Полное покрытие
              расходов на обучение и проживание.
            </p>
            <div className="pt-2">
              <p className="font-bold text-lg mb-1">Дедлайн:</p>
              <p className="text-blue-200">15 Февраля 2026</p>
            </div>
            <Button
              variant="secondary"
              className="w-full font-bold text-blue-700"
            >
              Подать заявку
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
