import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await fetch(`${process.env.API_URL}/tasks/${id}/`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка от бекенда:", errorText);
      return new Response(errorText || "Failed to fetch", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err: any) {
    console.error("Ошибка в proxy route:", err.message);
    return new Response("Internal server error", { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const res = await fetch(`${process.env.API_URL}/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Ошибка proxy PUT /tasks/:id:", err.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const res = await fetch(`${process.env.API_URL}/tasks/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка PATCH:", errorText);
      return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err: any) {
    console.error("Ошибка proxy PATCH /tasks/:id:", err.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await fetch(`${process.env.API_URL}/tasks/${id}/`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка DELETE:", errorText);
      return new Response(errorText || "Ошибка на стороне сервера", { status: res.status });
    }

    return new Response(null, { status: 204 }); // No content
  } catch (err: any) {
    console.error("Ошибка proxy DELETE /tasks/:id:", err.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}