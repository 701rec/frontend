// src/api/user.ts

// Описываем структуру данных, которая приходит от бэкенда
export interface UserProfile {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  location: string;
  status: string;
  entScore: number;
  favorites: any[]; // Массив избранного (пока пустой)
}

// Адрес вашего API
const API_BASE_URL = "http://192.168.8.31:8080/api";

// Функция запроса профиля
export async function getUserProfile(
  userId: number | string
): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Если нужен токен, раскомментируйте строку ниже:
        // "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      cache: "no-store", // Не кешировать, всегда брать свежие данные
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error);
    throw error;
  }
}
