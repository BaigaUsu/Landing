import { getAccessToken } from "../../../share/utils/tokenStorage";

export const attachAuthHeader = (options: RequestInit = {}): RequestInit => {
	const token = getAccessToken();
	if (!token) return options;
    console.log("Attach token:", getAccessToken());
	
	return {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${token}`,
		},
	};
};