import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto grid w-[350px] gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-universe-indigo font-bold mb-8 hover:opacity-80 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Назад на главную
          </Link>

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-universe-indigo">
              С возвращением!
            </h1>
            <p className="text-balance text-slate-500">
              Введите email для входа в UniVerse
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-universe-purple"
                >
                  Забыли пароль?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/profile" className="w-full">
              <Button
                type="submit"
                className="w-full bg-universe-purple hover:bg-universe-indigo transition-colors shadow-lg shadow-universe-purple/20"
              >
                Войти
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Войти через Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Нет аккаунта?{" "}
            <Link
              href="#"
              className="underline text-universe-purple font-medium"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-universe-indigo lg:block relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-universe-purple rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-universe-cyan rounded-full blur-[100px] opacity-30"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10 text-center">
          <GraduationCap className="h-24 w-24 mb-6 text-universe-cyan" />
          <h2 className="text-4xl font-bold mb-4">
            Твое будущее начинается здесь
          </h2>
          <p className="text-lg text-slate-300 max-w-md">
            Искусственный интеллект поможет подобрать идеальный университет за
            считанные минуты.
          </p>
        </div>
      </div>
    </div>
  );
}
