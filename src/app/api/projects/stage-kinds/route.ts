import { NextRequest } from "next/server";

export async function GET(req: NextRequest,) {
    try {
        const token = req.headers.get("Authorization") || "";

        const res = await fetch(`${process.env.API_URL}/projects/stage-kinds/`, {
            method: "GET",
            headers: {
                "Authorization": token,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка от бэкенда:", errorText);
            return new Response(errorText || "Failed to fetch", { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err: any) {
        console.error("Ошибка в proxy route:", err.message);
        return new Response("Internal server error", { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization") || "";
        // Получаем тело запроса от фронтенда
        const body = await req.json();

        const res = await fetch(`${process.env.API_URL}/projects/stage-kinds/`, {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorData = await res.text();
            console.error("Ошибка бэкенда при POST:", errorData);
            return new Response(errorData || "Failed to create stage kind", { 
                status: res.status 
            });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err: any) {
        console.error("Ошибка в proxy POST route:", err.message);
        return new Response("Internal server error", { status: 500 });
    }
}