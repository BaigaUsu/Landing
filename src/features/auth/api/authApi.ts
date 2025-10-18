// api/authApi.ts
import { rootApi } from "@/RTKQuery/api/rootApi";
import { AuthRequest, TokenResponse } from "../types/authTypes";
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "@/share/utils/tokenStorage";

export const authApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        login: build.mutation<TokenResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/accounts/auth/token/",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
                try {
                    const { data } = await queryFulfilled;
                    setAccessToken(data.access);
                    setRefreshToken(data.refresh);
                } catch (err) {
                    console.error("Login failed:", err);
                }
            },
        }),

        // register: build.mutation<TokenResponse, AuthRequest>({
        //   query: (data) => ({
        //     url: "/auth/register/",
        //     method: "POST",
        //     body: data,
        //   })
        // }),

        logout: build.mutation<{ message: string }, void>({
            async queryFn(_, __, ___, fetchWithBQ) {
                const access = getAccessToken();
                const refresh = getRefreshToken();

                if (!access || !refresh) {
                    return { error: { status: 401, data: "Tokens not found" } };
                }

                try {
                    const response = await fetchWithBQ({
                        url: "/auth/logout/",
                        method: "POST",
                        body: { refresh },
                    });

                    if (response.error) {
                        return { error: response.error };
                    }

                    clearTokens();
                    return { data: { message: "Logout successful" } };
                } catch (error: any) {
                    return {
                        error: {
                        status: "FETCH_ERROR",
                        error: error.message || "Unknown fetch error",
                        },
                    };
                }
            },
        })
    }),
});

export const {
    useLoginMutation,
    //   useRegisterMutation,
    useLogoutMutation,
} = authApi;
