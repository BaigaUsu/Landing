import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; kind: string }> }
  ) {
    try {
      const { id, kind } = await params;
      const body = await req.json();
  
      const res = await fetch(`${process.env.API_URL}/projects/${id}/stages/${kind}/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
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
      console.error("Ошибка proxy POST:", error.message);
      return new Response("Ошибка при запросе к backend", { status: 500 });
    }
  }