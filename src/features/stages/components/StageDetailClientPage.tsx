"use client";

import { useRouter } from "next/navigation";
import { StageDetailItem } from "./StageDetailItem";
import { ServerStageType, ServerStageUrlKind } from "@/features/stages/types/types";
import { useDeleteStageMutation } from "@/features/stages/api/specificStages";

// 1. Props, которые этот компонент получит от серверной страницы
type Props = {
  projectId: number;
  stageId: number;
  kind: string;
};

export function StageDetailClientPage({ projectId, stageId, kind }: Props) {
  const router = useRouter();
  
  // 2. Инициализируем всю клиентскую логику (хуки)
  const [deleteStage] = useDeleteStageMutation();

  // 3. Создаем "умные" обработчики
  const handleEdit = (id: number, stageType: ServerStageType) => {
    // Здесь вы решаете, что делать при редактировании на отдельной странице
    // Например, перейти на страницу редактирования:
    console.log("Переход на страницу редактирования...", id, stageType);
    router.push(`/projects/${projectId}/stages/${kind}/${id}/edit`);
  };

  const handleDelete = async (id: number, stageKind: ServerStageUrlKind, projId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот этап?")) return;
    
    try {
      // Используем мутацию для удаления
      await deleteStage({ id: projId, kind: stageKind, stageId: id }).unwrap();
      
      // После успеха, уводим пользователя назад на страницу проекта
      router.push(`/projects/${projId}`);
    } catch (error) {
      console.error("Ошибка при удалении этапа:", error);
      alert("Не удалось удалить этап.");
    }
  };

  // 4. Рендерим "глупый" компонент и передаем ему созданную логику
  return (
    <>
      {/* Кнопка "Назад", которая тоже требует useRouter */}
      <button
        onClick={() => router.push(`/projects/${projectId}`)}
        className="text-blue-600 hover:text-blue-800 text-sm mb-4"
      >
        ← Назад к проекту
      </button>

      <StageDetailItem
        stage={{ id: stageId, kind: kind }}
        projectId={projectId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}