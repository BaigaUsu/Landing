export async function GET(request: Request) {
	try {
		// Извлекаем query параметры из входящего запроса
		const { searchParams } = new URL(request.url);
		
		// Формируем URL для бэкенда с теми же параметрами
		const backendUrl = new URL(`${process.env.API_URL}/applications/`);
		
		// Копируем все query параметры
		searchParams.forEach((value, key) => {
			backendUrl.searchParams.append(key, value);
		});
		
		console.log('Backend URL:', backendUrl.toString());
        const token = request.headers.get("Authorization") || "";
		
		const res = await fetch(backendUrl.toString(), {
            method: "GET",
            headers: {
                "Authorization": token,
            },
        });
		const data = await res.json();
		
		return Response.json(data);
	} catch (error) {
		console.error('API Route error:', error);
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}