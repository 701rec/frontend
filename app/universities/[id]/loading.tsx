export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-10">
      {/* 1. Hero Section Skeleton */}
      <div className="relative h-64 md:h-96 bg-secondary/30 animate-pulse overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-10">
          {/* Кнопка назад */}
          <div className="h-6 w-32 bg-secondary/60 rounded mb-6" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="w-full md:w-2/3">
              {/* Бейджи */}
              <div className="flex gap-2 mb-3">
                <div className="h-6 w-24 bg-secondary/60 rounded-full" />
                <div className="h-6 w-24 bg-secondary/60 rounded-full" />
              </div>

              {/* Заголовок */}
              <div className="h-10 md:h-14 w-3/4 bg-secondary/60 rounded-lg mb-3" />

              {/* Инфо (Локация, Рейтинг) */}
              <div className="flex gap-4">
                <div className="h-5 w-32 bg-secondary/60 rounded" />
                <div className="h-5 w-24 bg-secondary/60 rounded" />
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-3">
              <div className="h-10 w-40 bg-secondary/60 rounded-lg" />
              <div className="h-10 w-24 bg-secondary/60 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8 -mt-6 relative z-10">
        {/* Табы */}
        <div className="w-full md:w-[600px] h-12 bg-card rounded-xl border border-border/50 mb-8 flex p-1 gap-1">
          <div className="flex-1 bg-secondary/40 rounded-lg animate-pulse" />
          <div className="flex-1 bg-transparent rounded-lg" />
          <div className="flex-1 bg-transparent rounded-lg" />
        </div>

        {/* Контент таба (имитация вкладки "Об университете") */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Левая колонка (Описание и фичи) */}
          <div className="md:col-span-2 space-y-6">
            {/* Карточка описания */}
            <div className="bg-card border border-border/50 rounded-xl p-6 h-[300px] space-y-4">
              <div className="h-7 w-40 bg-secondary/50 rounded mb-4" />{" "}
              {/* Заголовок */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-secondary/30 rounded" />
                <div className="h-4 w-full bg-secondary/30 rounded" />
                <div className="h-4 w-5/6 bg-secondary/30 rounded" />
                <div className="h-4 w-4/6 bg-secondary/30 rounded" />
              </div>
              {/* Блоки фич внутри описания */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-32 bg-secondary/20 rounded-2xl border border-border/30" />
                <div className="h-32 bg-secondary/20 rounded-2xl border border-border/30" />
              </div>
            </div>
          </div>

          {/* Правая колонка (Контакты) */}
          <div className="h-[400px] bg-card border border-border/50 rounded-xl p-6 space-y-6">
            <div className="h-7 w-32 bg-secondary/50 rounded" />

            <div className="space-y-4">
              <div className="h-12 w-full bg-secondary/20 rounded-lg" />
              <div className="h-12 w-full bg-secondary/20 rounded-lg" />
              <div className="aspect-video w-full bg-secondary/30 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
