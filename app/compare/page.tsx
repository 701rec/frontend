"use client";

import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const universitiesData = [
  {
    id: 1,
    name: "IITU (МУИТ)",
    logo: "IT",
    price: "1 200 000 ₸",
    rating: 4.8,
    military: true,
    dorm: true,
    focus: "IT & Engineering",
  },
  {
    id: 2,
    name: "KBTU (КБТУ)",
    logo: "KB",
    price: "1 800 000 ₸",
    rating: 4.9,
    military: true,
    dorm: true,
    focus: "Oil & Gas, IT",
  },
  {
    id: 3,
    name: "AUPET (АУЭС)",
    logo: "AU",
    price: "950 000 ₸",
    rating: 4.5,
    military: true,
    dorm: false,
    focus: "Energy & Telecom",
  },
];

export default function ComparePage() {
  const [selectedUnis, setSelectedUnis] = useState(universitiesData);

  const removeUni = (id: number) => {
    setSelectedUnis(selectedUnis.filter((u) => u.id !== id));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Сравнение ВУЗов</h1>
          <p className="text-slate-500">Сравните условия, цены и рейтинги</p>
        </div>
        <Button variant="outline">Добавить ВУЗ (+)</Button>
      </div>

      {selectedUnis.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-slate-500">
            <p>Вы не выбрали ни одного университета для сравнения</p>
            <Button className="mt-4" variant="default">
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border-2">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[200px] font-bold">Критерии</TableHead>
                {selectedUnis.map((uni) => (
                  <TableHead key={uni.id} className="text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-2 py-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                        {uni.logo}
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {uni.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 h-6 text-xs hover:bg-red-50"
                        onClick={() => removeUni(uni.id)}
                      >
                        Убрать
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-500">
                  Стоимость (год)
                </TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell
                    key={uni.id}
                    className="text-center font-bold text-slate-800 text-lg"
                  >
                    {uni.price}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-slate-500">
                  Рейтинг студентов
                </TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell key={uni.id} className="text-center">
                    <Badge variant="secondary" className="text-sm">
                      ★ {uni.rating}/5.0
                    </Badge>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-slate-500">
                  Военная кафедра
                </TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell key={uni.id} className="text-center">
                    <div className="flex justify-center">
                      {uni.military ? (
                        <Check className="text-green-500 h-6 w-6" />
                      ) : (
                        <X className="text-red-400 h-6 w-6" />
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-slate-500">
                  Общежитие
                </TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell key={uni.id} className="text-center">
                    <div className="flex justify-center">
                      {uni.dorm ? (
                        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm font-medium">
                          <Check className="h-4 w-4" /> Есть места
                        </div>
                      ) : (
                        <span className="text-slate-400">Нет информации</span>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-slate-500">
                  Профиль
                </TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell
                    key={uni.id}
                    className="text-center text-sm text-slate-600"
                  >
                    {uni.focus}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                {selectedUnis.map((uni) => (
                  <TableCell key={uni.id} className="text-center pb-6">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Подать заявку <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
