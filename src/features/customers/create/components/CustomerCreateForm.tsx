"use client";

import { CreateValues } from "../../services/validation/customerSchema";
import { useCustomersCreateForm } from "../hooks/useCustomersCreateForm";

interface Props {
    onSuccess?: () => void;
}

export const CustomerCreateForm = ({onSuccess}: Props) => {
    const { onSubmit, success, errorMsg, register, handleSubmit, errors } = useCustomersCreateForm({onSuccess});

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Создание нового сотрудника</h2>

            {/* Основные поля */}
            {[
                { label: "Имя", name: "name" },
                { label: "Фамилия", name: "surname" },
                { label: "Email", name: "email", type: "email" },
                { label: "Телефон", name: "phone_number", type: "tel" },
            ].map((field, idx) => (
                <div key={idx} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{field.label}</label>
                    <input
                        {...register(field.name as keyof CreateValues)}
                        type={field.type || "text"}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors[field.name as keyof CreateValues] && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors[field.name as keyof CreateValues]?.message as string}
                        </p>
                    )}
                </div>
            ))}

            {/* Сообщения */}
            {success && <p className="text-green-600">✅ Задача успешно создана</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Создать сотрудника
            </button>
        </form>
    );
};