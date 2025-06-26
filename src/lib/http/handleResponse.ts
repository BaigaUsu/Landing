export async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get("content-type") || "";
	
	if (response.status === 204 || response.status === 205) {
		return {} as T;
	}
	
	if (contentType.includes("application/json")) {
		return await response.json();
	}
	
	return (await response.text()) as any;
}