"use client";

import { useGetStagesByIdQuery } from "@/features/stages/api/specificStages";
import { ServerStageType, ServerStageUrlKind } from "@/features/stages/types/types";
import { convertStageTypeToServerKind } from "../service/convertStageTypeToServerKind";
import { SubStageList } from "../subStages/types/subStagesTypes";
import { useDeleteSubStagesMutation } from "../subStages/api/subStagesApi";
import { StagesFileUploader } from "./StagesFileUploader";

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

export const StageDetailItem = ({ stage, projectId, onEdit, onDelete }: StageDetailItemProps) => {
  const stageKind = convertStageTypeToServerKind(stage.kind as ServerStageType);

  const { data: detailedStage, isLoading, isError } = useGetStagesByIdQuery({
    id: projectId,
    kind: stageKind,
    stageId: stage.id,
  });

  const [deleteSubStage, { isLoading: isDeleting }] = useDeleteSubStagesMutation();

  const handleDeleteSubStage = async (subStageId: number) => {
    try {
      await deleteSubStage({
        id: projectId,
        kind: stageKind,
        stageId: stage.id,
        subStageId,
      }).unwrap();
    } catch (err) {
      console.error("Ошибка при удалении подэтапа", err);
    }
  };

  if (isLoading) return <li className="p-3 border rounded">Загрузка данных этапа...</li>;
  if (isError || !detailedStage) return <li className="p-3 border rounded text-red-500">Ошибка при загрузке этапа.</li>;
  
  return (
    <li className="space-y-2">
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
                ))};

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
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};