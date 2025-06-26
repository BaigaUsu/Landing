import { AppDispatch } from "@/redux/store";
import { attachAuthHeader } from "@/services/auth/token/attachAuthHeader";
import { ExtendedFetchOptions } from "@/types/fetchTypes";
import { prepareRequestBodyAndHeaders } from "./prepareRequestBodyAndHeaders";
import { handleAuthError } from "@/services/auth/handleAuthError";
import { handleResponse } from "./handleResponse";
import { retryDelayWithBackoff } from "./retryDelayWithBackoff";

export const fetchLib = async <T = unknown>(
	url: string,
	options: ExtendedFetchOptions,
	dispatch?: AppDispatch
): Promise<T> => {
	const {
		timeout = 5000,
		retries = 3,
		retryDelay = 1000,
		skipAuth = false,
		...fetchOptions
	} = options;
  
for (let attempt = 1; attempt <= retries; attempt++) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const baseOptions = { ...fetchOptions, signal: controller.signal };
		const requestOptions = skipAuth ? baseOptions : attachAuthHeader(baseOptions);
	  
		const { body, headers } = prepareRequestBodyAndHeaders(
			requestOptions.body,
			requestOptions.headers
		);
		
		requestOptions.body = body;
		requestOptions.headers = headers;
		
		const response = await fetch(url, requestOptions);
			clearTimeout(timeoutId);
		
		if (!response.ok) {
			const errorText = await response.text();
			console.error("❗ Ошибка ответа:", errorText);
			
			const shouldRetry = await handleAuthError(response, skipAuth, attempt, dispatch!, {});
			if (shouldRetry) continue;
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