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