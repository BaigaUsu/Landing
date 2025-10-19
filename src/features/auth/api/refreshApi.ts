export async function refreshApi(refreshToken: string) {
    console.log('refresh:', refreshToken);
	return await fetch("http://95.179.247.253:9000/api/v1/accounts/auth/token/refresh/", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({refresh: refreshToken})
	})
}