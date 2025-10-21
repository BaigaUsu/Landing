"use client";

import { useGetAdminStaffQuery } from "@/share/api/adminStaffApi";
import { useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { useGetWorkerStaffByIdQuery } from "@/share/api/workerStaffApi";
import { StaffId, StaffList } from "@/share/types/staffTypes";
import { useMemo } from "react";

type Mode = "worker" | "manager" | "admin";

interface StaffDashboardProps {
  mode: Mode;
  workerId?: number; // нужен, если заходит конкретный сотрудник
}

export const StaffDashboard = ({ mode, workerId }: StaffDashboardProps) => {
  // --- получаем данные ---
  const {
    data: adminData,
    isLoading: adminLoading,
    error: adminError,
  } = useGetAdminStaffQuery(undefined, { skip: mode !== "admin" });

  const {
    data: managerData,
    isLoading: managerLoading,
    error: managerError,
  } = useGetManagerStaffQuery(undefined, { skip: mode !== "manager" });

  const {
    data: workerData,
    isLoading: workerLoading,
    error: workerError,
  } = useGetWorkerStaffByIdQuery(workerId!, { skip: mode !== "worker" });

  // --- вычисляем общее состояние ---
  const isLoading = adminLoading || managerLoading || workerLoading;
  const error = adminError || managerError || workerError;

  const staffList = useMemo(() => {
    if (mode === "admin" && adminData) return adminData.results;
    if (mode === "manager" && managerData) return managerData.results;
    if (mode === "worker" && workerData) return [workerData];
    return [];
  }, [mode, adminData, managerData, workerData]);

  // --- рендер ---
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;
  if (!staffList.length) return <div>Нет данных</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "admin"
          ? "Панель администратора"
          : mode === "manager"
          ? "Панель менеджера"
          : "Профиль сотрудника"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((person) => (
          <StaffCard key={person.id} person={person} mode={mode} />
        ))}
      </div>
    </div>
  );
};

// --- Компонент карточки ---
interface StaffCardProps {
  person: StaffList | StaffId;
  mode: Mode;
}

const StaffCard = ({ person, mode }: StaffCardProps) => {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-1">
        {person.name} {person.surname}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{person.email}</p>

      <p className="mb-1">
        <strong>Специализация:</strong>{" "}
        {person.specialization?.map((s) => s.specialization).join(", ")}
      </p>

      {mode !== "worker" && (
        <p>
          <strong>Активен:</strong> {person.is_active ? "Да" : "Нет"}
        </p>
      )}

      {mode === "admin" && (
        <p>
          <strong>Суперпользователь:</strong>{" "}
          {person.is_superuser ? "Да" : "Нет"}
        </p>
      )}
    </div>
  );
};