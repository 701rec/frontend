import Link from "next/link";
import {
  Building2,
  BookOpen,
  FileText,
  Glasses,
  Globe,
  Scale,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      id: 1,
      title: "Об университете",
      desc: "Информация о миссии, истории, лидерстве и достижениях.",
      icon: <Building2 className="h-8 w-8 text-white" />,
      color: "bg-blue-500",
      link: "/universities",
    },
    {
      id: 2,
      title: "Академ. программы",
      desc: "Перечень учебных программ и курсов.",
      icon: <BookOpen className="h-8 w-8 text-white" />,
      color: "bg-blue-600",
      link: "/universities",
    },
    {
      id: 3,
      title: "Приём и поступление",
      desc: "Требования, сроки, стипендии и помощь.",
      icon: <FileText className="h-8 w-8 text-white" />,
      color: "bg-blue-700",
      link: "/admission",
    },
    {
      id: 4,
      title: "3D-тур",
      desc: "Виртуальное путешествие по кампусу.",
      icon: <Glasses className="h-8 w-8 text-white" />,
      color: "bg-indigo-500",
      link: "/tours",
    },
    {
      id: 5,
      title: "Международное сотрудничество",
      desc: "Программы обмена и партнеры.",
      icon: <Globe className="h-8 w-8 text-white" />,
      color: "bg-indigo-600",
      link: "/cooperation",
    },
    {
      id: 6,
      title: "Функция сравнения",
      desc: "Возможность сравнивать вузы по критериям.",
      icon: <Scale className="h-8 w-8 text-white" />,
      color: "bg-indigo-700",
      link: "/compare",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
          DataHub ВУЗ-ов “РК”
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Общий каталог университетов с поддержкой Искусственного Интеллекта.
          Найди свой идеальный вуз за 2 минуты.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-100 bg-white`}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 ${item.color}`}
            />

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-200">
                {item.id}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            </div>

            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
