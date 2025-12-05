import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircleQuestion } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-universe-cyan/10 text-universe-cyan border border-universe-cyan/20 text-sm font-medium">
          <MessageCircleQuestion className="h-4 w-4" />
          Поддержка
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Как мы можем <span className="text-universe-cyan">помочь?</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Найдите ответы на вопросы или напишите нам напрямую.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-cyan text-left text-foreground transition-colors">
                Как работает AI-помощник?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Наш AI анализирует базы данных вузов и ваши предпочтения, чтобы
                предложить лучшие варианты обучения.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-cyan text-left text-foreground transition-colors">
                Актуальны ли цены на сайте?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы обновляем данные каждый семестр. Текущие цены действительны
                на 2024-2025 учебный год.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border/50">
              <AccordionTrigger className="hover:text-universe-cyan text-left text-foreground transition-colors">
                Как подать заявку в вуз?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Используйте кнопку {'"'}Подать заявку{'"'} на странице вуза. Мы
                перенаправим вас на официальный портал приемной комиссии.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-card border border-border/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-universe-purple/10 blur-3xl rounded-full -z-10"></div>

          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Mail className="h-6 w-6 text-universe-purple" /> Связаться с нами
          </h2>
          <form className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Ваше имя
              </label>
              <Input
                placeholder="Алихан"
                className="bg-background border-border focus:border-universe-cyan"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="example@mail.com"
                className="bg-background border-border focus:border-universe-cyan"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Сообщение
              </label>
              <Textarea
                placeholder="У меня проблема с..."
                className="bg-background border-border focus:border-universe-cyan min-h-[120px]"
              />
            </div>
            <Button className="w-full bg-universe-cyan hover:bg-universe-cyan/90 text-universe-indigo font-bold shadow-lg shadow-universe-cyan/20 transition-all">
              Отправить сообщение
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
