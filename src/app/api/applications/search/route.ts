export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
  
    const res = await fetch(`${process.env.API_URL}/applications/search/?query=${query || ""}`);
    const data = await res.json();
  
    return Response.json(data);
  }