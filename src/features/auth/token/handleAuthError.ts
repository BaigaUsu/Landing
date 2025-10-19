import { AppDispatch } from "@/redux/store";
import { refreshAccessToken } from "./refreshAccessToken";

export const handleAuthError = async (
	error: any,
	skipAuth: boolean,
	attempt: number,
	dispatch: AppDispatch,
	context?: { refreshAttempted?: boolean }
): Promise<boolean> => {
	if (error.status === 401 && !context?.refreshAttempted && !skipAuth) {
		if (context) context.refreshAttempted = true;
		const newToken = await refreshAccessToken(dispatch);
		return !!newToken;
	}
	return false;
};