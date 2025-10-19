"use client";

import { useState } from "react";
import { ProjectEditForm } from "@/features/projects/forms/edit/components/ProjectEditForm";
import Link from "next/link";
import { StageCreateForm } from "../../stages/create/components/StageCreationForm";
import { StageEditForm } from "../../stages/edit/components/StageEditForm";
import { ServerStageType } from "@/features/stages/types/types";
import { StageDetailItem } from "@/features/stages/components/StageDetailItem";
import { convertStageTypeToServerKind } from "@/features/stages/service/convertStageTypeToServerKind";
import FileUploader from "./FileUploader";
import { SubStageCreateForm } from "@/features/stages/subStages/create/components/SubStageCreateForm";
import { useProjectDetailPage } from "../hooks/useProjectDetailPage";

type Props = {
  id: number;
  onDelete?: () => void;
};

export const ProjectDetailPage = ({ id, onDelete }: Props) => {
    const { project, isLoading, isDeleting, handleStageDelete, handleDelete } = useProjectDetailPage({ id, onDelete });

    const [editingStageId, setEditingStageId] = useState<number | null>(null);
    const [editingStageType, setEditingStageType] = useState<ServerStageType | null>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [creatingStageType, setCreatingStageType] = useState<ServerStageType | null>(null);
    const [showSubForm, setShowSubForm] = useState<number | null>(null);

    const FILE_CATEGORIES = [
        { key: "documents", label: "Документы" },
        { key: "final-project", label: "Финальный проект" },
        { key: "estimate", label: "Смета" },
        { key: "suppliers", label: "Поставщики" },
      ] as const;

    if (isLoading) return <p>Загрузка данных проекта...</p>;
    if (!project) return <p className="text-gray-500 italic">Проект не найден</p>;

    

    return (
        <div>
            {!showEdit ? (
                <>
                <h1 className="flex items-center text-2xl font-bold mb-4">{project.project_name}</h1>

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
                    {FILE_CATEGORIES.map(cat => (
                        <div key={cat.key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                        <h3 className="text-gray-700 font-medium text-lg">{cat.label}</h3>
                        <FileUploader id={String(project.id)} category={cat.key} />
                        </div>
                    ))}
                </div>
                
                <div className="mb-6 space-y-2">
                    <p><strong>Имя:</strong> {project.customer_name} </p>
                    <p><strong>Фамилия:</strong> {project.customer_surname} </p>
                    <p><strong>Почта:</strong> {project.customer_email} </p>
                    <p><strong>Проект Менеджер:</strong> {project.project_manager ?? "Отсутствует"}</p>
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
                                stage={{ id: editingStageId, type: editingStageType, projectId: project.id }}
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

                        <h2 className="text-xl font-semibold mb-3 mt-6">Этапы</h2>

                        {project.stages && project.stages.length > 0 ? (
                            <ul className="space-y-6">
                                {project.stages.map((stage) => (
                                    <li key={stage.id} className="border rounded p-4">
                                        <StageDetailItem
                                        projectId={project.id}
                                        stage={stage}
                                        onEdit={() => {
                                            setEditingStageId(stage.id);
                                            setEditingStageType(stage.kind as ServerStageType);
                                        }}
                                        onDelete={(stageId, kind, projectId) => 
                                            handleStageDelete(stageId, kind, projectId)
                                        }
                                        />

                                        {/* Добавление подэтапа */}
                                        <div className="mt-3">
                                            {showSubForm === stage.id ? (
                                                <SubStageCreateForm
                                                    projectId={project.id}
                                                    stageId={stage.id}
                                                    stageKind={convertStageTypeToServerKind(stage.kind as ServerStageType)}
                                                    onSuccess={() => setShowSubForm(null)}
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => setShowSubForm(stage.id)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 border border-blue-500 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                                                >
                                                    ➕ Добавить подэтап
                                                </button>
                                            )}
                                        </div>
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