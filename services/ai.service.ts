import { API_URL, STATIC_USER_ID } from "@/lib/config";
import { GenerateAIPrompt, GenerateAIResponse } from "@/types/ai";

export async function generateAIResponse(prompt: string): Promise<string> {
  const endpoint = `${API_URL}/ai/generate`;

  const payload: GenerateAIPrompt = {
    userId: STATIC_USER_ID,
    prompt: prompt,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `AI API Error: ${response.status} ${response.statusText}`
      );
    }

    const data: GenerateAIResponse = await response.json();

    if (!data.result) {
      throw new Error("Поле 'result' отсутствует в ответе AI.");
    }

    return data.result;
  } catch (error) {
    console.error("Ошибка при генерации AI ответа:", error);
    throw error;
  }
}
