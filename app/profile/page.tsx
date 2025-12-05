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
import { Settings, Heart, LogOut, User, MapPin } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-80 h-fit border-t-4 border-t-universe-cyan shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 relative group">
              <Avatar className="h-28 w-28 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-universe-indigo text-white text-3xl font-bold">
                  AS
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 border-2 border-background px-3">
                Online
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Alikhan Student
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" /> Алматы, Казахстан
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Статус
                </span>
                <span className="font-medium text-foreground">Абитуриент</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground truncate max-w-[150px]">
                  alikhan@iitu.kz
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted-foreground">ЕНТ Балл</span>
                <span className="font-bold text-universe-purple text-lg">
                  115
                </span>
              </div>
            </div>

            <Link href="/login" className="block pt-2">
              <Button
                variant="destructive"
                className="w-full gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <LogOut className="h-4 w-4" /> Выйти
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Личный кабинет
            </h1>
            <span className="text-sm text-muted-foreground">
              ID: 701rec-2025
            </span>
          </div>

          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="bg-secondary/50 p-1 border border-border/50 h-auto w-full justify-start rounded-xl mb-6">
              <TabsTrigger
                value="favorites"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-universe-purple data-[state=active]:text-white transition-all"
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

            <TabsContent
              value="favorites"
              className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Card className="flex flex-col sm:flex-row items-center p-4 hover:shadow-lg transition-all border-border/60 hover:border-universe-cyan/50 bg-card/50 backdrop-blur-sm group">
                <div className="h-16 w-16 bg-universe-cyan/10 rounded-xl flex items-center justify-center font-bold text-universe-cyan text-xl mb-4 sm:mb-0 sm:mr-6 border border-universe-cyan/20 group-hover:scale-110 transition-transform">
                  IT
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-universe-cyan transition-colors">
                    IITU (МУИТ)
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="bg-secondary/50">
                      Computer Science
                    </Badge>
                    <span>•</span>
                    <span>1.2 млн ₸/год</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 sm:mt-0 text-universe-purple border-universe-purple/30 hover:bg-universe-purple hover:text-white"
                >
                  Подробнее
                </Button>
              </Card>

              <Card className="flex flex-col sm:flex-row items-center p-4 hover:shadow-lg transition-all border-border/60 hover:border-universe-purple/50 bg-card/50 backdrop-blur-sm group">
                <div className="h-16 w-16 bg-universe-purple/10 rounded-xl flex items-center justify-center font-bold text-universe-purple text-xl mb-4 sm:mb-0 sm:mr-6 border border-universe-purple/20 group-hover:scale-110 transition-transform">
                  KB
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-universe-purple transition-colors">
                    KBTU (КБТУ)
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="bg-secondary/50">
                      Oil & Gas
                    </Badge>
                    <span>•</span>
                    <span>1.8 млн ₸/год</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 sm:mt-0 text-universe-purple border-universe-purple/30 hover:bg-universe-purple hover:text-white"
                >
                  Подробнее
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-card/50 border-border/60">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Настройки профиля
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center border-2 border-dashed border-muted rounded-xl bg-secondary/20">
                    <Settings className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      Функционал настроек находится в разработке...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
