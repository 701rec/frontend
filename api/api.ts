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

// ✅ НОВАЯ ФУНКЦИЯ: Получение одного университета по ID
export async function getUniversityById(
  id: string
): Promise<University | null> {
  const API_URL = `http://192.168.8.31:8080/api/universities/${id}`;

  try {
    const response = await fetch(API_URL, {
      // Используем cache: 'no-store' для свежих данных или 'force-cache' для статических
      cache: "no-store",
    });

    if (response.status === 404) {
      return null; // Университет не найден
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: University = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching university with ID ${id}:`, error);
    return null;
  }
}
