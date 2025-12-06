"use client";

import Link from "next/link";
import {
  Building2,
  BookOpen,
  FileText,
  Glasses,
  Globe,
  Scale,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3DBackground from "@/components/Hero3DBackground"; // Убедитесь, что этот файл создан

export default function Home() {
  const features = [
    {
      id: 1,
      title: "Об университете",
      desc: "Миссии, история и достижения.",
      icon: <Building2 className="h-6 w-6 text-white" />,
      color: "bg-universe-cyan",
      link: "/universities",
    },
    {
      id: 2,
      title: "Академ. программы",
      desc: "Бакалавриат и магистратура.",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: "bg-universe-purple",
      link: "/universities",
    },
    {
      id: 3,
      title: "Приём и поступление",
      desc: "Сроки, гранты и документы.",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "bg-universe-indigo",
      link: "/admission",
    },
    {
      id: 4,
      title: "3D-тур",
      desc: "Виртуальное путешествие.",
      icon: <Glasses className="h-6 w-6 text-white" />,
      color: "bg-universe-purple",
      link: "/tours",
    },
    {
      id: 5,
      title: "Сотрудничество",
      desc: "Exchange программы.",
      icon: <Globe className="h-6 w-6 text-white" />,
      color: "bg-universe-indigo",
      link: "/cooperation",
    },
    {
      id: 6,
      title: "Сравнение вузов",
      desc: "Аналитика и рейтинги.",
      icon: <Scale className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-r from-universe-purple to-universe-cyan",
      link: "/compare",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* --- 1. Фоновые эффекты (Blob Gradients) --- */}
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-universe-purple/30 rounded-full blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/4 animate-float-1`}
        ></div>

        <div
          className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-universe-cyan/30 rounded-full blur-[100px] opacity-40 -translate-x-1/4 translate-y-1/4 animate-float-2`}
        ></div>

        <div
          className={`absolute top-1/2 left-1/2 w-64 h-64 bg-universe-indigo/20 rounded-full blur-[80px] opacity-30 transform -translate-x-1/2 -translate-y-1/2 animate-float-3 hidden lg:block`}
        ></div>

        {/* --- 2. 3D ОБЪЕКТ --- */}
        {/* Располагается поверх градиентов, но под текстом */}
        <Hero3DBackground />

        {/* --- 3. Основной контент --- */}
        {/* Z-10 нужен, чтобы кнопки нажимались поверх 3D Canvas */}
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-universe-purple/10 text-universe-purple border border-universe-purple/20 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> AI Hackathon 2025 Project
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
            Твой путь к знаниям начинается в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-universe-cyan via-universe-purple to-universe-pink">
              UniVerse
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Единый DataHub университетов РК. Сравнивай вузы, изучай программы и
            поступай на грант с помощью Искусственного Интеллекта.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/ai">
              <Button
                size="lg"
                className="bg-universe-cyan hover:bg-universe-cyan/80 text-universe-dark font-bold text-lg px-8 h-14 rounded-full shadow-[0_0_20px_rgba(63,172,247,0.4)] transition-all hover:scale-105"
              >
                Запустить AI-Помощника ✨
              </Button>
            </Link>
            <Link href="/universities">
              <Button
                variant="outline"
                size="lg"
                className="bg-background/50 border-input text-foreground hover:bg-accent hover:text-accent-foreground h-14 px-8 rounded-full text-lg backdrop-blur-sm"
              >
                Открыть каталог
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Секция фич --- */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Все инструменты в одном месте
            </h2>
            <p className="text-muted-foreground">
              Шесть мощных модулей для абитуриента
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden hover:border-universe-purple/50"
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 ${item.color}`}
                />

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-universe-purple transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex items-center text-universe-purple font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Перейти <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
