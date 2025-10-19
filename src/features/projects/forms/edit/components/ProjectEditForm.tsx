'use client';

import { ProjectId } from "../../../types/projectTypes";
import { ProjectUpdateFormValues } from "@/features/projects/services/validation/projectsSchema";
import { useProjectEditForm } from "../hooks/useProjectEditForm";

type Props = {
    taskIds?: number[];
    project: ProjectId;
    onSuccess?: () => void;
};

export function ProjectEditForm({ taskIds, project, onSuccess }: Props) {
    const { register, handleSubmit, errors, isCustomerLoading, customer, projectManagers, isProjectManagersLoading, onSubmit, errorMsg, success } = useProjectEditForm({ project, onSuccess });

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
                {isCustomerLoading ? (
                <p className="text-sm italic text-gray-500">Загрузка клиентов...</p>
                ) : (
                <select
                    {...register("customer", {
                    setValueAs: (v) => v === "" ? null : Number(v),
                    })}
                    defaultValue={project.customer ?? ""}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    {customer?.map(customer => (
                    <option key={customer.id} value={customer.id}>
                        {customer.email}
                    </option>
                    ))}
                </select>
                )}
                {errors.customer && (
                <p className="text-red-600 text-sm mt-1">{errors.customer.message}</p>
                )}
            </div>
            
             {/* Проэкт мэнеджер */}
             <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Проект мэнеджер</label>
                {isProjectManagersLoading ? (
                <p className="text-sm italic text-gray-500">Загрузка клиентов...</p>
                ) : (
                <select
                    {...register("project_manager", {
                        setValueAs: (v) => v === "" ? null : Number(v),
                    })}
                    defaultValue={project.project_manager ?? ""}
                    className="border border-gray-300 rounded px-3 py-2"
                >   
                    <option value="">Отсутствует</option> 
                    {projectManagers?.map(manager => (
                    <option key={manager.id} value={manager.id}>
                        {manager.email}
                    </option>
                    ))}
                </select>
                )}
                {errors.project_manager && (
                <p className="text-red-600 text-sm mt-1">{errors.project_manager.message}</p>
                )}
            </div>

            {/* Остальные поля */}
            {[
                { label: "Описание", name: "description" },
                { label: "Дата начала", name: "start_date", type: "date" },
                { label: "Дата окончания", name: "end_date", type: "date" },
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
                <label className="text-sm font-medium mb-1">Стоимость</label>
                <input
                    {...register("cost", {
                        setValueAs: (v) => v === "" ? undefined : Number(v),
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.cost && (
                <p className="text-red-600 text-sm mt-1">{errors.cost.message}</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Статус</label>
                <select
                    {...register("status")}
                    defaultValue="выбрать"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="in progress">in-progress</option>
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