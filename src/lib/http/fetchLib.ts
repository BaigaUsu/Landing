import { AppDispatch } from "@/redux/store";
import { ExtendedFetchOptions } from "@/lib/http/types/fetchTypes";
import { prepareRequestBodyAndHeaders } from "./prepareRequestBodyAndHeaders";
import { handleResponse } from "./handleResponse";
import { retryDelayWithBackoff } from "./retryDelayWithBackoff";

export const fetchLib = async <T = unknown>(
	url: string,
	options: ExtendedFetchOptions,
): Promise<T> => {
	const {
		timeout = 5000,
		retries = 3,
		retryDelay = 1000,
		...fetchOptions
	} = options;
  
for (let attempt = 1; attempt <= retries; attempt++) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const baseOptions = { ...fetchOptions, signal: controller.signal };
	  
		const { body, headers } = prepareRequestBodyAndHeaders(
			baseOptions.body,
			baseOptions.headers
		);
		
		baseOptions.body = body;
		baseOptions.headers = headers;
		
		const response = await fetch(url, baseOptions);
			clearTimeout(timeoutId);
		
		if (!response.ok) {
			const errorText = await response.text();
			console.error("❗ Ошибка ответа:", errorText);
			throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
		}
	
		return await handleResponse<T>(response);
		} catch (error) {
			clearTimeout(timeoutId);
		
			if ((error as Error).name === "AbortError") {
				throw new Error("⏱️ Таймаут запроса");
			}
			
			if (attempt < retries) {
				await retryDelayWithBackoff(attempt, retryDelay, timeout);
			} else {
				throw new Error("❌ Максимальное количество попыток исчерпано.");
			}
		}
	}
	throw new Error("Непредвиденная ошибка в fetchLib");
};