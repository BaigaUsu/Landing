import { useGetAdminStaffByIdQuery, useGetAdminStaffQuery } from "@/share/api/adminStaffApi";
import { useGetManagerStaffByIdQuery, useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { useGetWorkerStaffByIdQuery } from "@/share/api/workerStaffApi";
import { useMemo } from "react";

type Mode = "worker" | "manager" | "admin";

interface StaffDashboardProps {
  mode: Mode;
  workerId?: number; // нужен, если заходит конкретный сотрудник
}

export default function useDashboard({ mode, workerId }: StaffDashboardProps) {
    // --- получаем данные ---
      const {
        data: adminData,
        isLoading: adminLoading,
        error: adminError,
      } = useGetAdminStaffByIdQuery(workerId!, { skip: mode !== "admin" });
    
      const {
        data: managerData,
        isLoading: managerLoading,
        error: managerError,
      } = useGetManagerStaffByIdQuery(workerId!, { skip: mode !== "manager" });
    
      const {
        data: workerData,
        isLoading: workerLoading,
        error: workerError,
      } = useGetWorkerStaffByIdQuery(workerId!, { skip: mode !== "worker" });
    
      // --- вычисляем общее состояние ---
      const isLoading = adminLoading || managerLoading || workerLoading;
      const error = adminError || managerError || workerError;
    
      const staffList = useMemo(() => {
        if (mode === "admin" && adminData) return [adminData];
        if (mode === "manager" && managerData) return [managerData];
        if (mode === "worker" && workerData) return [workerData];
        return [];
      }, [mode, adminData, managerData, workerData]);
        return { isLoading, error, staffList };
    }