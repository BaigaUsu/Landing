import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const rootApi = createApi({
	reducerPath: "api",
	baseQuery: customBaseQuery,
	tagTypes: ['Tasks', 'Projects', 'Clients'],
	endpoints: () => ({}),
});