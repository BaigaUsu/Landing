'use client';

import { TaskId } from "@/features/tasks/types/taskType";
import { TaskFormData } from "@/features/tasks/services/validation/taskSchema";
import { useTaskEditForm } from "../hooks/useTaskEditForm";

type Props = {
    task: TaskId;
    onSuccess?: () => void;
};

const formFields = [
    { label: "Имя", name: "name" as const },
    { label: "Фамилия", name: "surname" as const },
    { label: "Email", name: "email" as const, type: "email" },
    { label: "Телефон", name: "phone_number" as const, type: "tel" },
    { label: "Действие", name: "action" as const, type: "textarea" },
    { label: "Дата действия", name: "action_date" as const, type: "date" },
    { label: "Время действия", name: "action_time" as const, type: "time" },
];

export function TaskEditForm({ task, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        errors,
        assignees,
        isAssigneesLoading,
        onSubmit,
        errorMsg,
        success,
    } = useTaskEditForm({ task, onSuccess });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Редактировать задачу #{task.id}</h2>

            {formFields.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{field.label}</label>
                    <input
                        {...register(field.name as keyof TaskFormData)}
                        type={field.type || "text"}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors[field.name as keyof TaskFormData] && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors[field.name as keyof TaskFormData]?.message as string}
                        </p>
                    )}
                </div>
            ))}

            {errors.project && (
                <p className="text-red-600 text-sm mt-1">
                    {errors.project.message}
                </p>
            )}

            {/* Селектор исполнителей */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Исполнители</label>
                {isAssigneesLoading ? (
                    <p>Загрузка исполнителей...</p>
                ) : (
                    <div className="border border-gray-300 rounded p-3 h-32 overflow-y-auto space-y-2">
                        {assignees?.results.map((assignee) => (
                            <label key={assignee.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                value={assignee.id} 
                                {...register("assignees")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">{assignee.email}</span>
                        </label>
                        ))}
                    </div>
                )}

                {errors.assignees && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.assignees.message as string}
                    </p>
                )}
            </div>

            {/* Селектор для статуса */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Статус</label>
                <select
                    {...register("status")}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="to do">to-do</option>
                    <option value="done-positive">done-positive</option>
                    <option value="done-negative">done-negative</option>
                </select>
                {errors.status && (
                    <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
                )}
            </div>

            {success && <p className="text-green-600">✅ Задача успешно обновлена</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Сохранить изменения
            </button>
        </form>
    );
}