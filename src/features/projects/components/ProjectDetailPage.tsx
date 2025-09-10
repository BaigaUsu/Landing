"use client";

import { useState } from "react";
import { useGetProjectByIdQuery, useDeleteProjectMutation } from "@/features/projects/api/projectApi";
import { ProjectEditForm } from "@/features/projects/forms/edit/components/ProjectEditForm";
import Link from "next/link";
import { StageCreateForm } from "../../stages/create/components/StageCreationForm";
import { useDeleteStageMutation } from "@/features/stages/api/stageApi";
import { StageEditForm } from "../../stages/edit/components/StageEditForm";
import { ServerStageType } from "@/features/stages/types/types";

type Props = {
  id: number;
  onDelete?: () => void;
};

export const ProjectDetailPage = ({ id, onDelete }: Props) => {
  const { data: project, isLoading } = useGetProjectByIdQuery(id, { skip: !id });
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [deleteStages] = useDeleteStageMutation();

  const [editingStageId, setEditingStageId] = useState<number | null>(null);
  const [editingStageType, setEditingStageType] = useState<ServerStageType | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [creatingStageType, setCreatingStageType] = useState<ServerStageType | null>(null);

  if (isLoading) return <p>Загрузка данных проекта...</p>;
  if (!project) return <p className="text-gray-500 italic">Проект не найден</p>;

  const handleStageDelete = async (stageId: number) => {
    try {
      await deleteStages(stageId).unwrap();
      alert("Этап успешно удалён");
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении этапа");
    }
  };

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

  const getStageDisplayName = (type: ServerStageType): string => {
    const displayNames: Record<ServerStageType, string> = {
      "pre-project": "Предпроектная подготовка",
      "conceptual design": "Концептуальный дизайн",
      "detailed design": "Детальный дизайн", 
      "material specification": "Спецификация материалов",
      "author's supervisor": "Авторский надзор",
    };
    return displayNames[type] || type;
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
            <p><strong>Клиент:</strong> {project.client} </p>
            <p><strong>Описание:</strong> {project.description}</p>
            <p><strong>Дата начала:</strong> {project.start_date}</p>
            <p><strong>Дата окончания:</strong> {project.end_date}</p>
            <p><strong>Стоимость:</strong> {project.cost} ₽</p>
            <p><strong>Статус:</strong> {project.status}</p>
            <p><strong>Комментарий:</strong> {project.comment}</p>
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
          <section className="mt-6">
            {creatingStageType !== null ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Создание этапа: {creatingStageType}</h2>
                  <button
                    onClick={() => setCreatingStageType(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition"
                  >
                    ❌ Отмена
                  </button>
                </div>

                <StageCreateForm
                  projectId={project.id}
                  stageType={creatingStageType}
                  onSuccess={() => setCreatingStageType(null)}
                />
              </div>
            ) : editingStageId !== null && editingStageType !== null ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Редактирование этапа</h2>
                  <button
                    onClick={() => {
                      setEditingStageId(null);
                      setEditingStageType(null);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition"
                  >
                    ❌ Отмена
                  </button>
                </div>

                <StageEditForm
                  stage={{ id: editingStageId, type: editingStageType }}
                  onSuccess={() => {
                    setEditingStageId(null);
                    setEditingStageType(null);
                  }}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button onClick={() => setCreatingStageType("pre-project")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Pre-project</button>
                  <button onClick={() => setCreatingStageType("conceptual design")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Conceptual design</button>
                  <button onClick={() => setCreatingStageType("detailed design")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Detailed design</button>
                  <button onClick={() => setCreatingStageType("material specification")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Material specification</button>
                  <button onClick={() => setCreatingStageType("author's supervisor")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Author supervision</button>
                </div>

                <h2 className="text-xl font-semibold mb-3 mt-6">Этапы (Stages)</h2>

                {project.stages && project.stages.length > 0 ? (
                  <ul className="space-y-3 list-decimal ml-6">
                    {project.stages.map((stage) => (
                      <li key={stage.id} className="p-3 border rounded">
                        <p><strong>Тип этапа:</strong> {stage.type}</p>
                        <p><strong>Задача:</strong> {stage.task}</p>
                        <p><strong>Статус:</strong> {stage.status}</p>

                        <button
                          onClick={() => {
                            setEditingStageId(stage.id);
                            setEditingStageType(stage.type as ServerStageType);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 text-sm"
                        >
                          ✏️ Редактировать
                        </button>

                        <button
                          onClick={() => handleStageDelete(stage.id)}
                          className="text-red-600 hover:text-red-800 text-sm ml-2"
                        >
                          🗑️ Удалить
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Этапы отсутствуют</p>
                )}
              </>
            )}
          </section>
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
            taskIds={project.tasks?.map(t => t.id) || []}
            onSuccess={() => setShowEdit(false)}
          />
        </>
      )}
    </div>
  );
};