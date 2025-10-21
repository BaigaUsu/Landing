'use client';

import { TaskId } from "../types/taskType";

type Props = {
    task: TaskId;
    onEdit: () => void;
    onDelete: () => void;
    onCreateTask: () => void;
    onCreateProject: () => void;
    isDeleting: boolean;
};

export function TaskDisplay({ task, onEdit, onDelete, onCreateTask, onCreateProject, isDeleting }: Props) {
    return (
        <div>
            <>
                <h1 className="text-2xl font-bold mb-4">Задача #{task.id}</h1>
                    <button
                        onClick={onCreateTask}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    >
                        Создать задачу
                    </button>


                {task.status === 'done-positive' && !task.project ? (
                    <button
                        onClick={onCreateProject}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    >
                        Создать проект
                    </button>) 
                : null}

                <button
                    onClick={onEdit}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mb-4"
                >
                    ✏️ Редактировать
                </button>

                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="bg-red-600 text-white px-3 py-1 rounded mb-4"
                >
                    🗑️ Удалить
                </button>

                <div className="space-y-2">
                    <p><strong>Имя:</strong> {task.name}</p>
                    <p><strong>Фамилия:</strong> {task.surname}</p>
                    <p><strong>Email:</strong> {task.email}</p>
                    <p><strong>Телефон:</strong> {task.phone_number}</p>
                    <p><strong>Действие:</strong> {task.action}</p>
                    <p><strong>Дата:</strong> {task.action_date}</p>
                    <p><strong>Время:</strong> {task.action_time}</p>
                    <p><strong>Статус:</strong> {task.status}</p>
                </div>

                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Рабочий</h2>
                    {task.assignees && task.assignees.length > 0 ? (
                        <div className="mt-2 space-y-2">
                            {task.assignees.map((a) => (
                                <div key={a.id} className="p-4 border rounded">
                                    <p><strong>ID:</strong> {a.id}</p>
                                    <p><strong>Действие:</strong> {a.name}</p>
                                    <p><strong>Дата:</strong> {a.surname}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-2">Следующих задач не назначено</p>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Следующая задача</h2>
                    {task.next_tasks && task.next_tasks.length > 0 ? (
                        <div className="mt-2 space-y-2">
                            {task.next_tasks.map((t) => (
                                <div key={t.id} className="p-4 border rounded">
                                    <p><strong>ID:</strong> {t.id}</p>
                                    <p><strong>Действие:</strong> {t.action}</p>
                                    <p><strong>Дата:</strong> {t.action_date}</p>
                                    <p><strong>Время:</strong> {t.action_time}</p>
                                    <p><strong>Статус:</strong> {t.status}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-2">Следующих задач не назначено</p>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Предыдущие задачи</h2>
                    {task.previous_tasks && task.previous_tasks.length > 0 ? (
                        <ul className="mt-2 space-y-2 list-disc ml-6">
                            {task.previous_tasks.map((t) => (
                                <li key={t.id} className="p-3 border rounded">
                                    <p><strong>ID:</strong> {t.id}</p>
                                    <p><strong>Действие:</strong> {t.action}</p>
                                    <p><strong>Дата:</strong> {t.action_date}</p>
                                    <p><strong>Время:</strong> {t.action_time}</p>
                                    <p><strong>Статус:</strong> {t.status}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-2">Нет предыдущих задач</p>
                    )}
                </div>

                <div className="mt-6">
                    <p><strong>Проект:</strong> {task.project?.project_name ?? "Нет проекта"}</p>
                    <p><strong>Заявка:</strong> {task.application?.email ?? "Нет заявки"} </p>
                    <p><strong>Заявка создана:</strong> {task.application ? new Date(task.application.created_at).toLocaleString() : "—"}</p>
                </div>
            </>
        </div>
    );
}