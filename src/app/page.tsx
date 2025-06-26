'use client';

import { useGetApplicationQuery } from "@/api/appApi";
import Link from "next/link";


export default function Home() {
  const { data, error, isLoading } = useGetApplicationQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных</p>;

  return (
    <>
      <div className="p-8">
        {Array.isArray(data) ? (
          data.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded">
              <p><strong>Имя:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Телефон:</strong> {item.phone_number}</p>
              <p><strong>Статус:</strong> {item.status}</p>
              <p><strong>Создан:</strong> {new Date(item.created_at).toLocaleString()}</p>
              <p><strong>Обновлён:</strong> {new Date(item.updated_at).toLocaleString()}</p>
              <Link href={`/${item.id}`}>
                Перейти к заявке
              </Link>
            </div>
          ))
        ) : (
          <p>Нет данных</p>
        )}
      </div>
    </>
  );
}