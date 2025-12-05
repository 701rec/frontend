import { API_URL } from "@/lib/config";
import { UserProfile } from "@/types/user";

export async function getUserProfile(
  userId: number | string
): Promise<UserProfile> {
  const endpoint = `${API_URL}/users/${userId}/profile`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`User API Error: ${response.status}`);
    }

    const data: UserProfile = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error);
    throw error;
  }
}
