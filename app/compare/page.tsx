"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Scale, Plus } from "lucide-react";
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
    id: 3,
    name: "AUPET (АУЭС)",
    logo: "AU",
    color: "text-universe-pink bg-universe-pink/10 border-universe-pink/20",
    price: "950 000 ₸",
    rating: 4.5,
    military: true,
    dorm: false,
    focus: "Energy & Telecom",
  }
];

export default function ComparePage() {
  const [selectedUnis, setSelectedUnis] = useState(universitiesData);

  const removeUni = (id: number) => {
    setSelectedUnis(selectedUnis.filter((u) => u.id !== id));
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 bg-universe-purple/10 rounded-lg">
              <Scale className="h-8 w-8 text-universe-purple" />
            </div>
            Сравнение ВУЗов
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Анализ условий, цен и рейтингов в единой таблице
          </p>
        </div>
        <Button
          variant="outline"
          className="border-dashed border-2 border-muted-foreground/30 hover:border-universe-purple hover:text-universe-purple h-12 px-6"
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить ВУЗ
        </Button>
      </div>

      {selectedUnis.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center h-80 text-muted-foreground">
            <Scale className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Список сравнения пуст</p>
            <p className="text-sm mb-6">
              Добавьте университеты из каталога, чтобы увидеть разницу
            </p>
            <Button className="bg-universe-purple hover:bg-universe-purple/90 text-white">
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur shadow-xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent border-b border-border/50">
                  <TableHead className="w-[200px] font-bold text-lg text-foreground pl-6">
                    Критерии
                  </TableHead>
                  {selectedUnis.map((uni) => (
                    <TableHead
                      key={uni.id}
                      className="text-center min-w-[220px] pb-6 pt-8"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl border shadow-sm backdrop-blur-md ${uni.color}`}
                        >
                          {uni.logo}
                        </div>
                        <span className="text-lg font-bold text-foreground">
                          {uni.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 text-xs transition-colors"
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
                <TableRow className="hover:bg-secondary/10 border-b border-border/40">
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    Стоимость (год)
                  </TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell
                      key={uni.id}
                      className="text-center font-bold text-foreground text-xl"
                    >
                      {uni.price}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow className="hover:bg-secondary/10 border-b border-border/40">
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    Рейтинг студентов
                  </TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell key={uni.id} className="text-center">
                      <Badge
                        variant="secondary"
                        className="text-sm bg-secondary/50 text-foreground px-3 py-1"
                      >
                        ★ {uni.rating}/5.0
                      </Badge>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow className="hover:bg-secondary/10 border-b border-border/40">
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    Военная кафедра
                  </TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell key={uni.id} className="text-center">
                      <div className="flex justify-center">
                        {uni.military ? (
                          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="text-green-500 h-5 w-5" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                            <X className="text-destructive h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow className="hover:bg-secondary/10 border-b border-border/40">
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    Общежитие
                  </TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell key={uni.id} className="text-center">
                      <div className="flex justify-center">
                        {uni.dorm ? (
                          <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
                            <Check className="h-3 w-3" /> Есть места
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Нет информации
                          </span>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow className="hover:bg-secondary/10 border-b border-border/40">
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    Профиль
                  </TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell
                      key={uni.id}
                      className="text-center text-sm font-medium text-foreground"
                    >
                      {uni.focus}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow className="hover:bg-transparent">
                  <TableCell className="pl-6"></TableCell>
                  {selectedUnis.map((uni) => (
                    <TableCell
                      key={uni.id}
                      className="text-center pb-8 pt-6 px-4"
                    >
                      <Button className="w-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all">
                        Подать заявку <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
