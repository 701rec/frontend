"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  Settings,
  Heart,
  LogOut,
  User,
  MapPin,
  Bell,
  Shield,
  Save,
  Loader2,
} from "lucide-react";

import { getUserProfile } from "@/services/user.service";
import { UserProfile } from "@/types/user";
import Loading from "./loading";

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [location, setLocation] = useState("");
  const [targetScore, setTargetScore] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getUserProfile(1);
        setProfile(data);

        // Используем опциональную цепочку при установке стейта, чтобы не упало при ошибке
        if (data) {
          setLocation(data.location);
          setTargetScore(data.entScore.toString());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Данные сохранены:", { location, targetScore });
    }, 1000);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`;
  };

  // ✅ Оставляем только Loading.
  // Если загрузка прошла, но профиля нет (ошибка),
  // страница отрендерится пустой или с дефолтными значениями благодаря "?."
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ЛЕВАЯ КОЛОНКА */}
        <Card className="w-full md:w-80 h-fit border-t-4 border-t-universe-cyan shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 relative group">
              <Avatar className="h-28 w-28 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                {/* 🛡️ Добавляем ?. */}
                <AvatarImage src={profile?.avatarUrl} alt={profile?.fullName} />
                <AvatarFallback className="bg-universe-indigo text-white text-3xl font-bold">
                  {/* 🛡️ Передаем безопасные значения */}
                  {getInitials(profile?.firstName, profile?.lastName)}
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 border-2 border-background px-3">
                Online
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {/* 🛡️ Добавляем ?. и фолбэк */}
              {profile?.fullName || "Пользователь"}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />{" "}
              {location || profile?.location || "Не указано"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Статус
                </span>
                <span className="font-medium text-foreground">
                  {profile?.status || "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span
                  className="font-medium text-foreground truncate max-w-[150px]"
                  title={profile?.email}
                >
                  {profile?.email || "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground">ЕНТ Балл</span>
                <span className="font-bold text-universe-purple text-lg">
                  {targetScore || profile?.entScore || 0}
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" /> Выйти
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Личный кабинет
            </h1>
            <span className="text-sm text-muted-foreground">
              ID: {profile?.id || "Unknown"}
            </span>
          </div>

          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="bg-secondary/50 p-1 border border-border/50 h-auto w-full justify-start rounded-xl mb-6">
              <TabsTrigger
                value="favorites"
                className="rounded-lg px-6 py-2.5 transition-all"
              >
                <Heart className="h-4 w-4 mr-2" /> Избранные ВУЗы
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-lg px-6 py-2.5 transition-all"
              >
                <Settings className="h-4 w-4 mr-2" /> Настройки
              </TabsTrigger>
            </TabsList>

            {/* TAB: FAVORITES */}
            <TabsContent
              value="favorites"
              className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Card className="p-8 text-center border-dashed border-2 border-muted">
                <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-muted-foreground font-medium">
                  Список избранного пуст
                </p>
              </Card>
            </TabsContent>

            {/* TAB: SETTINGS */}
            <TabsContent
              value="settings"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Card className="bg-card/50 border-border/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Редактирование профиля</CardTitle>
                  <CardDescription>
                    Управляйте своими личными данными и предпочтениями
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Секция: Основные данные */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" /> Личная информация
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Имя</Label>
                        <Input
                          id="firstName"
                          // 🛡️ Важно: || "" предотвращает ошибку uncontrolled input
                          defaultValue={profile?.firstName || ""}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input
                          id="lastName"
                          defaultValue={profile?.lastName || ""}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Локация</Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ваш город"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entScore">Целевой балл ЕНТ</Label>
                        <Input
                          id="entScore"
                          type="number"
                          value={targetScore}
                          onChange={(e) => setTargetScore(e.target.value)}
                          placeholder="120"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Секция: Уведомления */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Bell className="h-4 w-4" /> Уведомления
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3 bg-secondary/20">
                        <div className="space-y-0.5">
                          <Label className="text-base">Новые гранты</Label>
                          <p className="text-sm text-muted-foreground">
                            Получать уведомления о новых грантах по вашей
                            специальности
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3 bg-secondary/20">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email рассылка</Label>
                          <p className="text-sm text-muted-foreground">
                            Новости образования и обновления платформы
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Секция: Безопасность */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Безопасность
                    </h3>
                    <div className="flex gap-4">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Сменить пароль
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full sm:w-auto hover:bg-red-600/90"
                      >
                        Удалить аккаунт
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t border-border/40 pt-6">
                  <Button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="bg-universe-purple hover:bg-universe-purple/90 text-white min-w-[150px]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
