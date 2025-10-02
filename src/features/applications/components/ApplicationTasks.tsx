'use client';

import { TaskCreateForm } from "@/features/tasks/forms/createForm/components/TaskCreationForm";
import { TaskShort } from "@/share/types/tasks/taskShortTypes";
import { useState } from "react";

type Props = {
    tasks: TaskShort[];
    applicationId: number;
    applicationLabel: string;
    onTaskCreate: () => void; 
    currentStatus: string;
};

export function ApplicationTasks({
    tasks,
    applicationId,
    applicationLabel,
    onTaskCreate,
    currentStatus,
}: Props) {
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Задачи:</h2>
                {!showCreateForm && currentStatus !== 'pending' && (
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                    >
                        + Создать задачу
                    </button>
                )}
            </div>

            {showCreateForm && (
                <div className="p-4">
                    <TaskCreateForm
                        type="form-application"
                        applicationId={applicationId}
                        applicationLabel={applicationLabel}
                        onSuccess={() => {
                        setShowCreateForm(false);
                        onTaskCreate(); // Обновляем данные после создания задачи
                        }}
                    />
                    <button
                        onClick={() => setShowCreateForm(false)}
                        className="mt-2 bg-gray-300 text-gray-800 px-3 py-1 text-sm rounded"
                    >
                        ❌ Закрыть форму
                    </button>
                </div>
            )}

            {tasks.length > 0 ? (
                <ul className="space-y-2 list-disc ml-6">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-2 border rounded">
                        <p><strong>Задача №</strong>{task.id}</p>
                        <p><strong>Действие:</strong> {task.action}</p>
                        <p><strong>Статус:</strong> {task.status}</p>
                        <p><strong>Дата:</strong> {task.action_date}</p>
                        <p><strong>Время:</strong> {task.action_time}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-2 text-gray-500 italic">Нет задач для этой заявки.</p>
            )}
        </div>
    );
}