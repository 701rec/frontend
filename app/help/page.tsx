import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-universe-indigo mb-4">
          Как мы можем помочь?
        </h1>
        <p className="text-xl text-slate-600">
          Найдите ответы на вопросы или напишите нам.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* FAQ Секция */}
        <div>
          <h2 className="text-2xl font-bold text-universe-purple mb-6">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как работает AI-помощник?</AccordionTrigger>
              <AccordionContent>
                Наш AI анализирует базы данных вузов и ваши предпочтения, чтобы
                предложить лучшие варианты обучения.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Актуальны ли цены на сайте?</AccordionTrigger>
              <AccordionContent>
                Мы обновляем данные каждый семестр. Текущие цены действительны
                на 2024-2025 учебный год.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Как подать заявку в вуз?</AccordionTrigger>
              <AccordionContent>
                Используйте кнопку {'"'}Подать заявк{'"'} на странице вуза. Мы
                перенаправим вас на официальный портал приемной комиссии.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border">
          <h2 className="text-2xl font-bold text-universe-indigo mb-6 flex items-center gap-2">
            <Mail className="h-6 w-6" /> Связаться с нами
          </h2>
          <form className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Ваше имя</label>
              <Input placeholder="Алихан" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="example@mail.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Сообщение</label>
              <Textarea placeholder="У меня проблема с..." />
            </div>
            <Button className="w-full bg-universe-cyan hover:bg-blue-400 text-white font-bold">
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
