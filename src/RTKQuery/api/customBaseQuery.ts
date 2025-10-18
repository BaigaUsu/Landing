// lib/customBaseQuery.ts
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchWithAuth } from "@/features/auth/service/fetchAuth";

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api) => {
	try {
		const dispatch = api.dispatch;

		let url = '';
		let options = {};

		if (typeof args === "string") {
			url = `/api${args.startsWith('/') ? args : '/' + args}`;
		} else {
			// Формируем базовый URL
			let baseUrl = `/api${args.url.startsWith('/') ? args.url : '/' + args.url}`;
			
			// Обрабатываем параметры запроса
			if (args.params) {
				const searchParams = new URLSearchParams();
				
				// Если params это объект
				if (typeof args.params === 'object') {
					Object.entries(args.params).forEach(([key, value]) => {
						if (value !== undefined && value !== null) {
							searchParams.append(key, String(value));
						}
					});
				}
				
				// Добавляем параметры к URL
				const queryString = searchParams.toString();
				if (queryString) {
					url = `${baseUrl}?${queryString}`;
				} else {
					url = baseUrl;
				}
			} else {
				url = baseUrl;
			}
			
			// Копируем остальные опции, исключая params и url
			const { params, url: _, ...restOptions } = args;
			options = restOptions;
		}

		const data = await fetchWithAuth(url, options, dispatch);
		return { data };
	} catch (error: any) {
		return {
			error: {
				status: "CUSTOM_ERROR",
				data: undefined,
				error: error.message || "Unknown error",
			},
		};
	}
};