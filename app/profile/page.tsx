import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Heart, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Боковая панель (Информация о юзере) */}
        <Card className="w-full md:w-80 h-fit border-t-4 border-t-universe-cyan shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-universe-indigo text-white text-2xl">
                  A
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600">
                Online
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-universe-indigo">
              Alikhan Student
            </CardTitle>
            <CardDescription>Абитуриент • Алматы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm py-2 border-b">
              <span className="text-slate-500">Email</span>
              <span className="font-medium">alikhan@iitu.kz</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b">
              <span className="text-slate-500">ЕНТ Балл</span>
              <span className="font-bold text-universe-purple">115</span>
            </div>
            <Link href="/login">
              <Button variant="destructive" className="w-full mt-6 gap-2">
                <LogOut className="h-4 w-4" /> Выйти
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-universe-indigo mb-6">
            Личный кабинет
          </h1>

          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="bg-white border mb-6">
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-universe-purple data-[state=active]:text-white"
              >
                <Heart className="h-4 w-4 mr-2" /> Избранные ВУЗы
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" /> Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-4">
              <Card className="flex items-center p-4 hover:shadow-md transition">
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600 text-xl mr-4">
                  IT
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-universe-indigo">
                    IITU (МУИТ)
                  </h3>
                  <p className="text-sm text-slate-500">
                    Computer Science • 1.2 млн ₸/год
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-universe-purple border-universe-purple"
                >
                  Подробнее
                </Button>
              </Card>

              <Card className="flex items-center p-4 hover:shadow-md transition">
                <div className="h-16 w-16 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-xl mr-4">
                  KB
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-universe-indigo">
                    KBTU (КБТУ)
                  </h3>
                  <p className="text-sm text-slate-500">
                    Oil & Gas • 1.8 млн ₸/год
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-universe-purple border-universe-purple"
                >
                  Подробнее
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки профиля</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">Функционал в разработке...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
