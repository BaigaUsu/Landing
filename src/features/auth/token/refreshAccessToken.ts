import { setAccessToken, setRefreshToken, clearTokens, getRefreshToken } from "@/share/utils/tokenStorage";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutAction } from "@/features/auth/service/authSlice";
import { refreshApi } from "@/features/auth/api/refreshApi";

export const refreshAccessToken = async (dispatch: AppDispatch, getState: () => RootState): Promise<string | null> => {
	const state = getState();
    if (!state.auth.isAuthenticated) return null;

    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;
	
	if (!refreshToken) {
		console.warn("⚠️ Refresh token отсутствует в localStorage.");
		return null;
	}
		
	console.log("🔄 Попытка обновления access токена...");
	
	try {
		const response = await refreshApi(refreshToken);
	
		if (!response.ok) {
			const errorText = await response.text();
			console.error(`❌ Ошибка при обновлении токена: [${response.status}] ${errorText}`);
			throw new Error("Failed to refresh token");
		}
		
		const data = await response.json();
		
		setAccessToken(data.access);
		console.log("✅ Access token успешно обновлён.");
		console.log("🔐 Новый access token:", data.access);
				
		if (data.refresh) {
			setRefreshToken(data.refresh);
			console.log("🔄 Refresh token тоже был обновлён.");
		}
		
		return data.access;
	} catch (error) {
		console.error("🔥 Ошибка при попытке обновления токена:", error);
		clearTokens();
		dispatch(logoutAction());
		console.log("🚪 Выполнен выход пользователя. Перенаправление на /login...");
		// window.location.href = "/login";
		return null;
	}
};