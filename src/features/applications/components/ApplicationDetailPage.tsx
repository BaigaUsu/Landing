'use client';

import { useGetApplicationByIdQuery } from "@/features/applications/api/appApi";
import { useEffect, useState } from "react";
import { ApplicationTasks } from "./ApplicationTasks"; // Убедитесь, что путь верный
import { ApplicationStatusSelect } from "./ApplicationStatusSelect";

type Props = {
    id: number | null;
};

export default function ApplicationDetailPage({ id }: Props) {
    const { data, isLoading, error, refetch } = useGetApplicationByIdQuery(id!, {
        skip: !id,
    });
    // Этот хук нужен, чтобы перезапросить данные при смене выбранной заявки
    useEffect(() => {
        if (id) {
        refetch();
        }
    }, [id, refetch]);

    if (!id) return <p className="text-gray-500 italic">Выберите заявку</p>;
    if (isLoading) return <p>Загрузка данных...</p>;
    if (error || !data) return <p>Ошибка загрузки заявки</p>;

    return (
        <div className="p-4">
            {/* --- Основная информация о заявке --- */}
            <h1 className="text-2xl font-bold mb-4">Заявка #{data.id}</h1>
            <div className="space-y-1 mb-4">
                <p><strong>Имя:</strong> {data.name}</p>
                <p><strong>Фамилия:</strong> {data.surname}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Телефон:</strong> {data.phone_number}</p>
                <p><strong>Проект:</strong> {data.project?.project_name ?? "Нет проекта"}</p>
            </div>
            <div className="text-sm text-gray-500 mb-6">
                <p><strong>Создан:</strong> {new Date(data.created_at).toLocaleString()}</p>
                <p><strong>Обновлён:</strong> {new Date(data.updated_at).toLocaleString()}</p>
            </div>

            <hr className="my-6" />

            <ApplicationStatusSelect
                applicationId={data.id}
                currentStatus={data.status}
                onStatusUpdate={refetch}
            />
            {data.status === 'verified-positive' ? (
                <ApplicationTasks
                    application={data}
                    tasks={data.tasks}
                    applicationId={data.id}
                    applicationLabel={data.email}
                    onTaskCreate={refetch}
                    currentStatus={data.status}
                />
            ) : null}
            
        </div>
    );
}