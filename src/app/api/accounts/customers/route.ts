import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
        const token = req.headers.get("Authorization");
		const res = await fetch(`${process.env.API_URL}/accounts/customers/`, {
            headers: {
                "Authorization": token || "",
            },
        });
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		return new NextResponse("Ошибка при запросе к backend", { status: 500 });
	}
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Получаем тело запроса от клиента
        const token = req.headers.get("Authorization") || "";

        const res = await fetch(`${process.env.API_URL}/accounts/customers/`, {
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