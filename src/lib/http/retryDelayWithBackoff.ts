import { sleep } from "@/share/utils/sleep";

export async function retryDelayWithBackoff(attempt: number, baseDelay: number, maxDelay: number) {
	const delay = Math.min(baseDelay * 2 ** (attempt - 1), maxDelay);
	console.warn(`⚠️ Попытка ${attempt} не удалась. Повтор через ${delay} мс...`);
	await sleep(delay);
}