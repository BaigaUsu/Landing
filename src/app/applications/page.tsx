'use client';

import { useEffect, useState } from "react";
import { useGetApplicationsQuery } from "@/features/applications/api/appApi";
import ApplicationDetailPage from "@/features/applications/components/ApplicationDetailPage";

const FILTER_OPTIONS = [
    { value: 'actual', label: 'Актуальные' },
    { value: 'all', label: 'Все' },
    { value: 'verified', label: 'Одобренные' },
    { value: 'verified-positive', label: 'Успешные' },
    { value: 'verified-negative', label: 'Неуспешные' },
    { value: 'verified-waiting', label: 'В ожидании' },
] as const;

type StatusFilterValue = typeof FILTER_OPTIONS[number]['value'];

export default function ApplicationMasterDetailPage() {
    const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("actual");
    const { data: applications, isLoading, error } = useGetApplicationsQuery(statusFilter);
    console.log(applications);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        setSelectedId(null);
    }, [statusFilter]);

    if (isLoading) return <p className="p-4">Загрузка заявок...</p>;
    if (error) return <p className="p-4 text-red-600">Ошибка загрузки заявок</p>;

    return (
        <div className="flex h-screen">
            {/* Список заявок */}
            <div className="w-1/3 border-r overflow-y-auto p-4">
                <h2 className="text-lg font-semibold mb-4">Заявки</h2>

                {/* Селект фильтра — по умолчанию "actual" */}
                <div className="mb-4">
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                        setStatusFilter(e.target.value as typeof statusFilter)
                        }
                        className="border px-2 py-1 rounded w-full"
                    >
                        {/* 3. Динамический рендеринг опций */}
                        {FILTER_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

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

            <div className="w-2/3 p-8 overflow-y-auto">
                <ApplicationDetailPage id={selectedId} />
            </div>
        </div>
    );
}