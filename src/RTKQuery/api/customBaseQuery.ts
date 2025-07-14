// lib/customBaseQuery.ts
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchLib } from "@/lib/http/fetchLib"; // твой кастомный fetch

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api) => {
	try {
		const dispatch = api.dispatch;

		let url = '';
		let options = {};

		if (typeof args === "string") {
			url = `/api${args.startsWith('/') ? args : '/' + args}`;
		} else {
			url = `/api${args.url.startsWith('/') ? args.url : '/' + args.url}`;
			options = { ...args };
		}

		const data = await fetchLib(url, options, dispatch);
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