import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; category: string; fileId: string } }
) {
  try {
    const { id, category, fileId } = params;

    const res = await fetch(
      `${process.env.API_URL}/projects/${id}/files/${category}/${fileId}/`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка от backend:", errorText);
      return new Response(errorText || "Ошибка на стороне сервера", {
        status: res.status,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.error("Ошибка proxy DELETE:", error.message);
    return new Response("Ошибка при запросе к backend", { status: 500 });
  }
}