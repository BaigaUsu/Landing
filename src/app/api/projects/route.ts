import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// Извлекаем query параметры из входящего запроса
		const { searchParams } = new URL(request.url);
		
		// Формируем URL для бэкенда с теми же параметрами
		const backendUrl = new URL(`${process.env.API_URL}/projects/`);
		
		// Копируем все query параметры
		searchParams.forEach((value, key) => {
			backendUrl.searchParams.append(key, value);
		});
		
		console.log('Backend URL:', backendUrl.toString());
        const token = request.headers.get("Authorization") || "";
		
		const res = await fetch(backendUrl.toString(), {
            method: "GET",
            headers: {
                "Authorization": token, // <-- прокидываем токен
            },
        });
		const data = await res.json();
		
		return Response.json(data);
	} catch (error) {
		console.error('API Route error:', error);
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}



export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Получаем тело запроса от клиента
        const token = req.headers.get("Authorization") || "";

        const res = await fetch(`${process.env.API_URL}/projects/`, {
            method: "POST",
            body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json", 
                "Authorization": token,
			},
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка от backend:", errorText);
            return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error: any) {
        console.error("Ошибка proxy POST /applications:", error.message);
        return new Response("Ошибка при запросе к backend", { status: 500 });
    }
}