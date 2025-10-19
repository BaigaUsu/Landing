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

    const getRequestOptions = () => 
        skipAuth ? fetchOptions : attachAuthHeader(fetchOptions);

    try {
        return await fetchLib<T>(url, getRequestOptions());
    } catch (error: any) {
        if (error.isHttpError && error.response) {
            const shouldRetry = await handleAuthError(
                error.response, 
                skipAuth, 
                1, 
                dispatch!, 
                {}
            );
            
            if (shouldRetry) {
                // Повторяем с новым токеном
                return await fetchLib<T>(url, getRequestOptions());
            }
            
            // Если не 401 или рефреш не помог - выбрасываем понятную ошибку
            // const errorText = await error.response.text();
            // throw new Error(`Ошибка: ${error.response.status} ${errorText}`);
        }
        
        throw error;
    }
};