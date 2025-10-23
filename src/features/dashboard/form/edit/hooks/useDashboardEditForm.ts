// src/features/tasks/hooks/useTaskEditForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { usePatchManagerStaffMutation } from "@/share/api/managerStaffApi";
import { usePatchAdminStaffMutation } from "@/share/api/adminStaffApi";
import { useGetSpecializationsQuery } from "@/share/api/specialization";
import { StaffId } from "@/share/types/staffTypes";
import { dashboardUpdateSchema, UpdateValues } from "@/features/dashboard/services/validation/dashboardSchema";
import { usePatchWorkerStaffMutation } from "@/share/api/workerStaffApi";

type Role = "manager" | "admin" | "worker";
type Props = {
    staff: StaffId;
    currentRole: Role;
    onSuccess?: () => void;
};
export function useDashboardEditForm({ staff, currentRole, onSuccess }: Props) {
    
    const [updateAdmin] = usePatchAdminStaffMutation();
    const [updateManager] = usePatchManagerStaffMutation();
    const [updateWorker] = usePatchWorkerStaffMutation()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const {data: specializations, isLoading: isSpecializationsLoading} = useGetSpecializationsQuery();

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateValues>({
        resolver: zodResolver(dashboardUpdateSchema),
        defaultValues: {
            name: staff.name,
            surname: staff.surname,
            email: staff.email,
            phone_number: staff.phone_number,
            specializations: staff.specializations?.map(a => String(a.id)) || [],
            is_superuser: staff.is_superuser,

        },
    });

    const onSubmit = async (data: UpdateValues) => {
        const normalizedData = {
            ...data,
            specializations: data.specializations?.map(Number),
          };
        setErrorMsg(null);
        setSuccess(false);
        try {
            if (currentRole === "admin") {
                  await updateAdmin({ id: staff.id, data: normalizedData }).unwrap();
              } else if (currentRole === "manager") {
                await updateManager({id: staff.id, data: normalizedData }).unwrap();
              } else {
                await updateWorker({id: staff.id, data: normalizedData}).unwrap();
              }
            setSuccess(true);
            setErrorMsg(null);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            setSuccess(false);
            setErrorMsg("Ошибка при обновлении данных сотрудника");
        }
    };

    return {
        register,
        handleSubmit,
        specializations,
        isSpecializationsLoading,
        errors,
        onSubmit,
        errorMsg,
        success,
    };
}