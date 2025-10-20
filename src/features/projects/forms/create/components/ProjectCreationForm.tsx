"use client";

import { useProjectCreationForm } from "../hooks/useProjectCreationForm";

type Props = {
    taskIds?: number[];
    applicationId?: number;
    applicationLabel?: string;
    onSuccess?: () => void;
};

export const ProjectCreateForm = ({ taskIds, applicationId, applicationLabel, onSuccess }: Props) => {
    const { 
        onSubmit, 
        success,
        errorMsg,
        register,
        handleSubmit,
        errors,
        isCustomerLoading,
        customerOptions,
        projectManagers,
        isProjectManagersLoading,
    } = useProjectCreationForm({ taskIds, applicationId, onSuccess});

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Создание проекта</h2>

            {/* Название проекта */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Название проекта</label>
                <input
                    {...register("project_name")}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.project_name && <p className="text-red-600 text-sm">{errors.project_name.message}</p>}
            </div>

            {/* Клиент */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Клиент</label>
                {isCustomerLoading ? (
                    <p className="italic text-gray-500">Загрузка клиентов...</p>
                ) : (
                    <select
                        {...register("customer", {
                            setValueAs: (v) => (v === "" ? null : Number(v)),
                        })}
                        className="border border-gray-300 rounded px-3 py-2"
                    >
                        {/* Показываем пустую опцию, только если клиент не выбран по умолчанию */}
                        <option value="" hidden>Не выбрано</option>
                        {customerOptions?.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.email}
                            </option>
                        ))}
                    </select>
                )}
            </div>
                
            {/* Менеджер */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Проект Менеджер</label>
                {isProjectManagersLoading ? (
                    <p className="italic text-gray-500">Загрузка клиентов...</p>
                ) : (
                    <select
                        {...register("project_manager", {
                            setValueAs: (v) => (v === "" ? null : Number(v)),
                        })}
                        className="border border-gray-300 rounded px-3 py-2"
                    >
                        {/* Показываем пустую опцию, только если клиент не выбран по умолчанию */}
                        <option value="" hidden>Не выбрано</option>
                        {projectManagers?.results?.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                                {manager.email}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Описание */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Описание</label>
                <textarea
                    {...register("description")}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
            </div>

            {/* Даты начала и конца */}
            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1">Дата начала</label>
                <input
                    type="date"
                    {...register("start_date")}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                </div>
                <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1">Дата окончания</label>
                <input
                    type="date"
                    {...register("end_date")}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                </div>
            </div>

            {/* Стоимость */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Стоимость</label>
                <input
                    {...register("cost", {
                        setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                />
            </div>

            {/* Заявка */}
            {applicationId ? (
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Заявка</label>
                    <input
                        type="text"
                        value={applicationLabel || "Без заявки"}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                </div>
            ) : null}

            {/* Задачи */}
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

            {/* Сообщения */}
            {success && <p className="text-green-600">✅ Проект успешно создан</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Создать проект
            </button>
        </form>
    );
};