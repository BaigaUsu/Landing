import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string, kind: string, stageId: string }> }
) {
  try {
    const { id, kind, stageId } = await params;

    const res = await fetch(`${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/`);
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

export async function PUT( 
    req: NextRequest, 
    { params }: { params: Promise<{ id: string, kind: string, stageId: string }> }
) {
    try {
      const { id, kind, stageId } = await params;
      const body = await req.json();
  
      const res = await fetch(`${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Ошибка от backend:", errorText);
        return new Response(errorText || "Ошибка на стороне сервера", {
          status: res.status,
        });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (error: any) {
      console.error("Ошибка proxy PUT:", error.message);
      return new Response("Ошибка при запросе к backend", { status: 500 });
    }
  }

  export async function DELETE( 
    _req: NextRequest, 
    { params }: { params: Promise<{ id: string; kind: string; stageId: string }> }
) {
    try {
      const { id, kind, stageId } = await params;
  
      const res = await fetch(
        `${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/`,
        {
          method: "DELETE",
        }
      );
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Ошибка от backend (DELETE):", errorText);
        return new Response(errorText || "Ошибка при удалении", {
          status: res.status,
        });
      }
  
      // Некоторые API возвращают пустой ответ, поэтому не всегда можно делать res.json()
      const text = await res.text();
      return new Response(text || "Stage deleted successfully", { status: 200 });
    } catch (error: any) {
      console.error("Ошибка proxy DELETE:", error.message);
      return new Response("Ошибка при удалении на backend", { status: 500 });
    }
  }