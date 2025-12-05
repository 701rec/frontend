"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Привет! 👋 Я AI-консультант UniVerse.\nСпроси меня про стоимость обучения в МУИТ, гранты или общежития.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let response =
        "Я пока учусь, но могу подсказать по основным вузам Алматы.";
      const lower = userMsg.content.toLowerCase();

      if (lower.includes("муит") || lower.includes("iitu"))
        response =
          "**IITU (МУИТ)** 💻\n\n• **Цена:** ~1.2 млн тг/год\n• **Профиль:** IT, Кибербезопасность, Телеком\n• **Общежитие:** Есть (Дом Студентов)";
      else if (lower.includes("кбту") || lower.includes("kbtu"))
        response =
          "**KBTU (КБТУ)** 🇬🇧\n\n• **Цена:** ~1.8 млн тг/год\n• **Профиль:** Нефтегаз, IT, Бизнес\n• **Особенность:** Обучение на английском";
      else if (lower.includes("грант"))
        response =
          "В 2025 году выделено **78 000 грантов**.\n\nПроходные баллы:\n• IT: 100+\n• Инженерия: 85+\n• Педагогика: 75+";
      else if (lower.includes("привет"))
        response =
          "Привет! Готов помочь с поступлением. Какой город рассматриваешь?";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: response },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background transition-colors duration-300">
      <div className="bg-background/80 backdrop-blur-md border-b border-border/40 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
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
          onClick={() => setMessages([])}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Очистить</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4 md:p-6 bg-secondary/5">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-300 ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-10 w-10 border border-border shadow-sm">
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

          {isLoading && (
            <div className="flex gap-4 animate-in fade-in duration-300">
              <Avatar className="h-10 w-10 border border-border">
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
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/40">
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
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
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
