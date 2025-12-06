import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border/40 h-16 bg-background/80">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-5 w-32" /> {/* Кнопка Назад */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Кнопка Share */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        {/* Main Viewer Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Большой блок плеера */}
          <Card className="min-h-[500px] bg-card/50 border-border/50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 opacity-50">
              <Skeleton className="h-16 w-16 rounded-full" />{" "}
              {/* Иконка загрузки */}
              <Skeleton className="h-4 w-40" />
            </div>
          </Card>

          {/* Thumbnails */}
          <div className="flex gap-2">
            <Skeleton className="w-[120px] h-20 rounded-lg" />
            <Skeleton className="w-[120px] h-20 rounded-lg" />
            <Skeleton className="w-[120px] h-20 rounded-lg" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Card className="h-fit bg-card/50 border-border/50 p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" /> {/* Заголовок */}
              <Skeleton className="h-4 w-1/2" /> {/* Адрес */}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" /> {/* Tabs */}
            </div>

            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="pt-4 space-y-2">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
