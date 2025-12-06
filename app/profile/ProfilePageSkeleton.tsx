import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- ЛЕВАЯ КОЛОНКА (Карточка юзера) --- */}
        <Card className="w-full md:w-80 h-fit border-t-4 border-t-universe-cyan shadow-lg bg-card/80">
          <CardHeader className="text-center pb-2 flex flex-col items-center">
            {/* Аватар */}
            <div className="mb-4 relative">
              <Skeleton className="h-28 w-28 rounded-full" />
              {/* Бейдж статуса */}
              <Skeleton className="absolute bottom-1 right-1 h-6 w-16 rounded-full" />
            </div>
            {/* Имя */}
            <Skeleton className="h-8 w-48 mb-2" />
            {/* Локация */}
            <Skeleton className="h-4 w-32" />
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3">
              {/* Строки информации (Статус, Email, ЕНТ) */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b border-border/50"
                >
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
            {/* Кнопка "Выйти" */}
            <div className="pt-2">
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* --- ПРАВАЯ КОЛОНКА (Контент) --- */}
        <div className="flex-1 space-y-6">
          {/* Заголовок страницы */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Табы (Имитация TabsList) */}
          <div className="bg-secondary/50 p-1 border border-border/50 rounded-xl mb-6 flex gap-1 w-fit">
            <Skeleton className="h-10 w-40 rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>

          {/* Карточка Настроек */}
          <Card className="bg-card/50 border-border/60">
            <CardHeader>
              <Skeleton className="h-7 w-56 mb-2" />
              <Skeleton className="h-4 w-80" />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Секция: Личная информация */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-40" /> {/* Заголовок секции */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Поля ввода (Имя, Фамилия, Город, ЕНТ) */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" /> {/* Label */}
                      <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Секция: Уведомления */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                    >
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-6 w-11 rounded-full" />{" "}
                      {/* Switch */}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end border-t border-border/40 pt-6">
              <Skeleton className="h-10 w-40" /> {/* Кнопка Сохранить */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
