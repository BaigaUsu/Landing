// app/api/accounts/staff/worker-labels/route.ts

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        // Получаем параметр специализации, который прислал RTK Query
        const specialization = searchParams.get("specialization");
        const token = req.headers.get("Authorization") || "";
      
        // Собираем URL. Важно: убедитесь, что в конце /api/v1 (если это нужно)
        // и проверьте наличие слеша перед параметрами
        const backendUrl = `${process.env.API_URL}/accounts/staff/worker-labels/?specialization=${specialization || ""}`;
        
        console.log("Запрос уходит на:", backendUrl); // Проверьте это в терминале!

        const res = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            // Если бэкенд вернул ошибку (например 401 или 404)
            const errorData = await res.json().catch(() => ({}));
            return Response.json(errorData, { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);

    } catch (error) {
        console.error("Proxy error:", error);
        return new Response("Ошибка на стороне прокси-сервера", { status: 500 });
    }
}