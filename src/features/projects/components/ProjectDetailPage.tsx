"use client";

import { useState } from "react";
import { ProjectEditForm } from "@/features/projects/forms/edit/components/ProjectEditForm";
import Link from "next/link";
import { StageCreateForm } from "../../stages/create/components/StageCreationForm";
import { StageEditForm } from "../../stages/edit/components/StageEditForm";
import { StageDetailItem } from "@/features/stages/components/StageDetailItem";
import FileUploader from "./FileUploader";
import { SubStageCreateForm } from "@/features/stages/subStages/create/components/SubStageCreateForm";
import { useProjectDetailPage } from "../hooks/useProjectDetailPage";
import { useGetStageKindsQuery } from "@/features/stages/api/stageKindsApi";
import { StageKind } from "@/features/stages/types/types";
import { StageKindCreationForm } from "@/features/stages/create/components/StageKindCreation";

type Props = {
  id: number;
  onDelete?: () => void;
};

export const ProjectDetailPage = ({ id, onDelete }: Props) => {
    const { project, isLoading, isDeleting, handleStageDelete, handleDelete } = useProjectDetailPage({ id, onDelete });

    const [editingStageId, setEditingStageId] = useState<number | null>(null);
    const [editingStageKind, setEditingStageKind] = useState<StageKind | null>(null);
    const { data: stageKinds = [], isLoading: stageKindLoading } = useGetStageKindsQuery();
    const [showEdit, setShowEdit] = useState(false);
    const [creatingStageKind, setCreatingStageKind] = useState<StageKind | null>(null);
    const [showSubForm, setShowSubForm] = useState<number | null>(null);
    const [isCreatingKind, setIsCreatingKind] = useState(false);

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
                    <p><strong>Имя:</strong> {project.customer.name} </p>
                    <p><strong>Фамилия:</strong> {project.customer.surname} </p>
                    <p><strong>Почта:</strong> {project.customer.email} </p>
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
                    {creatingStageKind !== null ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => setCreatingStageKind(null)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition"
                                >
                                    ❌ Отмена
                                </button>
                            </div>

                            <StageCreateForm
                                projectId={project.id}
                                stageKind={creatingStageKind}
                                onSuccess={() => setCreatingStageKind(null)}
                            />
                        </div>
                    ) : editingStageId !== null && editingStageKind !== null ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Редактирование этапа</h2>
                            <button
                                onClick={() => {
                                setEditingStageId(null);
                                setEditingStageKind(null);
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition"
                            >
                                ❌ Отмена
                            </button>
                            </div>

                            <StageEditForm
                                stage={{ id: editingStageId, kind: editingStageKind.slug, projectId: project.id }}
                                onSuccess={() => {
                                    setEditingStageId(null);
                                    setEditingStageKind(null);
                                }}
                            />
                        </div>
                    ) : (
                        <>
                        <div className="flex flex-wrap gap-3 mt-4">
                        {stageKinds.map((kind) => (
                            <button
                            key={kind.slug}
                            onClick={() => setCreatingStageKind(kind)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                            >
                            {kind.kind_name}
                            </button>
                        ))}
                        {/* Кнопка открытия формы создания НОВОГО типа */}
                        {!isCreatingKind ? (
                            <button
                            onClick={() => setIsCreatingKind(true)}
                            className="border-2 border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded transition flex items-center gap-2"
                            >
                            <span>➕</span> Создать новый тип
                            </button>
                        ) : (
                            <div className="w-full mt-4 p-4 border rounded-lg bg-gray-50 relative">
                            <button 
                                onClick={() => setIsCreatingKind(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                            <StageKindCreationForm onSuccess={() => setIsCreatingKind(false)} />
                            </div>
                        )}
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
                                            const kindObject = stageKinds.find(k => k.slug === stage.kind);
                                            setEditingStageKind(kindObject || null);
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
                                                    stageKind={stage.kind}
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