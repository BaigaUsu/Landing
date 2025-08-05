import { getAccessToken } from "./tokenStorage";

export const attachAuthHeader = (options: RequestInit = {}): RequestInit => {
	const token = getAccessToken();
	if (!token) return options;
	
	return {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${token}`,
		},
	};
};