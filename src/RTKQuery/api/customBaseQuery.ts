import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchWithAuth } from "@/features/auth/service/fetchAuth";
import { RootState } from "@/redux/store";

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api) => {
	try {
		const { dispatch } = api;
		const getState = api.getState as () => RootState;

		let url = "";
		let options = {};

		if (typeof args === "string") {
			url = `/api${args.startsWith("/") ? args : "/" + args}`;
		} else {
			let baseUrl = `/api${args.url.startsWith("/") ? args.url : "/" + args.url}`;

			if (args.params) {
				const searchParams = new URLSearchParams();
				if (typeof args.params === "object") {
					Object.entries(args.params).forEach(([key, value]) => {
						if (value !== undefined && value !== null) {
							searchParams.append(key, String(value));
						}
					});
				}

				const queryString = searchParams.toString();
				url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
			} else {
				url = baseUrl;
			}

			const { params, url: _, ...restOptions } = args;
			options = restOptions;
		}

		const data = await fetchWithAuth(url, options, dispatch, getState);
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