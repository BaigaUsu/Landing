export async function GET() {
	try {
		const res = await fetch(`${process.env.API_URL}/accounts/clients/`);
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}