"use client";

import { ServerStageUrlKind } from "@/features/stages/types/types";
import { useSubStageCreateForm } from "../hooks/useSubStageCreateForm";

type Props = {
    projectId: number;
    stageId: number;
    stageKind: ServerStageUrlKind;
    onSuccess: () => void;
};

export const SubStageCreateForm = ({ projectId, stageId, stageKind, onSuccess }: Props) => {
    const { register, handleSubmit, errors, onSubmit, isLoading } = useSubStageCreateForm({ projectId, stageId, stageKind, onSuccess });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-md bg-gray-50 mt-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Название</label>
                <input
                    id="title"
                    {...register("title")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="task" className="block text-sm font-medium text-gray-700">Описание задачи</label>
                <textarea
                    id="task"
                    {...register("task")}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.task && <p className="mt-1 text-sm text-red-600">{errors.task.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Дата начала</label>
                    <input
                        id="start_date"
                        type="date"
                        {...register("start_date")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Дата окончания</label>
                    <input
                        id="end_date"
                        type="date"
                        {...register("end_date")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                    {isLoading ? "Создание..." : "➕ Создать подэтап"}
                </button>
                <button
                    type="button"
                    onClick={onSuccess} // Используем onSuccess для отмены, т.к. логика та же - закрыть форму
                    className="text-sm text-gray-600 hover:underline"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};