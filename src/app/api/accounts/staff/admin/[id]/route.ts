import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const token = req.headers.get("Authorization");

        const res = await fetch(`${process.env.API_URL}/accounts/staff/admin/${id}/`, {
            method: "GET",
            headers: {
                "Authorization": token || "",
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return new Response(errorText || "Failed to fetch", { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err: any) {
        return new Response("Internal server error", { status: 500 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const token = req.headers.get("Authorization") || "";

        const res = await fetch(`${process.env.API_URL}/accounts/staff/admin/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка PUT:", errorText);
            return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err: any) {
        console.error("Ошибка proxy PUT /projects/:id:", err.message);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const token = _req.headers.get("Authorization") || "";
        const res = await fetch(`${process.env.API_URL}/accounts/staff/admin/${id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": token,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка DELETE:", errorText);
            return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
        }

        return new Response(null, { status: 204 }); // No content
    } catch (err: any) {
        console.error("Ошибка proxy DELETE /projects/:id:", err.message);
        return new Response("Internal Server Error", { status: 500 });
    }
}