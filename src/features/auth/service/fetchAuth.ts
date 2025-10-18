import { AppDispatch } from "@/redux/store";
import { handleAuthError } from "@/features/auth/token/handleAuthError";
import { fetchLib } from "@/lib/http/fetchLib";
import { ExtendedFetchOptions } from "@/lib/http/types/fetchTypes";
import { attachAuthHeader } from "../token/attachAuthHeader";

export const fetchWithAuth = async <T>(
    url: string,
    options: ExtendedFetchOptions & { skipAuth?: boolean },
    dispatch?: AppDispatch
): Promise<T> => {
    const { skipAuth = false, ...fetchOptions } = options;

    const requestOptions = skipAuth
        ? fetchOptions
        : attachAuthHeader(fetchOptions);

    try {
        return await fetchLib<T>(url, requestOptions);
    } catch (error: any) {
        const shouldRetry = await handleAuthError(error, skipAuth, 1, dispatch!, {});
        if (shouldRetry) {
            return await fetchLib<T>(url, requestOptions);
        }
        throw error;
    }
};