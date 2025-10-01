import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; kind: string; stageId: string; subStageId: string; category: string } }
) {
  try {
    const { id, kind, stageId, subStageId, category } = params;

    const res = await fetch(`${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/files/${category}/`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка от backend:", errorText);
      return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("Ошибка proxy GET:", error.message);
    return new Response("Ошибка при запросе к backend", { status: 500 });
  }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string; kind: string; stageId: string; subStageId: string; category: string } }
  ) {
    try {
      const { id, kind, stageId, subStageId, category } = params;

      const formData = await req.formData();
  
      const res = await fetch(`${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/files/${category}/`, {
        method: "POST",
        body: formData,
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