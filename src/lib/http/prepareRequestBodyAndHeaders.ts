export function prepareRequestBodyAndHeaders(
	body: any,
	headers: HeadersInit = {}
): { body: BodyInit | null; headers: Record<string, string> } {
	const rawHeaders: Record<string, string> =
		headers instanceof Headers
			? Object.fromEntries(headers.entries())
			: Array.isArray(headers)
			? Object.fromEntries(headers)
			: { ...headers };

	const normalizedHeaders = Object.entries(rawHeaders).reduce<Record<string, string>>((acc, [key, value]) => {
		if (value !== undefined) {
			acc[key] = value;
		}
		return acc;
	}, {});
	
	if (
		body &&
		typeof body === "object" &&
		!(body instanceof FormData) &&
		!(body instanceof URLSearchParams)
	) {
		body = JSON.stringify(body);
		if (!normalizedHeaders["Content-Type"]) {
			normalizedHeaders["Content-Type"] = "application/json";
		}
	}
	
	return { body, headers: normalizedHeaders };
}