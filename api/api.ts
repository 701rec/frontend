// lib/api.ts

// Тип University остается таким, как определен ранее,
// так как API-ответы для /universities и /universities/{id} идентичны по структуре.
export type University = {
  id: number;
  name: string;
  shortName: string;
  type: string;
  price: string;
  rating: number;
  location: string;
  imageUrl: string;
  description: string;
  contacts: string;
  website: string;
  military: boolean;
  dorm: boolean;
  focus: string;
  programs: string[];
};

// Функция для получения списка (остается без изменений)
export async function getUniversities(): Promise<University[]> {
  // ... (старый код) ...
  const API_URL = "http://192.168.8.31:8080/api/universities";
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
}

// Описываем тип данных, который приходит с бэкенда
// Важно: поля должны совпадать с тем, что ты используешь в компоненте!

// Функция получения данных
export async function getUniversityById(
  id: string
): Promise<University | null> {
  // Твой локальный IP и порт
  const BASE_URL = "http://192.168.8.31:8080";

  try {
    // Выводим лог в терминал (где запущен npm run dev), чтобы видеть, что происходит
    console.log(
      `📡 Запрос данных для ID: ${id} по адресу ${BASE_URL}/api/universities/${id}`
    );

    const res = await fetch(`${BASE_URL}/api/universities/${id}`, {
      // 'no-store' означает, что Next.js не будет кэшировать запрос.
      // Это важно при разработке, чтобы видеть свежие данные.
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`❌ Ошибка запроса: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    console.log("✅ Данные получены успешно");

    return data;
  } catch (error) {
    console.error("🔥 Ошибка сети или парсинга:", error);
    return null;
  }
}
