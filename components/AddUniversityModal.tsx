// @/components/AddUniversityModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, AlertTriangle, Scale } from "lucide-react";
import { useState, useEffect } from "react";
// Добавляем импорт Skeleton
import { Skeleton } from "@/components/ui/skeleton";
import { University } from "@/lib/university-api";

interface AddUniversityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUni: (uni: University) => void;
  selectedUnis: University[];
  fetchUniversities: () => Promise<University[]>;
}

export function AddUniversityModal({
  isOpen,
  onClose,
  onAddUni,
  selectedUnis,
  fetchUniversities,
}: AddUniversityModalProps) {
  const [availableUnis, setAvailableUnis] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);

      fetchUniversities()
        .then((data) => {
          // Имитация задержки (опционально, чтобы увидеть скелетон)
          // await new Promise(resolve => setTimeout(resolve, 1000));

          const selectedIds = selectedUnis.map((u) => u.id);
          const filteredData = data.filter((u) => !selectedIds.includes(u.id));
          setAvailableUnis(filteredData);
          setLoading(false);
        })
        .catch((e) => {
          console.error("Ошибка загрузки списка ВУЗов:", e);
          setError("Не удалось загрузить список университетов. Проверьте API.");
          setLoading(false);
        });
    }
  }, [isOpen, selectedUnis, fetchUniversities]);

  const isMaxSelected = selectedUnis.length >= 3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Plus className="h-5 w-5 text-universe-purple" /> Выбрать ВУЗ для
            сравнения
          </DialogTitle>
          <DialogDescription>
            {isMaxSelected ? (
              <span className="text-destructive font-medium flex items-center mt-2">
                <AlertTriangle className="h-4 w-4 mr-1" /> Выбрано максимальное
                количество (3 ВУЗа).
              </span>
            ) : (
              "Выберите один университет из списка, чтобы добавить его в таблицу сравнения."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {loading ? (
            // --- ЛОГИКА SKELETON ---
            // Генерируем 4 фейковые карточки пока идет загрузка
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-4 w-full">
                    {/* Скелетон Логотипа */}
                    <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />

                    <div className="space-y-2 w-full max-w-[200px]">
                      {/* Скелетон Названия */}
                      <Skeleton className="h-5 w-3/4" />
                      {/* Скелетон Описания/Фокуса */}
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  {/* Скелетон Кнопки */}
                  <Skeleton className="h-10 w-28 rounded-md flex-shrink-0 ml-4" />
                </CardContent>
              </Card>
            ))
          ) : // -----------------------
          error ? (
            <div className="text-center py-10 text-destructive">
              <AlertTriangle className="h-8 w-8 mx-auto mb-3" />
              <p>{error}</p>
            </div>
          ) : availableUnis.length > 0 ? (
            availableUnis.map((uni) => (
              <Card
                key={uni.id}
                className="hover:shadow-md transition-all border-border/50 group"
              >
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border shadow-sm group-hover:scale-105 transition-transform ${uni.color}`}
                    >
                      {uni.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {uni.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {uni.focus}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      if (!isMaxSelected) {
                        onAddUni(uni);
                      }
                    }}
                    disabled={isMaxSelected}
                    className="bg-universe-purple hover:bg-universe-purple/90"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Добавить
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Scale className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>Все доступные университеты уже выбраны.</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className="absolute top-4 right-4 p-2"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
