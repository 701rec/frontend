import { API_URL } from "@/lib/config";
import { University } from "@/types/university";

export async function getUniversities(): Promise<University[]> {
  const endpoint = `${API_URL}/universities`;

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
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

export async function getUniversityById(
  id: string
): Promise<University | null> {
  const endpoint = `${API_URL}/universities/${id}`;

  try {
    console.log(`📡 Запрос университета: ${endpoint}`);

    const response = await fetch(endpoint, {
      cache: "no-store",
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
