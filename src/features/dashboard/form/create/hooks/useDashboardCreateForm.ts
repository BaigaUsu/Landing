"use client"; // Добавлена директива

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateManagerStaffMutation } from "@/share/api/managerStaffApi";
import { useCreateAdminStaffMutation } from "@/share/api/adminStaffApi";
import { useGetSpecializationsQuery } from "@/share/api/specialization";
import { CreateValues, dashboardCreateSchema } from "@/features/dashboard/services/validation/dashboardSchema";
import { StaffCreateRequest } from "@/share/types/staffTypes";

type Role = "manager" | "admin";

interface Props {
    currentRole: Role;
    onSuccess?: () => void;
}

export const useDashboardCreationForm = ({ currentRole, onSuccess }: Props) => {
    const [createAdmin] = useCreateAdminStaffMutation();
    const [createManager] = useCreateManagerStaffMutation();
    const { data: specializations, isLoading: isSpecLoading } = useGetSpecializationsQuery();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const defaultValues = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        specializations: [], // <-- Исправлено
        is_superuser: false,
        password: "",
        confirm_password: "",
    };

    const form = useForm({
        resolver: zodResolver(dashboardCreateSchema),
        defaultValues,
    });
    
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    // Исправлена типизация: data: FormValues -> data: CreateValues
    const onSubmit = async (data: CreateValues) => {
        const apiPayload: StaffCreateRequest = {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone_number: data.phone_number,
          is_superuser: data.is_superuser,
          password: data.password,
          confirm_password: data.confirm_password,
          specializations: data.specializations.map((idStr) => parseInt(idStr, 10)),
        };
      
        try {
          if (currentRole === "admin") {
            if (data.is_superuser) {
              await createAdmin(apiPayload).unwrap();
            } else {
              await createManager(apiPayload).unwrap();
            }
          } else {
            // менеджер не может создавать админов
            if (data.is_superuser) {
              throw new Error("Менеджер не может создавать админов.");
            }
            await createManager(apiPayload).unwrap();
          }
      
          setSuccess(true);
          setErrorMsg(null);
          form.reset();
          onSuccess?.();
        } catch (err: any) {
          console.error("Ошибка при создании:", err);
          const apiError =
            err.data?.detail || err.data?.specializations?.[0] || "Произошла ошибка при создании сотрудника";
          setErrorMsg(apiError);
          setSuccess(false);
        }
      };

    return {
        specializations,
        isSpecLoading,
        onSubmit,
        success,
        errorMsg,
        register, 
        handleSubmit,
        errors
    };
};