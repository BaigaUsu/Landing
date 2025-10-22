"use client";

import { StaffId, StaffList } from "@/share/types/staffTypes";
import useDashboard from "../hooks/useDashboard";

type Mode = "worker" | "manager" | "admin";

interface StaffDashboardProps {
  mode: Mode;
  workerId?: number; // нужен, если заходит конкретный сотрудник
}

export const DetailDashboard = ({ mode, workerId }: StaffDashboardProps) => {
  const { isLoading, error, staffList } = useDashboard({ mode, workerId });

  if (isLoading) return <div className="p-6">Загрузка...</div>;
  if (error) return <div className="p-6 text-red-600">Ошибка при загрузке данных</div>;
  if (!staffList.length) return <div className="p-6 text-gray-500">Нет данных</div>;

  return (
    <div className="p-6 space-y-8">
      {staffList.map((person: StaffId) => (
        <div
          key={person.id}
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Основная информация */}
          <h2 className="text-2xl font-bold mb-4">
            {person.name} {person.surname}
          </h2>
          <p className="text-sm text-gray-600 mb-2">Email: {person.email}</p>
          <p className="mb-1">
            <strong>Специализации:</strong>{" "}
            {person.specializations.map((s) => s.specialization).join(", ") || "—"}
          </p>
          <p className="mb-1">
            <strong>Активен:</strong> {person.is_active ? "Да" : "Нет"}
          </p>
          {mode === "admin" && (
            <p className="mb-2">
              <strong>Суперпользователь:</strong> {person.is_superuser ? "Да" : "Нет"}
            </p>
          )}
          <p className="text-sm text-gray-400 mb-2">
            Создан: {new Date(person.created_at).toLocaleString()} | Обновлен:{" "}
            {new Date(person.updated_at).toLocaleString()}
          </p>

          {/* Проекты */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Проекты:</h3>
            {person.projects.length ? (
              <ul className="list-disc list-inside space-y-1">
                {person.projects.map((p) => (
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
            {person.stages.length ? (
              <ul className="list-disc list-inside space-y-1">
                {person.stages.map((s) => (
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
            {person.tasks.length ? (
              <ul className="list-disc list-inside space-y-1">
                {person.tasks.map((t) => (
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
      ))}
    </div>
  );
};