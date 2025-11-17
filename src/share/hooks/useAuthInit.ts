'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/reduxHooks";
import { logoutAction, setAuthInitialized, setUser } from "@/features/auth/service/authSlice";
import { meApi } from "@/share/api/meApi";
import { getAccessToken } from "@/share/utils/tokenStorage";

export function useAuthInit() {
    const dispatch = useAppDispatch();
    const token = getAccessToken();

    // 2. Запрос выполняется ТОЛЬКО если есть токен
    const { data, error, isLoading, isError, isSuccess } = meApi.useGetCurrentMeQuery(undefined, {
        skip: !token, 
    });

    useEffect(() => {
        // Сценарий 1: Токена нет физически.
        // Мы сразу говорим, что инициализация прошла (пользователь = гость)
        if (!token) {
            dispatch(logoutAction()); // Чистим стейт на случай мусора
            dispatch(setAuthInitialized());
            return;
        }

        // Сценарий 2: Загрузка еще идет — ждем.
        if (isLoading) return;

        // Сценарий 3: Успех.
        if (isSuccess && data) {
            dispatch(setUser(data));
            dispatch(setAuthInitialized());
        } 
        
        // Сценарий 4: Ошибка (токен протух, 401, сеть упала и т.д.).
        // Жестко разлогиниваем и завершаем инициализацию.
        if (isError || error) {
            dispatch(logoutAction());
            dispatch(setAuthInitialized());
        }
        
    }, [token, isLoading, isSuccess, isError, data, error, dispatch]);
}