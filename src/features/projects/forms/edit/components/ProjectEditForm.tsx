'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUpdateProjectMutation } from "@/features/projects/api/projectApi";
import { useGetClientsQuery } from "@/share/api/usersApi";
import { ProjectId } from "../../../types/projectTypes";
import { ProjectUpdateFormValues, projectUpdateSchema } from "@/features/projects/services/validation/projectsCreateSchema";

type Props = {
    taskIds?: number[];
    project: ProjectId;
    onSuccess?: () => void;
};

export function ProjectEditForm({ taskIds, project, onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectUpdateFormValues>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues: {
        project_name: project.project_name,
        description: project.description || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        cost: Number(project.cost) || undefined,
        status: project.status || "",
        comment: project.comment || "",
        tasks: project.tasks?.length ? project.tasks.map(t => t.id) : [],
        },
    });

    const [updateProject] = useUpdateProjectMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { data: clients, isLoading: isClientsLoading } = useGetClientsQuery();

    const onSubmit = async (data: ProjectUpdateFormValues) => {
        try {
        await updateProject({ id: project.id, data }).unwrap();
        setSuccess(true);
        setErrorMsg(null);
        onSuccess?.();
        } catch (err) {
        console.error(err);
        setErrorMsg("Ошибка при обновлении проекта");
        }
    };

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