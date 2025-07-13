'use client';

import { useDeleteTaskMutation, useGetTaskByIdQuery } from "@/api/tasksApi";
import { TaskEditForm } from "@/components/Forms/TaskEditForm";
import { useState } from "react";

type Props = {
  taskId: number;
  onCloseEdit?: () => void;
  onDelete?: () => void;
};

export function TaskDetail({ taskId, onCloseEdit, onDelete }: Props) {
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId);
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [showEdit, setShowEdit] = useState(false);

  if (isLoading) return <p>Загрузка данных...</p>;
  if (!task) return <p>Задача не найдена</p>;
  const safeTask = task;
  
  async function handleDelete() {
    if (confirm("Вы действительно хотите удалить эту задачу?")) {
      try {
        await deleteTask(safeTask.id).unwrap();
        alert("Задача удалена");
        onDelete?.();
      } catch (error) {
        alert("Ошибка при удалении задачи");
        console.error(error);
      }
    }
  }

  return (
    <div>
      {!showEdit ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Задача #{task.id}</h1>

          <button
            onClick={() => setShowEdit(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded mb-4"
          >
            ✏️ Редактировать
          </button>

          <button
            onClick={handleDelete}
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
            <h2 className="font-semibold text-lg">Следующая задача</h2>
            {task.next_task ? (
              <div className="p-4 border rounded mt-2">
                <p><strong>ID:</strong> {task.next_task.id}</p>
                <p><strong>Действие:</strong> {task.next_task.action}</p>
                <p><strong>Дата:</strong> {task.next_task.action_date}</p>
                <p><strong>Время:</strong> {task.next_task.action_time}</p>
                <p><strong>Статус:</strong> {task.next_task.status}</p>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">Следующая задача не назначена</p>
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
            <p><strong>Заявка создана:</strong> {task.application ? new Date(task.application.created_at).toLocaleString() : "—"}</p>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setShowEdit(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
          >
            ❌ Отмена
          </button>

          <TaskEditForm
            task={task}
            onSuccess={() => {
              setShowEdit(false);
              onCloseEdit?.();
            }}
          />
        </>
      )}
    </div>
  );
}