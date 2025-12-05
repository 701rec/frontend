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
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION - Современное приветствие */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-universe-indigo">
        {/* Фоновые градиенты */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-universe-purple rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-universe-cyan rounded-full blur-[100px] opacity-30 -translate-x-1/4 translate-y-1/4"></div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-universe-cyan text-sm font-medium mb-8 backdrop-blur-sm border border-white/10">
            <Sparkles className="h-4 w-4" /> AI Hackathon 2025 Project
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Твой путь к знаниям начинается в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-universe-cyan to-universe-purple">
              UniVerse
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Единый DataHub университетов РК. Сравнивай вузы, изучай программы и
            поступай на грант с помощью Искусственного Интеллекта.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/ai">
              <Button
                size="lg"
                className="bg-universe-cyan hover:bg-cyan-400 text-universe-indigo font-bold text-lg px-8 h-14 rounded-full shadow-[0_0_20px_rgba(63,172,247,0.5)] transition-all hover:scale-105"
              >
                Запустить AI-Помощника ✨
              </Button>
            </Link>
            <Link href="/universities">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-500 text-white hover:bg-white/10 hover:text-white h-14 px-8 rounded-full text-lg"
              >
                Открыть каталог
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - Твои 6 кнопок, но компактнее */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-universe-indigo mb-4">
              Все инструменты в одном месте
            </h2>
            <p className="text-slate-600">
              Шесть мощных модулей для абитуриента
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 ${item.color}`}
                />

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-universe-purple transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 leading-relaxed">
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
