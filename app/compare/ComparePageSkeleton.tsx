import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ComparePageSkeleton() {
  // Эмулируем 3 колонки ВУЗов
  const columns = [1, 2, 3];
  // Эмулируем 5 строк критериев (цена, рейтинг, военка, общага, профиль)
  const rows = [1, 2, 3, 4, 5];

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      {/* --- Заголовок страницы --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="space-y-3">
          {/* Иконка + H1 */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" /> {/* Иконка */}
            <Skeleton className="h-10 w-64 md:w-96" /> {/* Заголовок */}
          </div>
          {/* Подзаголовок */}
          <Skeleton className="h-5 w-80" />
        </div>
        {/* Кнопка "Добавить ВУЗ" */}
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>

      {/* --- Таблица сравнения --- */}
      <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur shadow-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-b border-border/50">
                {/* Колонка названий критериев */}
                <TableHead className="w-[200px] pl-6 align-middle">
                  <Skeleton className="h-6 w-24" />
                </TableHead>

                {/* Колонки ВУЗов (Карточки в хедере) */}
                {columns.map((i) => (
                  <TableHead key={i} className="pb-6 pt-8 min-w-[220px]">
                    <div className="flex flex-col items-center gap-3">
                      {/* Логотип ВУЗа (квадрат) */}
                      <Skeleton className="w-16 h-16 rounded-2xl" />
                      {/* Название ВУЗа */}
                      <Skeleton className="h-6 w-32" />
                      {/* Кнопка "Убрать" */}
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Рендеринг строк критериев */}
              {rows.map((row) => (
                <TableRow
                  key={row}
                  className="border-b border-border/40 hover:bg-transparent"
                >
                  {/* Название критерия */}
                  <TableCell className="pl-6 py-6">
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  {/* Ячейки данных */}
                  {columns.map((col) => (
                    <TableCell key={col} className="py-6">
                      <div className="flex justify-center">
                        {/* Варьируем ширину скелетона для естественности */}
                        <Skeleton
                          className={`h-6 ${
                            row === 2 ? "w-16 rounded-full" : "w-24"
                          }`}
                        />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Нижний ряд с кнопками "Подать заявку" */}
              <TableRow className="hover:bg-transparent">
                <TableCell className="pl-6"></TableCell>
                {columns.map((col) => (
                  <TableCell key={col} className="pb-8 pt-6 px-4">
                    <Skeleton className="h-10 w-full rounded-md shadow-sm" />
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
