export async function GET() {
	try {
		const res = await fetch(`${process.env.API_URL}/accounts/staff/designer-labels`);
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		return new Response("Ошибка при запросе к backend", { status: 500 });
	}
}