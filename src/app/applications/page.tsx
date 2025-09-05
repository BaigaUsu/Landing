// components/Applications/ApplicationList.tsx
'use client';

import { useState } from "react";
import { useGetApplicationsQuery } from "@/features/applications/api/appApi";
import ApplicationDetailPage from "@/features/applications/components/ApplicationDetailPage";

export default function ApplicationMasterDetailPage() {
  const { data: applications, isLoading, error } = useGetApplicationsQuery('actual');
  console.log(applications);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) return <p className="p-4">Загрузка заявок...</p>;
  if (error) return <p className="p-4 text-red-600">Ошибка загрузки заявок</p>;

  return (
    <div className="flex h-screen">
      {/* Список заявок */}
      <div className="w-1/3 border-r overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Заявки</h2>
        {applications?.results?.length ? (
          applications.results.map((item) => (
            <div
              key={item.id}
              className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedId === item.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedId(item.id)}
            >
              <p><strong>{item.name} {item.surname}</strong></p>
              <p className="text-sm text-gray-600">{item.status}</p>
            </div>
          ))
        ) : (
          <p>Нет заявок</p>
        )}
      </div>

      {/* Детали заявки */}
      <div className="w-2/3 p-8 overflow-y-auto">
        <ApplicationDetailPage id={selectedId} />
      </div>
    </div>
  );
}