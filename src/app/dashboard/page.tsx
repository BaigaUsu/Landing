'use client';

import { useEffect, useRef, useState } from "react";
import { meApi } from "@/share/api/meApi";
import { useGetAdminStaffQuery } from "@/share/api/adminStaffApi";
import { useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { DetailDashboard } from "@/features/dashboard/components/DetailDashboard";

type Mode = "worker" | "manager" | "admin";

interface StaffItem {
  id: number;
  name: string;
  surname: string;
}

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const detailPaneRef = useRef<HTMLDivElement>(null);

  const { data: currentMe, isLoading: isLoadingMe } = meApi.useGetCurrentMeQuery();

  // Получаем список сотрудников в зависимости от роли
  const { data: adminStaff, isLoading: isLoadingAdmin } = useGetAdminStaffQuery(undefined, { skip: mode !== "admin" });
  const { data: managerStaff, isLoading: isLoadingManager } = useGetManagerStaffQuery(undefined, { skip: mode !== "manager" });

  // Определяем роль
  function getModeFromMe(me: { specializations: { specialization: string }[] }): Mode {
    if (!me.specializations || me.specializations.length === 0) return "admin";
    if (me.specializations.some(s => s.specialization === "manager")) return "manager";
    return "worker";
  }

  useEffect(() => {
    if (currentMe) {
      const detectedMode = getModeFromMe(currentMe);
      setMode(detectedMode);

      // По умолчанию выделяем первого в списке
      if (detectedMode === "admin" && adminStaff?.results.length) setSelectedId(adminStaff?.results?.[0].id);
      else if (detectedMode === "manager" && managerStaff?.results.length) setSelectedId(managerStaff?.results?.[0].id);
      else setSelectedId(currentMe.id);
    }
  }, [currentMe, adminStaff, managerStaff]);

  useEffect(() => {
    if (detailPaneRef.current) detailPaneRef.current.scrollTop = 0;
  }, [selectedId]);

  if (isLoadingMe || (mode === "admin" && isLoadingAdmin) || (mode === "manager" && isLoadingManager))
    return <p className="p-4">Загрузка данных...</p>;

  if (!mode || !currentMe) return <p className="p-4 text-gray-500">Определение роли...</p>;

  // Формируем список сотрудников для sidebar
  let staffList: StaffItem[] = [];
  if (mode === "admin" && adminStaff) staffList = adminStaff.results.map((s) => ({ id: s.id, name: s.name, surname: s.surname }));
  else if (mode === "manager" && managerStaff) staffList = managerStaff.results.map((s) => ({ id: s.id, name: s.name, surname: s.surname }));
  else staffList = [{ id: currentMe.id, name: currentMe.name, surname: currentMe.surname }]; // worker

  return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/3 border-r overflow-y-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Сотрудники</h2>
            {staffList.length ? (
            staffList.map((staff) => (
                <div
                key={staff.id}
                className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                    selectedId === staff.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedId(staff.id)}
                >
                <p className="font-semibold">{staff.name} {staff.surname}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-500">Нет сотрудников</p>
            )}
        </div>

        {/* Detail */}
            <div ref={detailPaneRef} className="w-2/3 p-8 overflow-y-auto">
                {!selectedId &&  (
                    <div className="text-gray-500 italic">
                        Выберите проект из списка слева
                    </div>
                    )}

                    {typeof selectedId === "number"  && (
                        <DetailDashboard key={selectedId} mode={mode} workerId={selectedId} />
                )}
            </div>
        </div>
  );
}