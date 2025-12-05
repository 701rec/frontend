export const API_BASE_URL = "http://192.168.8.31:8080";
export const AI_GENERATE_ENDPOINT = "/api/ai/generate";
export const API_URL = `${API_BASE_URL}${AI_GENERATE_ENDPOINT}`;

export const STATIC_USER_ID = 1;

interface GenerateAIResponse {
  result: string;
}

interface GenerateAIPrompt {
  userId: number;
  prompt: string;
}

/**
 * Отправляет запрос к AI-сервису для генерации ответа.
 * @param prompt - Текст запроса от пользователя.
 * @returns Промис, разрешающийся строкой ответа от AI.
 * @throws {Error} Если запрос не удался или ответ API некорректен.
 */
export async function generateAIResponse(prompt: string): Promise<string> {
  const payload: GenerateAIPrompt = {
    userId: STATIC_USER_ID,
    prompt: prompt,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data: GenerateAIResponse = await response.json();

  if (!data.result) {
    throw new Error("Поле 'result' пусто в ответе AI.");
  }

  return data.result;
}
