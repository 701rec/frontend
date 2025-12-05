"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Loader2,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAIResponse } from "@/services/ai.service";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUERIES = [
  "Какова стоимость обучения на программиста в IITU?",
  "Какие гранты доступны для новых студентов?",
  "Как получить место в общежитии UniVerse?",
];

export default function AIPage() {
  const { isLogin, isLoading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
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

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isAiLoading) return;

      const userMsg: Message = { id: Date.now(), role: "user", content: text };
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
            : `Ошибка: Не удалось подключиться к AI-сервису по адресу \`${API_URL}\`. Проверьте, запущен ли бэкенд.`;

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "assistant", content: errorMessage },
        ]);
      } finally {
        setIsAiLoading(false);
      }
    },
    [isAiLoading]
  );

  const handleSend = () => {
    sendMessage(input);
  };

  const handleSuggestedQueryClick = (query: string) => {
    sendMessage(query);
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

  const markdownComponents = {
    a: ({ node, ...props }: any) => (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="text-universe-cyan underline hover:no-underline font-medium"
      />
    ),
    p: ({ node, ...props }: any) => (
      <p {...props} className="mt-2 mb-3 last:mb-0" />
    ),
    li: ({ node, ...props }: any) => <li {...props} className="my-1.5" />,
    h1: ({ node, ...props }: any) => (
      <h1 {...props} className="text-xl font-bold mt-4 mb-2" />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 {...props} className="text-lg font-bold mt-4 mb-2" />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 {...props} className="text-base font-semibold mt-3 mb-1" />
    ),
    blockquote: ({ node, ...props }: any) => (
      <blockquote
        {...props}
        className="mt-4 border-l-4 border-universe-cyan pl-4 italic text-muted-foreground"
      />
    ),
    table: ({ node, ...props }: any) => (
      <Table {...props} className="my-4 w-full" />
    ),
    thead: ({ node, ...props }: any) => <TableHeader {...props} />,
    tr: ({ node, ...props }: any) => <TableRow {...props} />,
    th: ({ node, ...props }: any) => <TableHead {...props} />,
    td: ({ node, ...props }: any) => <TableCell {...props} />,
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      if (inline) {
        return (
          <code
            className="bg-secondary text-foreground px-1 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre className="mt-4 mb-2 rounded-lg p-3 bg-gray-800 overflow-x-auto text-white">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background transition-colors duration-300 overflow-hidden">
      {/* --- Header --- (Без изменений) */}
      <div className="flex-none bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-center shadow-sm z-10">
        <div className="max-w-3xl w-full flex items-center justify-between mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-universe-purple to-universe-cyan p-2.5 rounded-xl shadow-lg shadow-universe-purple/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg leading-none mb-1">
                Uni<span className="text-universe-purple">Verse</span> AI
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
      <ScrollArea className="flex-1 w-full bg-background">
        <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center p-8">
              <div className="bg-gradient-to-tr from-universe-purple to-universe-cyan p-4 rounded-full shadow-xl shadow-universe-purple/30 mb-6">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground mb-3">
                Привет! Я AI-консультант UniVerse
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Задайте мне любой вопрос о поступлении, обучении, грантах,
                общежитии или других аспектах жизни в МУИТ.
              </p>
            </div>
          )}

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
                className={`group relative px-5 py-3.5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-md text-sm leading-relaxed border ${
                  m.role === "user"
                    ? "bg-universe-purple text-white border-universe-purple rounded-tr-none"
                    : "bg-card text-card-foreground border-border/50 rounded-tl-none"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents as any}
                >
                  {m.content}
                </ReactMarkdown>
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
      {/* --- End Chat Messages --- */}

      {/* --- Input Area with Suggested Queries --- */}
      <div className="flex-none p-4 bg-background/80 backdrop-blur-md border-t border-border/40">
        <div className="max-w-3xl mx-auto relative">
          {/* Suggested Queries - Показываются только если нет сообщений и AI не загружается */}
          {messages.length === 0 && !isAiLoading && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {SUGGESTED_QUERIES.map((query) => (
                <Button
                  key={query}
                  variant="outline"
                  size="sm"
                  className="rounded-full h-auto py-2 px-4 text-sm font-normal text-muted-foreground hover:bg-universe-purple/10 hover:border-universe-purple/50 border-border transition-colors duration-200"
                  onClick={() => handleSuggestedQueryClick(query)}
                  disabled={isAiLoading}
                >
                  <MessageSquareText className="h-3.5 w-3.5 mr-2" />
                  {query}
                </Button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            // Удаляем "flex gap-2", чтобы кнопка располагалась абсолютно внутри
            className="relative"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Спросите про гранты или вузы..."
              // Убедитесь, что есть правый отступ (pr-14)
              className="pl-5 pr-14 py-6 rounded-full border-border bg-secondary/30 focus:bg-background focus:border-universe-purple transition-all shadow-inner text-base w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isAiLoading}
            />
            {/* Кнопка с абсолютным позиционированием ВНУТРИ Input */}
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isAiLoading}
              // Изменено позиционирование: right-2, вертикальное центрирование (top-1/2 -translate-y-1/2)
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-universe-purple hover:bg-universe-purple/90 text-white transition-transform hover:scale-105 shadow-md shadow-universe-purple/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      {/* --- End Input Area --- */}
      {/* --- End Input Area --- */}
    </div>
  );
}
