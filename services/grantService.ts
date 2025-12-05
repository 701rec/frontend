import { API_URL } from "@/lib/config";
import { GrantChanceResult, GrantCalculationRequest } from "@/types/grant";

/**
 * Отправляет данные на бэкенд для расчета шанса на образовательный грант.
 * @param data - Балл ЕНТ и желаемая специальность.
 * @returns {Promise<GrantChanceResult | null>} - Результат расчета или null в случае ошибки.
 */
export async function calculateGrantChance(
  data: GrantCalculationRequest
): Promise<GrantChanceResult | null> {
  console.log(API_URL);
  const endpoint = `${API_URL}/ai/grant`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `❌ Ошибка запроса на расчет гранта (${
          response.status
        }): ${await response.text()}`
      );
      return null;
    }

    const result: GrantChanceResult = await response.json();
    return result;
  } catch (error) {
    console.error(
      `🔥 Ошибка сети/парсинга при расчете гранта (URL: ${endpoint}):`,
      error
    );
    return null;
  }
}
