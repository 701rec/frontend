import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ToursPageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* --- Header Skeleton --- */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Кнопка "На главную" */}
          <Skeleton className="h-5 w-24" />

          <div className="flex items-center gap-3">
            {/* Иконка очков */}
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-2">
              {/* Заголовок H1 */}
              <Skeleton className="h-10 w-64 md:w-96" />
              {/* Подзаголовок */}
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>

        {/* --- Grid Skeleton --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Генерируем 4 карточки-заглушки */}
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="overflow-hidden border-border/50 bg-card/50 backdrop-blur shadow-lg"
            >
              {/* Область панорамы (Картинка) */}
              <div className="h-72 md:h-80 w-full relative">
                <Skeleton className="h-full w-full rounded-none" />
                {/* Имитация бейджика справа сверху */}
                <Skeleton className="absolute top-4 right-4 h-6 w-16 rounded bg-background/50" />
              </div>

              {/* Контент карточки */}
              <CardContent className="pt-6 pb-6 px-6 space-y-4">
                {/* Заголовок тура */}
                <Skeleton className="h-7 w-3/4" />

                {/* Описание (2 строки) */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Кнопка внизу */}
                <Skeleton className="h-10 w-full mt-2 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
