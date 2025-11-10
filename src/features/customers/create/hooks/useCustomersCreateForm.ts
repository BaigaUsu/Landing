"use client"; // Добавлена директива

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateCustomerMutation } from "@/share/api/customersApi";
import { CreateValues, customerCreateSchema } from "../../services/validation/customerSchema";
import { CreateCustomers } from "@/share/types/customersTypes";

type Role = "manager" | "admin";

interface Props {
    onSuccess?: () => void;
}

export const useCustomersCreateForm = ({ onSuccess }: Props) => {
    const [createCustomer] = useCreateCustomerMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const defaultValues = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
    };

    const form = useForm({
        resolver: zodResolver(customerCreateSchema),
        defaultValues,
    });
    
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    // Исправлена типизация: data: FormValues -> data: CreateValues
    const onSubmit = async (data: CreateValues) => {
        const apiPayload: CreateCustomers = {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone_number: data.phone_number,
        };
      
        try {
          await createCustomer(apiPayload).unwrap();
      
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
        onSubmit,
        success,
        errorMsg,
        register, 
        handleSubmit,
        errors
    };
};