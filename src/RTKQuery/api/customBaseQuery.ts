import { fetchLib } from "@/lib/http/fetchLib";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api) => {

	try {
		const dispatch = api.dispatch;
		
		if (typeof args === "string") {
			// Просто URL, без доп. опций
			const data = await fetchLib(args, {}, dispatch);
			return { data };
		}
	
		const { url, headers, ...rest } = args;
		
		const data = await fetchLib(
			url,
			{
				...rest,
			},
			dispatch
		);
		
		return { data };
	} catch (error) {
		return {
			error: {
				status: "CUSTOM_ERROR",
				message: (error as Error).message,
			},
		};
	}
};