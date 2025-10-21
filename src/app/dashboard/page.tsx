'use client';

import { StaffDashboard } from "@/features/dashboard/components/DashBoard";
import { meApi } from "@/share/api/meApi";
import { useEffect, useState } from "react";

type Mode = "worker" | "manager" | "admin";

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const { data: staffData, isLoading, error } = meApi.useGetCurrentMeQuery();

  function getModeFromMe(me: { specializations: { specialization: string }[] }): Mode {
    if (!me.specializations || me.specializations.length === 0) return "admin";
    if (me.specializations.some(s => s.specialization === "manager")) return "manager";
    return "worker";
  }

  useEffect(() => {
    if (staffData) {
      setMode(getModeFromMe(staffData));
    }
  }, [staffData]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;
  if (!mode) return <div>Определение роли...</div>;

  return <StaffDashboard mode={mode} workerId={staffData?.id} />;
}