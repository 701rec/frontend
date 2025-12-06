"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Check,
  X,
  ArrowRight,
  Scale,
  Plus,
  AlertTriangle,
  Loader2,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUniversityModal } from "@/components/AddUniversityModal";
// 💡 ИСПОЛЬЗУЕМ ИМПОРТЫ ИЗ ОТДЕЛЬНОГО ФАЙЛА API
import {
  University,
  getUniversityById,
  getUniversities,
} from "@/lib/university-api"; // 👈 Предполагаемый файл для API-функций

// --- LOCALSTORAGE ЛОГИКА (ОСТАВЛЕНА БЕЗ ИЗМЕНЕНИЙ) ---
const STORAGE_KEY = "comparison_university_ids";

function loadIdsFromLocalStorage(): number[] {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const ids = JSON.parse(storedData);
        return Array.isArray(ids) ? ids.map(Number) : [];
      } catch (e) {
        console.error("Error parsing stored university IDs:", e);
        return [];
      }
    }
  }
  return [];
}

function saveIdsToLocalStorage(ids: number[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

// --- ОСНОВНОЙ КОМПОНЕНТ ---

export default function ComparePage() {
  const [selectedUnis, setSelectedUnis] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Загрузка данных из API на основе ID из LocalStorage
  useEffect(() => {
    const initialIds = loadIdsFromLocalStorage();

    const fetchSavedUniversities = async (ids: number[]) => {
      setIsLoading(true);
      if (ids.length === 0) {
        setSelectedUnis([]);
        setIsLoading(false);
        setError("Для сравнения необходимо выбрать минимум 2 ВУЗа.");
        return;
      }

      // Использование импортированной getUniversityById
      const fetchPromises = ids.map((id) => getUniversityById(id.toString()));
      const results = await Promise.all(fetchPromises);

      const loadedUnis = results.filter(
        (uni): uni is University => uni !== null
      );

      loadedUnis.sort((a, b) => a.id - b.id);

      setSelectedUnis(loadedUnis);
      setIsLoading(false);

      if (loadedUnis.length < 2) {
        setError("Для сравнения необходимо выбрать минимум 2 ВУЗа.");
      } else {
        setError(null);
      }
    };

    fetchSavedUniversities(initialIds);
  }, []);

  // 2. Сохранение ID в LocalStorage при изменении selectedUnis
  useEffect(() => {
    if (!isLoading) {
      const currentIds = selectedUnis.map((uni) => uni.id);
      saveIdsToLocalStorage(currentIds);
    }
  }, [selectedUnis, isLoading]);

  // Удаление ВУЗа
  const removeUni = useCallback((id: number) => {
    setSelectedUnis((currentUnis) => {
      const newUnis = currentUnis.filter((u) => u.id !== id);
      // Логика проверки количества оставлена без изменений
      if (newUnis.length < 2 && currentUnis.length >= 2) {
        setError("Для сравнения необходимо выбрать минимум 2 ВУЗа.");
        return currentUnis; // Предотвращаем удаление
      }
      setError(null);
      return newUnis;
    });
  }, []);

  // ФУНКЦИЯ ДОБАВЛЕНИЯ ВУЗА ИЗ МОДАЛКИ
  const handleAddUni = useCallback((uni: University) => {
    setSelectedUnis((currentUnis) => {
      if (currentUnis.length >= 3) {
        setError("Максимальное количество ВУЗов для сравнения — 3.");
        return currentUnis;
      }

      if (currentUnis.some((u) => u.id === uni.id)) {
        return currentUnis;
      }

      const newUnis = [...currentUnis, uni];
      newUnis.sort((a, b) => a.id - b.id);

      setError(null);
      return newUnis;
    });
  }, []);

  // ... (Логика отображения колонок)
  const numberOfColumns = 3;
  const currentCount = selectedUnis.length;
  const emptyColumnsCount =
    currentCount < numberOfColumns ? numberOfColumns - currentCount : 0;
  const emptyColumns = Array(emptyColumnsCount).fill(null);
  const comparisonList = [...selectedUnis, ...emptyColumns];

  // Массив критериев для рендеринга строк
  const criteria = [
    { key: "price", label: "Стоимость (год)", isBoolean: false },
    { key: "rating", label: "Рейтинг студентов", isBoolean: false },
    { key: "military", label: "Военная кафедра", isBoolean: true },
    { key: "dorm", label: "Общежитие", isBoolean: true },
    { key: "focus", label: "Профиль", isBoolean: false },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 mr-2 animate-spin text-universe-purple" />
        <p className="text-xl text-muted-foreground">
          Загрузка данных для сравнения...
        </p>
      </div>
    );
  }

  // --- РЕНДЕРИНГ ---
  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      {/* Модальное окно */}
      <AddUniversityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUni={handleAddUni}
        selectedUnis={selectedUnis}
        // Передаем импортированную функцию API в пропс
        fetchUniversities={getUniversities}
      />

      {/* ... Остальная часть UI осталась без изменений ... */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 bg-universe-purple/10 rounded-lg">
              <Scale className="h-8 w-8 text-universe-purple" />
            </div>
            Сравнение ВУЗов 🏛️
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Анализ условий, цен и рейтингов в единой таблице
          </p>
        </div>
        <Button
          variant="outline"
          className="border-dashed border-2 border-muted-foreground/30 hover:border-universe-purple hover:text-universe-purple h-12 px-6 disabled:opacity-50"
          onClick={() => setIsModalOpen(true)}
          disabled={selectedUnis.length >= 3}
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить ВУЗ
        </Button>
      </div>

      {/* Сообщение об ошибке/предупреждении */}
      {error && (
        <Card className="mb-6 border-red-500 bg-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 mr-2" /> Внимание
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Индикаторы пустого списка */}
      {selectedUnis.length === 0 && (
        <Card className="mb-6 border-amber-500 bg-amber-500/10">
          <CardContent className="p-4 flex items-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5 mr-3" />
            <p className="text-sm font-medium">
              Для начала сравнения выберите минимум 2 ВУЗа.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedUnis.length === 1 && (
        <Card className="mb-6 border-amber-500 bg-amber-500/10">
          <CardContent className="p-4 flex items-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5 mr-3" />
            <p className="text-sm font-medium">
              Выберите еще как минимум 1 ВУЗ для полноценного сравнения.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur shadow-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="hover:bg-transparent border-b border-border/50">
                <TableHead className="w-[200px] font-bold text-lg text-foreground pl-6">
                  Критерии
                </TableHead>
                {comparisonList.map((uni, index) => (
                  <TableHead
                    key={uni?.id || `empty-${index}`}
                    className="text-center min-w-[220px] pb-6 pt-8"
                  >
                    {uni ? (
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
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 text-xs transition-colors disabled:opacity-50"
                          onClick={() => uni.id && removeUni(uni.id)}
                          disabled={selectedUnis.length <= 2}
                        >
                          Убрать
                        </Button>
                      </div>
                    ) : (
                      // Пустой столбец
                      <div className="flex flex-col items-center gap-3 text-muted-foreground/50">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl border border-dashed border-muted-foreground/30">
                          ?
                        </div>
                        <span className="text-lg font-bold">Пустой слот</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs transition-colors border-dashed"
                          onClick={() => setIsModalOpen(true)}
                          disabled={selectedUnis.length >= 3}
                        >
                          <Plus className="mr-1 h-3 w-3" /> Добавить
                        </Button>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => (
                <TableRow
                  key={criterion.key}
                  className="hover:bg-secondary/10 border-b border-border/40"
                >
                  <TableCell className="font-medium text-muted-foreground pl-6 py-6">
                    {criterion.label}
                  </TableCell>
                  {comparisonList.map((uni, index) => (
                    <TableCell
                      key={uni?.id || `data-empty-${criterion.key}-${index}`}
                      className="text-center"
                    >
                      {uni ? (
                        renderDataCell(uni, criterion.key as keyof University)
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Ряд с кнопкой "Подать заявку" */}
              <TableRow className="hover:bg-transparent">
                <TableCell className="pl-6"></TableCell>
                {comparisonList.map((uni, index) => (
                  <TableCell
                    key={uni?.id || `button-empty-${index}`}
                    className="text-center pb-8 pt-6 px-4"
                  >
                    {uni ? (
                      <Button className="w-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all">
                        Подать заявку <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        disabled
                        className="w-full text-muted-foreground/50"
                      >
                        —
                      </Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// Вспомогательная функция для рендеринга ячейки данных (без изменений)
function renderDataCell(uni: University, key: keyof University) {
  const value = uni[key];

  if (typeof value === "boolean") {
    if (key === "military") {
      return (
        <div className="flex justify-center">
          {value ? (
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="text-green-500 h-5 w-5" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="text-destructive h-5 w-5" />
            </div>
          )}
        </div>
      );
    }
    if (key === "dorm") {
      return (
        <div className="flex justify-center">
          {value ? (
            <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
              <Check className="h-3 w-3" /> Есть места
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">
              Нет информации
            </span>
          )}
        </div>
      );
    }
  }

  if (key === "rating" && typeof value === "number") {
    return (
      <Badge
        variant="secondary"
        className="text-sm bg-secondary/50 text-foreground px-3 py-1"
      >
        ★ {value}/5.0
      </Badge>
    );
  }

  if (key === "price" && typeof value === "string") {
    return <span className="font-bold text-foreground text-xl">{value}</span>;
  }

  if (key === "focus" && typeof value === "string") {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }

  return <span>—</span>;
}
