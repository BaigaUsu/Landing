export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const token = req.headers.get("Authorization") || "";
  
    const res = await fetch(`${process.env.API_URL}/tasks/search/?query=${query || ""}`, {
        method: "GET",
        headers: {
            "Authorization": token,
        },
    });
    const data = await res.json();
  
    return Response.json(data);
  }