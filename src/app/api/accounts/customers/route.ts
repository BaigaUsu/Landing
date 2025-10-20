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