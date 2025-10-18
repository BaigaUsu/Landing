import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const res = await fetch(`${process.env.API_URL}/accounts/auth/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: data }, { status: res.status });
        }

        // Можно сразу вернуть токены клиенту
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Ошибка при авторизации" }, { status: 500 });
    }
}