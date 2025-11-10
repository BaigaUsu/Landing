// src/features/tasks/hooks/useTaskEditForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Customers } from "@/share/types/customersTypes";
import { usePatchCustomerMutation } from "@/share/api/customersApi";
import { customerUpdateSchema, UpdateValues } from "../../services/validation/customerSchema";

type Props = {
    customer: Customers;
    onSuccess?: () => void;
};
export function useCustomerEditForm({ customer, onSuccess }: Props) {
    
    const [updateCustomer] = usePatchCustomerMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateValues>({
        resolver: zodResolver(customerUpdateSchema),
        defaultValues: {
            name: customer.name,
            surname: customer.surname,
            email: customer.email,
            phone_number: customer.phone_number,

        },
    });

    const onSubmit = async (data: UpdateValues) => {
        setErrorMsg(null);
        setSuccess(false);
        try {
            await updateCustomer({ id: customer.id, data }).unwrap();
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
        errors,
        onSubmit,
        errorMsg,
        success,
    };
}