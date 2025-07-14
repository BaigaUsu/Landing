import { NextRequest } from "next/server";

export async function GET() {
	try {
		const res = await fetch(`${process.env.API_URL}/tasks/`);
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}


export async function POST(req: NextRequest) {
	try {
		const body = await req.json(); // Получаем тело запроса от клиента

		const res = await fetch(`${process.env.API_URL}/tasks/`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json", // ✅ добавь это!
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