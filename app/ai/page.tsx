"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAIResponse, API_URL } from "@/api/ai-api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function AIPage() {
  const { isLogin, isLoading } = useAuth();
  const router = useRouter();

  // --- ХУКИ ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Привет! 👋 Я AI-консультант UniVerse.\nСпроси меня про стоимость обучения в МУИТ, гранты или общежития.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isLogin) {
      router.push("/login");
    }
  }, [isLogin, isLoading, router]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiLoading]);

  // --- ЛОГИКА ---
  const handleSend = async () => {
    if (!input.trim() || isAiLoading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsAiLoading(true);

    try {
      const assistantResponse = await generateAIResponse(userMsg.content);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("AI Fetch Error:", error);
      const errorMessage =
        error instanceof Error && error.message.includes("API Error")
          ? `Ошибка: ${error.message}. Проверьте статус бэкенда.`
          : `Ошибка: Не удалось подключиться к AI-сервису по адресу ${API_URL}. Проверьте, запущен ли бэкенд.`;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-5rem)] w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-universe-purple" />
      </div>
    );
  }

  if (!isLogin) return null;

  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР
    // h-[calc(100vh-5rem)] -> 100% высоты экрана минус 5rem (80px - высота Navbar)
    // overflow-hidden -> предотвращает скролл самой страницы
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background transition-colors duration-300 overflow-hidden">
      {/* 1. ХЕДЕР ЧАТА (фиксированная высота, не сжимается) */}
      <div className="flex-none bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-center shadow-sm z-10">
        <div className="max-w-3xl w-full flex items-center justify-between mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-universe-purple to-universe-cyan p-2.5 rounded-xl shadow-lg shadow-universe-purple/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg leading-none mb-1">
                UniVerse AI
              </h1>
              <p className="text-xs text-universe-cyan flex items-center gap-1.5 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-universe-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-universe-cyan"></span>
                </span>
                Online
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Очистить</span>
          </Button>
        </div>
      </div>

      {/* 2. ОБЛАСТЬ СООБЩЕНИЙ (flex-1 занимает все доступное место) */}
      <ScrollArea className="flex-1 w-full bg-background">
        <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-300 ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-10 w-10 border border-border shadow-sm flex-shrink-0">
                <AvatarImage
                  src={m.role === "user" ? "/user.png" : "/bot.png"}
                />
                <AvatarFallback
                  className={
                    m.role === "user"
                      ? "bg-universe-purple text-white"
                      : "bg-universe-cyan text-universe-dark"
                  }
                >
                  {m.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </AvatarFallback>
              </Avatar>

              <div
                className={`group relative px-5 py-3.5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm text-sm leading-relaxed whitespace-pre-wrap border ${
                  m.role === "user"
                    ? "bg-universe-purple text-white border-universe-purple rounded-tr-none"
                    : "bg-card text-card-foreground border-border/50 rounded-tl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isAiLoading && (
            <div className="flex gap-4 animate-in fade-in duration-300">
              <Avatar className="h-10 w-10 border border-border flex-shrink-0">
                <AvatarFallback className="bg-universe-cyan text-universe-dark">
                  <Bot size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card px-5 py-4 rounded-2xl rounded-tl-none border border-border/50 shadow-sm flex gap-1.5 items-center w-fit">
                <span className="w-2 h-2 bg-universe-cyan rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-universe-purple rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-universe-pink rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={scrollRef} className="pb-2" />
        </div>
      </ScrollArea>

      {/* 3. ОБЛАСТЬ ВВОДА (фиксированная высота, прижата к низу) */}
      <div className="flex-none p-4 bg-background/80 backdrop-blur-md border-t border-border/40">
        <div className="max-w-3xl mx-auto relative">
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
              placeholder="Спросите про гранты или вузы..."
              className="pl-5 pr-14 py-6 rounded-full border-border bg-secondary/30 focus:bg-background focus:border-universe-purple transition-all shadow-inner text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isAiLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isAiLoading}
              className="absolute right-2 top-1.5 h-9 w-9 rounded-full bg-universe-purple hover:bg-universe-purple/90 text-white transition-transform hover:scale-105 shadow-md shadow-universe-purple/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
