import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const token = req.headers.get("Authorization");

        const res = await fetch(`${process.env.API_URL}/accounts/staff/worker/${id}/`, {
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