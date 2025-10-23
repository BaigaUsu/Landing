"use client";

import useDashboard from "../hooks/useDashboard";
import { useState } from "react";
import { DashboardEditForm } from "../form/edit/components/DashboardEditForm";

type Mode = "worker" | "manager" | "admin";
interface StaffDashboardProps {
    mode: Mode;
    workerId?: number;
    onDelete?: () => void;
}

export const DetailDashboard = ({ mode, workerId, onDelete }: StaffDashboardProps) => {
    const { isLoading, error, staff, handleDelete, isDeleting } = useDashboard({ mode, workerId, onDelete });
    const [showEdit, setShowEdit] = useState(false);

    if (isLoading) return <div className="p-6">Загрузка...</div>;
    if (error) return <div className="p-6 text-red-600">Ошибка при загрузке данных</div>;
    if (!staff) return <div className="p-6 text-gray-500">Нет данных</div>;

    return (
        <div className="p-6 space-y-8">
            {!showEdit ? (
                <div
                    key={staff.id}
                    className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                    <button
                        onClick={() => setShowEdit(true)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                        ✏️ Редактировать
                    </button>
                    {(mode === "admin" || mode === "manager") && (
                        <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        🗑️ Удалить
                    </button>
                    )}
                    
                    {/* Основная информация */}
                    <p className="text-sm text-gray-400 mb-2">
                        Создан: {new Date(staff.created_at).toLocaleString()} | Обновлен:{" "}
                        {new Date(staff.updated_at).toLocaleString()}
                    </p>
                    <h2 className="text-2xl font-bold mb-4">
                        {staff.name} {staff.surname}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">Email: {staff.email}</p>
                    <p className="text-sm text-gray-600 mb-2">Номер телефона: {staff.phone_number}</p>
                    <p className="mb-1">
                        <strong>Специализации:</strong>{" "}
                        {staff.specializations.map((s) => s.specialization).join(", ") || "—"}
                    </p>
                    <p className="mb-1">
                        <strong>Активен:</strong> {staff.is_active ? "Да" : "Нет"}
                    </p>
                    {mode === "admin" && (
                        <p className="mb-2">
                            <strong>Суперпользователь:</strong> {staff.is_superuser ? "Да" : "Нет"}
                        </p>
                    )}
                    
                    {/* Проекты */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Проекты:</h3>
                        {staff.projects.length ? (
                            <ul className="list-disc list-inside space-y-1">
                                {staff.projects.map((p) => (
                                    <li key={p.id}>
                                        {p.project_name} — <span className="text-gray-600">{p.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Нет проектов</p>
                        )}
                    </div>

                    {/* Этапы */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Этапы:</h3>
                        {staff.stages.length ? (
                            <ul className="list-disc list-inside space-y-1">
                                {staff.stages.map((s) => (
                                    <li key={s.id}>
                                        {s.project_name} ({s.specialization}) —{" "}
                                        <span className="text-gray-600">{s.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Нет этапов</p>
                        )}
                    </div>

                    {/* Задачи */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Задачи:</h3>
                        {staff.tasks.length ? (
                            <ul className="list-disc list-inside space-y-1">
                                {staff.tasks.map((t) => (
                                    <li key={t.id}>
                                        {t.action} — {t.status} ({t.action_date} {t.action_time})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Нет задач</p>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
                    >
                        ❌ Отмена
                    </button>
    
                    <DashboardEditForm
                        staff={staff}
                        currentRole={mode}
                        onSuccess = {() => setShowEdit(false)}    
                    />
                </>
            )}
        </div>
    );
};