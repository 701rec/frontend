"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Привет! Я AI-консультант UniVerse. Я помогу подобрать университет, расскажу про гранты и сравню условия обучения. Что тебя интересует?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let aiResponseText =
        "Я могу помочь найти информацию о вузах РК. Попробуй спросить про 'МУИТ' или 'Стоимость обучения'.";

      const lowerInput = userMessage.content.toLowerCase();

      if (lowerInput.includes("муит") || lowerInput.includes("iitu")) {
        aiResponseText =
          "Международный IT Университет (IITU) — лидер в подготовке IT-специалистов. \n\n💰 Стоимость: ~1.2 млн тг/год\n📍 Локация: Алматы, Манаса 34\n🏆 Рейтинг: Топ-1 по трудоустройству выпускников.\n\nХотите сравнить его с КБТУ?";
      } else if (lowerInput.includes("кбту") || lowerInput.includes("kbtu")) {
        aiResponseText =
          "Казахстанско-Британский технический университет (КБТУ). \n\n💰 Стоимость: ~1.8 млн тг/год\n📍 Локация: Алматы, Толе би 59\n🇬🇧 Особенность: Дипломы Лондонской школы экономики.";
      } else if (
        lowerInput.includes("грант") ||
        lowerInput.includes("бюджет")
      ) {
        aiResponseText =
          "В 2025 году выделено более 70 000 грантов. Для IT специальностей проходной балл обычно выше 100. Рекомендую подавать документы в 4 вуза сразу для повышения шансов.";
      } else if (lowerInput.includes("привет")) {
        aiResponseText =
          "Привет! Готов помочь с поступлением. Какой город рассматриваешь?";
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponseText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-4xl py-6 h-[calc(100vh-80px)]">
      <Card className="h-full flex flex-col shadow-lg border-slate-200">
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Assistant UniVerse
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <ScrollArea className="h-full p-4 pr-6">
            <div className="flex flex-col gap-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-1 border">
                    {message.role === "assistant" ? (
                      <>
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback className="bg-blue-600 text-white">
                          <Bot size={16} />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback className="bg-slate-800 text-white">
                          <User size={16} />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>

                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow-sm whitespace-pre-line ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-slate-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-blue-600 text-white">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-100 rounded-2xl px-4 py-3 flex gap-1 items-center">
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-4 border-t bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Спросите про университеты, цены или гранты..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
