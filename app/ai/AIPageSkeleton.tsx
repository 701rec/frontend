import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AIPageSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background overflow-hidden">
      {/* --- Header Skeleton --- */}
      <div className="flex-none bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-center shadow-sm z-10">
        <div className="max-w-3xl w-full flex items-center justify-between mx-auto">
          <div className="flex items-center gap-3">
            {/* Иконка */}
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1.5">
              {/* Название */}
              <Skeleton className="h-4 w-32" />
              {/* Статус "Online" */}
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          {/* Кнопка "Очистить" */}
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      {/* --- Chat Area Skeleton --- */}
      <ScrollArea className="flex-1 w-full bg-background">
        <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
          {/* Имитируем несколько сообщений */}

          {/* 1. Сообщение от AI (слева) */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 max-w-[75%]">
              <Skeleton className="h-16 w-[280px] rounded-2xl rounded-tl-none" />
            </div>
          </div>

          {/* 2. Сообщение от User (справа) */}
          <div className="flex gap-4 flex-row-reverse">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 max-w-[75%]">
              <Skeleton className="h-10 w-[200px] rounded-2xl rounded-tr-none" />
            </div>
          </div>

          {/* 3. Сообщение от AI (слева - длинное) */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 w-full max-w-[85%] md:max-w-[75%]">
              <Skeleton className="h-32 w-full rounded-2xl rounded-tl-none" />
            </div>
          </div>

          {/* 4. Сообщение от User (справа) */}
          <div className="flex gap-4 flex-row-reverse">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 max-w-[75%]">
              <Skeleton className="h-12 w-[240px] rounded-2xl rounded-tr-none" />
            </div>
          </div>

          {/* 5. Имитация загрузки ответа (AI печатает) */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <Skeleton className="h-12 w-24 rounded-2xl rounded-tl-none" />
          </div>
        </div>
      </ScrollArea>

      {/* --- Input Area Skeleton --- */}
      <div className="flex-none p-4 bg-background/80 backdrop-blur-md border-t border-border/40">
        <div className="max-w-3xl mx-auto relative space-y-4">
          {/* Suggested Queries (Теги) */}
          <div className="flex justify-center gap-2 mb-4">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>

          {/* Input Bar */}
          <div className="relative">
            <Skeleton className="h-[52px] w-full rounded-full" />
            {/* Кнопка отправки внутри инпута */}
            <Skeleton className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
