import { AppDispatch, RootState } from "@/redux/store";
import { handleAuthError } from "@/features/auth/token/handleAuthError";
import { fetchLib } from "@/lib/http/fetchLib";
import { ExtendedFetchOptions } from "@/lib/http/types/fetchTypes";
import { attachAuthHeader } from "../token/attachAuthHeader";

export const fetchWithAuth = async <T>(
    url: string,
    options: ExtendedFetchOptions & { skipAuth?: boolean },
    dispatch: AppDispatch,
    getState: () => RootState,
): Promise<T> => {
    const { skipAuth = false, ...fetchOptions } = options;

    const getRequestOptions = () => 
        skipAuth ? fetchOptions : attachAuthHeader(fetchOptions);

    try {
        return await fetchLib<T>(url, getRequestOptions());
    } catch (error: any) {
        if (error.isHttpError && error.response) {
            const status = error.response.status;
            
            // ✅ Пробуем рефреш только для 401
            if (status === 401 && !skipAuth) {
                const shouldRetry = await handleAuthError(
                    error.response, 
                    skipAuth, 
                    1, 
                    dispatch!, 
                    getState 
                );
                
                if (shouldRetry) {
                    // ✅ Рефреш успешен - повторяем запрос БЕЗ логирования
                    try {
                        return await fetchLib<T>(url, { 
                            ...getRequestOptions(), 
                            silentErrors: true 
                        });
                    } catch (retryError: any) {
                        // ✅ Если второй запрос тоже упал - ТЕПЕРЬ логируем
                        if (retryError.isHttpError && retryError.response) {
                            const errorText = await retryError.response.text();
                            console.error("❗ Ошибка после рефреша:", errorText);
                            throw new Error(`Ошибка: ${retryError.response.status} ${errorText}`);
                        }
                        throw retryError;
                    }
                }
                
                // ✅ Рефреш не помог - логируем 401
                const errorText = await error.response.text();
                console.error("❗ Ошибка авторизации (рефреш не помог):", errorText);
                throw new Error(`Ошибка: ${status} ${errorText}`);
            }
            
            // Если не 401 или рефреш не помог - выбрасываем понятную ошибку
            const errorText = await error.response.text();
            throw new Error(`Ошибка: ${error.response.status} ${errorText}`);
        }
        
        throw error;
    }
};