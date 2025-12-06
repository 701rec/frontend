// lib/university-api.ts

import { API_URL } from "@/lib/config"; // Импортируем вашу конфигурацию
// import { University } from "@/types/university"; // Если у вас есть отдельный файл для типов

// 💡 Переносим определение типа сюда (или импортируем из "@/types/university")
export type University = {
  id: number;
  name: string;
  logo: string;
  color: string;
  price: string;
  rating: number;
  military: boolean;
  dorm: boolean;
  focus: string;
};

// 💡 API-функция для получения списка всех ВУЗов
export async function getUniversities(): Promise<University[]> {
  const endpoint = `${API_URL}/universities`;

  try {
    const response = await fetch(endpoint, {
      cache: "no-store", // Отключаем Next.js Data Cache для свежих данных
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch universities: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching universities list:", error);
    return [];
  }
}

// 💡 API-функция для получения ВУЗа по ID
export async function getUniversityById(
  id: string
): Promise<University | null> {
  const endpoint = `${API_URL}/universities/${id}`;

  try {
    console.log(`📡 Запрос университета: ${endpoint}`);

    const response = await fetch(endpoint, {
      cache: "no-store", // Отключаем Next.js Data Cache для свежих данных
    });

    if (!response.ok) {
      console.error(`❌ Ошибка запроса (ID: ${id}): ${response.status}`);
      return null;
    }

    const data: University = await response.json();
    return data;
  } catch (error) {
    console.error(
      `🔥 Ошибка сети при получении университета (ID: ${id}):`,
      error
    );
    return null;
  }
}
