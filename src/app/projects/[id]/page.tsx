"use client";

import { useState } from "react";
import { useGetProjectByIdQuery, useDeleteProjectMutation } from "@/api/projectApi";
import { ProjectEditForm } from "@/components/Forms/ProjectEditForm";
import Link from "next/link";

type Props = {
  id: number;
  onDelete?: () => void;
};

export const ProjectDetailPage = ({ id, onDelete }: Props) => {
  const { data: project, isLoading } = useGetProjectByIdQuery(id, { skip: !id });
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [showEdit, setShowEdit] = useState(false);

  if (isLoading) return <p>Загрузка данных проекта...</p>;
  if (!project) return <p className="text-gray-500 italic">Проект не найден</p>;

  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить проект?")) {
      try {
        await deleteProject(project.id).unwrap();
        alert("Проект удалён");
        onDelete?.();
      } catch (err) {
        console.error(err);
        alert("Ошибка при удалении проекта");
      }
    }
  };

  return (
    <div>
      {!showEdit ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{project.project_name}</h1>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              ✏️ Редактировать
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              🗑️ Удалить
            </button>
          </div>

          <div className="mb-6 space-y-2">
            <p><strong>Клиент:</strong> {project.client.id}</p>
            <p><strong>Описание:</strong> {project.description}</p>
            <p><strong>Дата начала:</strong> {project.start_date}</p>
            <p><strong>Дата окончания:</strong> {project.end_date}</p>
            <p><strong>Стоимость:</strong> {project.cost} ₽</p>
            <p><strong>Статус:</strong> {project.status}</p>
            <p><strong>Комментарий:</strong> {project.comment}</p>
            <p><strong>Заявка создана:</strong> {project.application ? new Date(project.application.created_at).toLocaleString() : "—"}</p>
          </div>

          {/* Задачи */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Задачи</h2>
            {project.tasks && project.tasks.length > 0 ? (
              <ul className="space-y-3 list-disc ml-6">
                {project.tasks.map((task) => (
                  <li key={task.id} className="p-3 border rounded">
                    <p><strong>ID:</strong> {task.id}</p>
                    <p><strong>Действие:</strong> {task.action}</p>
                    <p><strong>Дата:</strong> {task.action_date}</p>
                    <p><strong>Время:</strong> {task.action_time}</p>
                    <p><strong>Статус:</strong> {task.status}</p>
                    <Link href={`/tasks/${task.id}`} className="text-blue-600 underline mt-1 inline-block">
                      Перейти к задаче
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Задачи отсутствуют</p>
            )}
          </section>

          {/* Этапы */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Этапы (Stages)</h2>
            {project.stages && project.stages.length > 0 ? (
              <ul className="space-y-3 list-decimal ml-6">
                {project.stages.map((stage) => (
                  <li key={stage.id} className="p-3 border rounded">
                    <p><strong>Тип этапа:</strong> {stage.type}</p>
                    <p><strong>Задача:</strong> {stage.task}</p>
                    <p><strong>Статус:</strong> {stage.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Этапы отсутствуют</p>
            )}
          </section>

          <Link href={`/projects/${project.id}`} className="text-blue-600 underline mt-6 inline-block">
            Открыть в новой вкладке
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => setShowEdit(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
          >
            ❌ Отмена
          </button>

          <ProjectEditForm
            project={project}
            onSuccess={() => setShowEdit(false)}
          />
        </>
      )}
    </div>
  );
};