"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLogin: boolean;
  isLoading: boolean; // 1. Добавили поле
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 2. Начальное состояние true

  useEffect(() => {
    // Проверяем localStorage только один раз при загрузке
    const saved = localStorage.getItem("isLogin");
    if (saved === "true") {
      setIsLogin(true);
    }
    setIsLoading(false); // 3. Проверка закончена, снимаем загрузку
  }, []);

  useEffect(() => {
    // Сохраняем только если загрузка уже прошла (чтобы не перезатереть при инициализации)
    if (!isLoading) {
      localStorage.setItem("isLogin", isLogin.toString());
    }
  }, [isLogin, isLoading]);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <AuthContext.Provider value={{ isLogin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
