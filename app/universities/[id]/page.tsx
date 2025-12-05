import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Award,
  BookOpen,
  Hotel,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getUniversityById,
} from "@/services/university.service";
import { notFound } from "next/navigation";
import { University } from "@/types/university";

export default async function UniversityPage({
  params,
}: {
  // ✅ ИСПРАВЛЕНИЕ ДЛЯ NEXT.JS 15: params теперь Promise
  params: Promise<{ id: string }>;
}) {
  // ✅ ИСПРАВЛЕНИЕ: Ждем разрешения промиса перед использованием id
  const { id } = await params;

  // 1. Получаем данные с сервера
  const uni: University | null = await getUniversityById(id);

  // 2. Если университет не найден — показываем страницу 404
  if (!uni) {
    notFound();
  }

  // 3. Подготовка данных для иконок (общежитие/военная кафедра)
  const features = [
    {
      label: "Общежитие",
      value: uni.dorm ? "Есть" : "Нет",
      icon: Hotel,
      color: uni.dorm ? "text-green-500" : "text-red-500",
      bgColor: uni.dorm ? "bg-green-500/10" : "bg-red-500/10",
    },
    {
      label: "Военная кафедра",
      value: uni.military ? "Есть" : "Нет",
      icon: Shield,
      color: uni.military ? "text-blue-500" : "text-red-500",
      bgColor: uni.military ? "bg-blue-500/10" : "bg-red-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-10 transition-colors duration-300">
      {/* Хедер с фоновым изображением */}
      <div className="relative h-64 md:h-96 bg-universe-indigo overflow-hidden">
        <Image
          src={uni.imageUrl || "/placeholder.jpg"} // Fallback, если картинки нет
          alt={uni.name}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-10">
          <Link
            href="/universities"
            className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Назад к списку
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge className="bg-universe-cyan text-universe-dark hover:bg-universe-cyan/80 font-bold border-none">
                  {uni.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-white border-white/50 backdrop-blur-sm"
                >
                  Аккредитован
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
                {uni.shortName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm md:text-base font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-universe-cyan" />{" "}
                  {uni.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-yellow-400" /> Рейтинг:{" "}
                  {uni.rating}/5
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-universe-purple hover:bg-universe-purple/90 text-white font-bold px-6 shadow-lg shadow-universe-purple/20">
                Подать документы
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
              >
                3D Тур
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент с табами */}
      <div className="container mx-auto px-4 py-8 -mt-6 relative z-10">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-card shadow-lg p-1 h-auto rounded-xl border border-border/50">
            <TabsTrigger
              value="about"
              className="py-3 data-[state=active]:bg-universe-indigo data-[state=active]:text-white rounded-lg transition-all"
            >
              Об университете
            </TabsTrigger>
            <TabsTrigger
              value="programs"
              className="py-3 data-[state=active]:bg-universe-indigo data-[state=active]:text-white rounded-lg transition-all"
            >
              Программы
            </TabsTrigger>
            <TabsTrigger
              value="admission"
              className="py-3 data-[state=active]:bg-universe-indigo data-[state=active]:text-white rounded-lg transition-all"
            >
              Поступление
            </TabsTrigger>
          </TabsList>

          {/* Вкладка: Об университете */}
          <TabsContent value="about" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-border/50 bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {uni.description}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-universe-cyan/10 rounded-2xl border border-universe-cyan/20">
                      <h3 className="font-bold text-universe-cyan text-3xl mb-1">
                        {uni.focus}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ключевой профиль
                      </p>
                    </div>
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className={`p-6 ${
                          feature.bgColor
                        } rounded-2xl border ${feature.bgColor.replace(
                          "/10",
                          "/20"
                        )}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <feature.icon
                            className={`h-5 w-5 ${feature.color}`}
                          />
                          <h3 className={`font-bold ${feature.color} text-2xl`}>
                            {feature.value}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card shadow-sm h-fit">
                <CardHeader>
                  <CardTitle className="text-foreground">Контакты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Phone className="h-5 w-5 text-universe-cyan" />
                    <span className="font-medium text-foreground">
                      {uni.contacts}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Globe className="h-5 w-5 text-universe-cyan" />
                    <a
                      href={
                        uni.website.startsWith("http")
                          ? uni.website
                          : `http://${uni.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-universe-purple cursor-pointer hover:underline font-medium"
                    >
                      {uni.website}
                    </a>
                  </div>
                  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm border border-border/50">
                    <MapPin className="h-4 w-4 mr-2" /> Карта (
                    {uni.location.split(",")[0].trim()})
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Вкладка: Программы */}
          <TabsContent value="programs" className="mt-8">
            <Card className="border-border/50 bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Образовательные программы 2025
                </CardTitle>
                <CardDescription>Бакалавриат</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {uni.programs && uni.programs.length > 0 ? (
                    uni.programs.map((prog: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-5 border border-border/50 rounded-2xl hover:border-universe-cyan hover:shadow-md transition cursor-pointer group bg-card"
                      >
                        <div className="h-12 w-12 bg-universe-cyan/10 text-universe-cyan rounded-full flex items-center justify-center group-hover:bg-universe-cyan group-hover:text-universe-dark transition">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-foreground group-hover:text-universe-purple transition-colors">
                          {prog}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      Список программ уточняется
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка: Поступление */}
          <TabsContent value="admission" className="mt-8">
            <Card className="border-border/50 bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Информация для поступающих
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-border/50 pb-6">
                    <div>
                      <p className="font-bold text-lg text-foreground">
                        Стоимость обучения
                      </p>
                      <p className="text-sm text-muted-foreground">
                        За один академический год
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-universe-purple">
                      {uni.price}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="font-bold text-foreground">
                      Необходимые документы:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {[
                        "Аттестат",
                        "Сертификат ЕНТ",
                        "Удостоверение (копия)",
                        "Справка 075-У",
                        "Фото 3x4 (6 шт)",
                        "Заявление",
                      ].map((doc, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/30"
                        >
                          <div className="h-2 w-2 rounded-full bg-universe-cyan" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full h-12 text-lg bg-universe-indigo hover:bg-universe-indigo/90 shadow-lg shadow-universe-indigo/20">
                    Подать онлайн-заявку
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
