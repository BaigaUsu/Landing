import { AppDispatch } from "@/redux/store";
import { refreshAccessToken } from "./token/refreshAccessToken";

export const handleAuthError = async (
	response: Response,
	skipAuth: boolean,
	attempt: number,
	dispatch: AppDispatch,
	context?: { refreshAttempted?: boolean }
): Promise<boolean> => {
	if (response.status === 401 && !context?.refreshAttempted && !skipAuth) {
		if (context) context.refreshAttempted = true;
		const newToken = await refreshAccessToken(dispatch);
		return !!newToken;
	}
	return false;
};