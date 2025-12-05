import Link from "next/link";
import { ArrowLeft, GraduationCap, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300">
        <div className="mx-auto grid w-[350px] gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-universe-purple font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Назад на главную
          </Link>

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              С возвращением!
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите свои данные для входа в UniVerse
            </p>
          </div>

          <div className="grid gap-4">
            {/* --- КНОПКА ДЛЯ ЖЮРИ (БЫСТРЫЙ ВХОД) --- */}
            <Link href="/profile" className="w-full">
              <Button
                variant="outline"
                className="w-full gap-2 border-universe-purple/50 text-universe-purple hover:bg-universe-purple/10 hover:text-universe-purple h-12 font-semibold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-universe-purple/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <Sparkles className="h-4 w-4" />
                Демо вход (Для Жюри)
              </Button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Или через email
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                required
                className="bg-secondary/20 border-border focus:border-universe-purple"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-xs underline text-universe-purple hover:text-universe-pink transition-colors"
                >
                  Забыли пароль?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-secondary/20 border-border focus:border-universe-purple"
              />
            </div>

            <Link href="/profile" className="w-full">
              <Button
                type="submit"
                className="w-full bg-universe-purple hover:bg-universe-purple/90 text-white shadow-lg shadow-universe-purple/20 transition-all"
              >
                Войти
              </Button>
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?
            <Link
              href="#"
              className="underline text-universe-purple hover:text-universe-pink transition-colors font-medium"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/login-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-universe-dark via-universe-dark/80 to-universe-purple/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10 text-center">
          <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(157,110,255,0.3)] animate-in zoom-in duration-700">
            <GraduationCap className="h-16 w-16 text-white" />
          </div>

          <h2 className="text-4xl font-bold mb-4 tracking-tight drop-shadow-lg">
            Твое будущее начинается
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-universe-cyan to-universe-pink">
              здесь
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-md drop-shadow-md">
            Искусственный интеллект поможет подобрать идеальный университет и
            грант за считанные минуты.
          </p>
        </div>
      </div>
    </div>
  );
}
