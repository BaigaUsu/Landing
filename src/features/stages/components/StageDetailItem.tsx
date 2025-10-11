"use client";

import { ServerStageType, ServerStageUrlKind } from "@/features/stages/types/types";
import { SubStageList } from "../subStages/types/subStagesTypes";
import { StagesFileUploader } from "./StagesFileUploader";
import { SubStagesFileUploader } from "../subStages/components/SubStagesFileUploader";
import { useStageDetailItem } from "../hooks/useStageDetailItem";

type StageDetailItemProps = {
    stage: { id: number; kind: string };
    projectId: number;
    onEdit: (stageId: number, stageType: ServerStageType) => void;
    onDelete: (stageId: number, kind: ServerStageUrlKind, projectId: number) => void;
};

const FILE_CATEGORIES_MAP: Record<ServerStageUrlKind, string[]> = {
    'pre-projects': ['documents','media'],
    'conceptual-designs': ['documents','render'],
    'detailed-designs': ['documents','drawings'],
    'material-specifications': ['documents'],
    'authors-supervisors': ['documents','suppliers'],
  };

const SUB_STAGES_FILE_CATEGORIES = [
    { key: "documents", label: "Документы" },
    { key: "drawings", label: "Картинки" },
    { key: "render", label: "Рендер" },
] as const;

export const StageDetailItem = ({ stage, projectId, onEdit, onDelete }: StageDetailItemProps) => {

    const { detailedStage, isLoading, isError, handleDeleteSubStage, isDeleting, stageKind } = useStageDetailItem({projectId, stage});

    if (isLoading) return <p className="p-3 border rounded">Загрузка данных этапа...</p>;
    if (isError || !detailedStage) return <p className="p-3 border rounded text-red-500">Ошибка при загрузке этапа.</p>;
  
    return (
        <div className="space-y-2">
            {/* Основная информация об этапе */}
            <div>
                <p><strong>Тип этапа:</strong> {detailedStage.kind}</p>
                <p><strong>Задача:</strong> {detailedStage.task}</p>
                <p><strong>Статус:</strong> {detailedStage.status}</p>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => onEdit(detailedStage.id, detailedStage.kind as ServerStageType)}
                    className="text-yellow-600 hover:text-yellow-800 text-sm"
                >
                    ✏️ Редактировать
                </button>
                <button
                    onClick={() => onDelete(detailedStage.id, stageKind, projectId)}
                    className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
                >
                    Удалить
                </button>
            </div>

            {FILE_CATEGORIES_MAP[stageKind].map(cat => (
                <StagesFileUploader
                    key={cat}
                    id={projectId}
                    kind={stageKind}
                    stageId={stage.id}
                    category={cat}
                />
            ))}

            {/* Подэтапы */}
            {detailedStage.substages && detailedStage.substages.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                    <h4 className="font-semibold text-md mb-2">Подэтапы:</h4>
                    <ul className="space-y-2 list-disc ml-5">
                        {detailedStage.substages.map((substage: SubStageList) => (
                            <li key={substage.id} className="text-sm">
                                <p><strong>Подэтап:</strong> {substage.title || "Нет имени"}</p>
                                <p><strong>Статус:</strong> {substage.status}</p>
                                <p><strong>Задача:</strong> {substage.task}</p>

                                <button
                                    onClick={() => handleDeleteSubStage(substage.id)}
                                    disabled={isDeleting}
                                    className="mt-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 disabled:opacity-50"
                                >
                                {isDeleting ? "Удаление..." : "Удалить подэтап"}
                                </button>

                                {SUB_STAGES_FILE_CATEGORIES.map(cat => (
                                    <div key={cat.key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                                    <h3 className="text-gray-700 font-medium text-lg">{cat.label}</h3>
                                    <SubStagesFileUploader id={projectId} kind={stageKind} stageId={stage.id} subStageId={substage.id} category={cat.key} />
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};