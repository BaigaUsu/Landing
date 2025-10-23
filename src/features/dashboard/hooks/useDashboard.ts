import { useDeleteAdminStaffMutation, useGetAdminStaffByIdQuery, useGetAdminStaffQuery } from "@/share/api/adminStaffApi";
import { useDeleteManagerStaffMutation, useGetManagerStaffByIdQuery, useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { useGetWorkerStaffByIdQuery } from "@/share/api/workerStaffApi";
import { useCallback, useMemo } from "react";

type Mode = "worker" | "manager" | "admin";

interface StaffDashboardProps {
  mode: Mode;
  workerId?: number; // нужен, если заходит конкретный сотрудник
  onDelete: () => void;
}

export default function useDashboard({ mode, workerId, onDelete }: StaffDashboardProps) {
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
      const [deleteAdmin, { isLoading: isDeletingAdmin }] = useDeleteAdminStaffMutation();
      const [deleteManager, { isLoading: isDeletingManager }] = useDeleteManagerStaffMutation();


      const handleDelete = useCallback(async () => {
        if (!workerId) return;
    
        const confirmed = confirm("Вы уверены, что хотите удалить сотрудника?");
        if (!confirmed) return;
    
        onDelete?.();
        try {
          if (mode === "admin") {
            await deleteAdmin(workerId).unwrap();
          } else if (mode === "manager") {
            await deleteManager(workerId).unwrap();
          } else {
            alert("Удаление сотрудников доступно только для менеджеров и админов.");
            return;
          }
    
          alert("✅ Сотрудник успешно удалён");
        } catch (err) {
          console.error("Ошибка при удалении сотрудника:", err);
          alert("❌ Ошибка при удалении сотрудника");
        }
      }, [mode, workerId, deleteAdmin, deleteManager, onDelete]);
    
      // --- вычисляем общее состояние ---
      const isLoading = adminLoading || managerLoading || workerLoading;
      const error = adminError || managerError || workerError;
      const isDeleting = isDeletingAdmin || isDeletingManager;
    
      const staff = useMemo(() => {
        if (mode === "admin") return adminData ?? null;
        if (mode === "manager") return managerData ?? null;
        if (mode === "worker") return workerData ?? null;
        return null;
      }, [mode, adminData, managerData, workerData]);
        return { isLoading, error, staff, handleDelete, isDeleting };
    }