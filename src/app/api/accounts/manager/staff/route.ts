import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
        const token = req.headers.get("Authorization");
		const res = await fetch(`${process.env.API_URL}/accounts/manager/staff/`, {
            method: "GET",
            headers: {
                "Authorization": token || "",
            },
        });
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}