import { NextRequest } from "next/server";

export async function DELETE( req: NextRequest, { params }: { params: { id: string; kind: string; stageId: string; subStageId: string } }) {
    try {
      const { id, kind, stageId, subStageId } = params;
  
      const res = await fetch(
        `${process.env.API_URL}/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/`,
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