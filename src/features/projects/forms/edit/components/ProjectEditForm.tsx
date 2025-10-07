'use client';

import { ProjectId } from "../../../types/projectTypes";
import { ProjectUpdateFormValues, projectUpdateSchema } from "@/features/projects/services/validation/projectsCreateSchema";
import { useProjectEditForm } from "../hooks/useProjectEditForm";

type Props = {
    taskIds?: number[];
    project: ProjectId;
    onSuccess?: () => void;
};

export function ProjectEditForm({ taskIds, project, onSuccess }: Props) {
    const { register, handleSubmit, errors, isClientsLoading, clients, onSubmit, errorMsg, success } = useProjectEditForm({ project, onSuccess });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Редактировать проект #{project.id}</h2>

            {/* Название проекта */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Название проекта</label>
                <input
                {...register("project_name")}
                type="text"
                className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.project_name && (
                <p className="text-red-600 text-sm mt-1">{errors.project_name.message}</p>
                )}
            </div>

            {/* Клиент */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Клиент</label>
                {isClientsLoading ? (
                <p className="text-sm italic text-gray-500">Загрузка клиентов...</p>
                ) : (
                <select
                    {...register("client", {
                    setValueAs: (v) => v === "" ? null : Number(v),
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    {clients?.map(client => (
                    <option key={client.id} value={client.id}>
                        {client.email}
                    </option>
                    ))}
                </select>
                )}
                {errors.client && (
                <p className="text-red-600 text-sm mt-1">{errors.client.message}</p>
                )}
            </div>

            {/* Остальные поля */}
            {[
                { label: "Описание", name: "description" },
                { label: "Дата начала", name: "start_date", type: "date" },
                { label: "Дата окончания", name: "end_date", type: "date" },
                { label: "Стоимость", name: "cost", type: "number" },
                { label: "Комментарий", name: "comment" },
            ].map((field, idx) => (
                <div key={idx} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{field.label}</label>
                <input
                    {...register(field.name as keyof ProjectUpdateFormValues)}
                    type={field.type || "text"}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                {errors[field.name as keyof ProjectUpdateFormValues] && (
                    <p className="text-red-600 text-sm mt-1">
                    {errors[field.name as keyof ProjectUpdateFormValues]?.message as string}
                    </p>
                )}
                </div>
            ))}

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Статус</label>
                <select
                    {...register("status")}
                    defaultValue="in-progress"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="in-progress">in-progress</option>
                    <option value="completed">completed</option>
                    <option value="not-completed">not-completed</option>
                </select>
                {errors.status && (
                <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
                )}
            </div>

            {taskIds ? (
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Задача</label>
                    <input
                        type="text"
                        value={`${taskIds}`}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                </div>
            ) : null}

            {success && <p className="text-green-600">✅ Проект успешно обновлен</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Сохранить изменения
            </button>
        </form>
    );
}