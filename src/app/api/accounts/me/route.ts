import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const token = req.headers.get("Authorization"); // или из cookie
    const res = await fetch(`${process.env.API_URL}/accounts/me/`, {
        headers: {
            "Authorization": token || "",
        },
    });
    const data = await res.json();
    return NextResponse.json(data);
  }