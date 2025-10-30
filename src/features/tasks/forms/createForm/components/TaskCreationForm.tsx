"use client";

import { Props } from "../types/taskCreationTypes";
import { useTaskCreationForm } from "../hooks/useTaskCreationForm";
import { FormValues } from "@/features/tasks/services/validation/taskSchema";

export const TaskCreateForm = (props: Props) => {
    const { assignees, isAssigneesLoading, onSubmit, success, errorMsg, register, handleSubmit, errors } = useTaskCreationForm(props);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
            <h2 className="text-xl font-bold">Создание новой задачи</h2>

            {/* Основные поля — только для from-task и from-application */}
            {(props.type === "from-task" || props.type === "from-application") && (
                <>
                    {[
                        { label: "Имя", name: "name" },
                        { label: "Фамилия", name: "surname" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Телефон", name: "phone_number", type: "tel" },
                    ].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label className="text-sm font-medium mb-1">{field.label}</label>
                            <input
                                {...register(field.name as keyof FormValues)}
                                type={field.type || "text"}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors[field.name as keyof FormValues] && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors[field.name as keyof FormValues]?.message as string}
                            </p>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Основные поля */}
            {[
                { label: "Дата действия", name: "action_date", type: "date" },
                { label: "Время действия", name: "action_time", type: "time" },
            ].map((field, idx) => (
                <div key={idx} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{field.label}</label>
                    <input
                        {...register(field.name as keyof FormValues)}
                        type={field.type || "text"}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors[field.name as keyof FormValues] && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors[field.name as keyof FormValues]?.message as string}
                        </p>
                    )}
                </div>
            ))}

            {/* рабочие */}
            {props.type !== "from-application" && (
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Рабочие</label>
                {isAssigneesLoading ? (
                    <p className="italic text-gray-500">Загрузка рабочих...</p>
                ) : (
                    <div className="border border-gray-300 rounded p-3 h-32 overflow-y-auto space-y-2">
                        {assignees?.results?.map((assignee) => (
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
                    <p className="text-red-600 text-sm mt-1">{errors.assignees.message}</p>
                )}
            </div>
            )}

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Действие</label>
                <textarea
                    {...register("action")}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.action && (
                    <p className="text-red-600 text-sm mt-1">{errors.action.message}</p>
                )}
            </div>

            {/* если из задачи → показываем предыдущую задачу */}
            {props.type === "from-task" && (
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Предыдущая задача</label>
                    <input 
                        type="text"
                        value={props.previousTaskLabel} 
                        readOnly 
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            )}

            {/* поле заявки */}
            {props.type === "from-application" ? (
                <div className="flex flex-col">
                    <label>Заявка</label>
                    <input
                        type="text"
                        value={props.applicationLabel || "Без заявки"}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            ) : null}

            {/* поле проекта */}
            {props.type === "from-task" ? (
                <div className="flex flex-col">
                    <label>Проект</label>
                    <input
                        type="text"
                        value={props.projectLabel || "Без проекта"}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            ) : null}

            {/* Сообщения */}
            {success && <p className="text-green-600">✅ Задача успешно создана</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Создать задачу
            </button>
        </form>
    );
};