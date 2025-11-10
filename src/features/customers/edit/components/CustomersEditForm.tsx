'use client';

import { UpdateValues } from "../../services/validation/customerSchema";
import { useCustomerEditForm } from "../hooks/useCustomerEditForm";
import { Customers } from "@/share/types/customersTypes";

type Props = {
    customer: Customers;
    onSuccess?: () => void;
};

const formFields = [
    { label: "Имя", name: "name" as const },
    { label: "Фамилия", name: "surname" as const },
    { label: "Email", name: "email" as const, type: "email" },
    { label: "Телефон", name: "phone_number" as const, type: "tel" },
];

export function CustomerEditForm({ customer, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        errorMsg,
        success,
    } = useCustomerEditForm({ customer, onSuccess });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Редактировать задачу #{customer.id}</h2>

            {formFields.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{field.label}</label>
                    <input
                        {...register(field.name as keyof UpdateValues)}
                        type={field.type || "text"}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors[field.name as keyof UpdateValues] && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors[field.name as keyof UpdateValues]?.message as string}
                        </p>
                    )}
                </div>
            ))}

            {success && <p className="text-green-600">✅ успешно обновлено</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Сохранить изменения
            </button>
        </form>
    );
}