'use client';

import { useDashboardEditForm } from "../hooks/useDashboardEditForm";
import { UpdateValues } from "@/features/dashboard/services/validation/dashboardSchema";
import { StaffId } from "@/share/types/staffTypes";

type Role = "manager" | "admin" | "worker";

type Props = {
    staff: StaffId;
    currentRole: Role;
    onSuccess?: () => void;
};

const formFields = [
    { label: "Имя", name: "name" as const },
    { label: "Фамилия", name: "surname" as const },
    { label: "Email", name: "email" as const, type: "email" },
    { label: "Телефон", name: "phone_number" as const, type: "tel" },
    { label: "Изменить пароль", name: "password" as const, type: "password" },
    { label: "Подтвердить пароль", name: "confirm_password" as const, type: "password" },
];

export function DashboardEditForm({ staff, currentRole, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        specializations,
        isSpecializationsLoading,
        errors,
        onSubmit,
        errorMsg,
        success,
    } = useDashboardEditForm({ staff, currentRole, onSuccess });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Редактировать задачу #{staff.id}</h2>

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

            {/* {errors.project && (
                <p className="text-red-600 text-sm mt-1">
                    {errors.project.message}
                </p>
            )} */}

            {/* Cпециализации (Исправлено на чекбоксы) */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Специализации</label>
                {isSpecializationsLoading ? (
                    <p className="italic text-gray-500">Загрузка специализаций...</p>
                ) : (
                    <div className="border border-gray-300 rounded p-3 h-32 overflow-y-auto space-y-2">
                        {specializations?.map((spec) => (
                            <div key={spec.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`spec-${spec.id}`}
                                    value={spec.id}
                                    {...register("specializations" as keyof UpdateValues)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`spec-${spec.id}`} className="text-sm">
                                    {spec.specialization}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                {errors.specializations && (
                    <p className="text-red-600 text-sm mt-1">{errors.specializations.message as string}</p>
                )}
            </div>

            {/* Добавлено поле is_superuser */}
            {currentRole === "admin" && (
                <>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_superuser"
                            {...register("is_superuser" as keyof UpdateValues)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="is_superuser" className="text-sm font-medium">
                            Суперпользователь (Администратор)
                        </label>
                    </div>
                    {errors.is_superuser && (
                        <p className="text-red-600 text-sm mt-1">{errors.is_superuser.message as string}</p>
                    )}
                </>
            )}

            {success && <p className="text-green-600">✅ успешно обновлено</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Сохранить изменения
            </button>
        </form>
    );
}