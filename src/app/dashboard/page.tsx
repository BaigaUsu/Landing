'use client';

import { useEffect, useRef, useState } from "react";
import { meApi } from "@/share/api/meApi";
import { useGetAdminStaffQuery } from "@/share/api/adminStaffApi";
import { useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { DetailDashboard } from "@/features/dashboard/components/DetailDashboard";
import { DashboardCreateForm } from "@/features/dashboard/form/create/components/DashboradCreateForm";

type Mode = "manager" | "admin";

interface StaffItem {
  id: number;
  name: string;
  surname: string;
}

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const detailPaneRef = useRef<HTMLDivElement>(null);

  const { data: currentMe, isLoading: isLoadingMe } = meApi.useGetCurrentMeQuery();

  const { data: adminStaff, isLoading: isLoadingAdmin, refetch: refetchAdmin } = useGetAdminStaffQuery(undefined, { skip: mode !== "admin" });
  const { data: managerStaff, isLoading: isLoadingManager, refetch: refetchManager } = useGetManagerStaffQuery(undefined, { skip: mode !== "manager" });

  function getModeFromMe(me: { specializations: { specialization: string }[] }): Mode {
    if (me.specializations.some(s => s.specialization === "manager")) return "manager";
    return "admin"; // Если не менеджер, то админ (по условию)
  }

  useEffect(() => {
    if (currentMe) {
      const detectedMode = getModeFromMe(currentMe);
      setMode(detectedMode);
    }
  }, [currentMe]); 

  useEffect(() => {
    if (detailPaneRef.current) detailPaneRef.current.scrollTop = 0;
  }, [selectedId, isCreating]);

  const handleSelectStaff = (id: number) => {
    setSelectedId(id);
    setIsCreating(false);
  };

  const handleShowCreateForm = () => {
    setIsCreating(true);
    setSelectedId(null); 
  };
  
  const handleCreateSuccess = () => {
    setIsCreating(false);
    if (mode === "admin") refetchAdmin();
    if (mode === "manager") refetchManager();
  };

  const handleCreateCancel = () => {
    setIsCreating(false);
    setSelectedId(null); 
  };


  if (isLoadingMe || !mode) 
    return <p className="p-4">Определение роли...</p>;

  if ((mode === "admin" && isLoadingAdmin) || (mode === "manager" && isLoadingManager))
    return <p className="p-4">Загрузка данных...</p>;


  let staffList: StaffItem[] = [];
  if (mode === "admin" && adminStaff) staffList = adminStaff.results.map((s) => ({ id: s.id, name: s.name, surname: s.surname }));
  else if (mode === "manager" && managerStaff) staffList = managerStaff.results.map((s) => ({ id: s.id, name: s.name, surname: s.surname }));

  return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/3 border-r overflow-y-auto p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-2">Сотрудники</h2>

              <button
                onClick={handleShowCreateForm}
                className={`w-full p-3 mb-2 text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700 ${
                  isCreating ? "ring-2 ring-blue-300 ring-offset-2" : "" 
                }`}
              >
                + Создать сотрудника
              </button>

            {staffList.length ? (
            staffList.map((staff) => (
                <div
                key={staff.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                    (selectedId === staff.id && !isCreating) ? "bg-blue-100 border-blue-300" : "bg-white"
                }`}
                onClick={() => handleSelectStaff(staff.id)}
                >
                <p className="font-semibold">{staff.name} {staff.surname}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-500">Нет сотрудников</p>
            )}
        </div>

        {/* Detail */}
        <div ref={detailPaneRef} className="w-2/3 p-8 overflow-y-auto bg-gray-50">
                {isCreating ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Создание нового сотрудника</h1>
                            <button
                                onClick={handleCreateCancel} 
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                            >
                                Отмена
                            </button>
                        </div>
                        <DashboardCreateForm 
                            currentRole={mode!}
                          onSuccess={handleCreateSuccess} 
                        />
                    </>
                ) : (
                    // 8. Этот блок (!isCreating) теперь рендерится по умолчанию
                    <>
                        {/* 9. Эта заглушка будет видна по умолчанию, т.к. selectedId === null */}
                        {!selectedId &&  (
                            <div className="text-gray-500 italic text-center mt-10">
                                Выберите сотрудника из списка слева
                                {/* Упростили текст, т.к. "worker" здесь не бывает */}
                                {" или создайте нового"}
                            </div>
                        )}

                        {/* Этот блок отрендерится только после клика на сотрудника */}
                        {typeof selectedId === "number"  && (
                            <DetailDashboard key={selectedId} mode={mode} workerId={selectedId} />
                        )}
                    </>
                )}
            </div>
        </div>
  );
}