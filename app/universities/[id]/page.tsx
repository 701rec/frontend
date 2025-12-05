import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Globe, Award, BookOpen } from "lucide-react";
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
import Image from "next/image";

const universitiesDB: Record<string, any> = {
  iitu: {
    name: "International IT University",
    short: "IITU (МУИТ)",
    desc: "Ведущий IT-университет Центральной Азии, лидер по подготовке квалифицированных кадров в сфере ИКТ.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop", // Заглушка
    location: "г. Алматы, ул. Манаса, 34/1",
    rating: 4.8,
    price: "1 200 000 ₸",
    contacts: "+7 (727) 320 00 00",
    programs: [
      "Computer Science (ВТиПО)",
      "Software Engineering (ИС)",
      "Cybersecurity (ИБ)",
      "Data Science",
      "Journalism & Digital Media",
    ],
  },
  kbtu: {
    name: "Kazakh-British Technical University",
    short: "KBTU (КБТУ)",
    desc: "Научно-образовательный кластер, объединяющий университет, индустрию и науку.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
    location: "г. Алматы, ул. Толе би, 59",
    rating: 4.9,
    price: "1 800 000 ₸",
    contacts: "+7 (727) 357 42 42",
    programs: [
      "Information Systems",
      "Petroleum Engineering",
      "Chemical Engineering",
      "Maritime Academy",
      "Business School",
    ],
  },
};

export default function UniversityPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const uni = universitiesDB[id] || universitiesDB["iitu"];

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="relative h-64 md:h-80 bg-slate-900 overflow-hidden">
        <Image
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-8">
          <Link
            href="/universities"
            className="text-white/80 hover:text-white flex items-center gap-2 mb-4 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Назад к списку
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge className="mb-2 bg-blue-500 hover:bg-blue-600">
                Top University
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {uni.short}
              </h1>
              <div className="flex items-center gap-4 text-slate-300 text-sm md:text-base">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {uni.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" /> Рейтинг: {uni.rating}/5
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-900 hover:bg-slate-100 font-bold">
                Подать документы
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                3D Тур
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-6">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-white shadow-md p-1 h-auto rounded-xl">
            <TabsTrigger value="about" className="py-3">
              Об университете
            </TabsTrigger>
            <TabsTrigger value="programs" className="py-3">
              Программы
            </TabsTrigger>
            <TabsTrigger value="admission" className="py-3">
              Поступление
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {uni.desc}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-bold text-blue-900 text-2xl">98%</h3>
                      <p className="text-sm text-blue-700">Трудоустройство</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="font-bold text-indigo-900 text-2xl">
                        40+
                      </h3>
                      <p className="text-sm text-indigo-700">Вузов-партнеров</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Контакты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <span>{uni.contacts}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-slate-400" />
                    <span className="text-blue-600 cursor-pointer">
                      www.example.kz
                    </span>
                  </div>
                  <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center text-slate-400 text-sm">
                    Карта (Google Maps)
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Бакалавриат и Магистратура</CardTitle>
                <CardDescription>
                  Доступные образовательные программы на 2025 год
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {uni.programs.map((prog: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition cursor-pointer group"
                    >
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-slate-700">{prog}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admission" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Приемная комиссия 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">Стоимость обучения (год)</p>
                      <p className="text-sm text-slate-500">
                        Может меняться в зависимости от программы
                      </p>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      {uni.price}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Необходимые документы:</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>Аттестат о среднем образовании</li>
                      <li>Сертификат ЕНТ (мин. 50 баллов)</li>
                      <li>Удостоверение личности (копия)</li>
                      <li>Медицинская справка 075-У</li>
                      <li>6 фотографий 3x4</li>
                    </ul>
                  </div>

                  <Button className="w-full">Подать онлайн-заявку</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
