import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const universities = [
  {
    id: "iitu",
    name: "IITU (МУИТ)",
    type: "IT Университет",
    price: "1.2 млн ₸",
    loc: "Алматы",
  },
  {
    id: "kbtu",
    name: "KBTU (КБТУ)",
    type: "Технический",
    price: "1.8 млн ₸",
    loc: "Алматы",
  },
  {
    id: "aupet",
    name: "AUPET (АУЭС)",
    type: "Энергетический",
    price: "950 тыс ₸",
    loc: "Алматы",
  },
  {
    id: "kaznu",
    name: "KazNU (КазНУ)",
    type: "Национальный",
    price: "1.0 млн ₸",
    loc: "Алматы",
  },
];

export default function UniversitiesList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Каталог университетов
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {universities.map((u) => (
          <Card key={u.id} className="hover:shadow-lg transition duration-300">
            <div className="h-32 bg-slate-200 w-full animate-pulse bg-gradient-to-r from-blue-100 to-indigo-100" />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-slate-800">{u.name}</h2>
                <Badge variant="secondary">{u.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
                <MapPin className="h-4 w-4" /> {u.loc}
              </div>
              <p className="font-semibold text-slate-700">
                {u.price}{" "}
                <span className="text-slate-400 font-normal">/ год</span>
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/universities/${u.id}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Подробнее
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
