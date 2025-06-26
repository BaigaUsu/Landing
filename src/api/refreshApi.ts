export async function refreshApi(refreshToken: string) {
	return await fetch("https://yoba.serveo.net/api/v1/auth/token-refresh/", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({refresh: refreshToken})
	})
}