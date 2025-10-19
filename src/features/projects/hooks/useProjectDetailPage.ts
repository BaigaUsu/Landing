import { useDeleteStageMutation } from "@/features/stages/api/specificStages";
import { useDeleteProjectMutation, useGetProjectByIdQuery } from "../api/projectApi";
import { ServerStageUrlKind } from "@/features/stages/types/types";
import { useCallback } from "react";

type Props = {
    id: number;
    onDelete?: () => void;
};

export function useProjectDetailPage({ id, onDelete }: Props) {
    const { data: project, isLoading } = useGetProjectByIdQuery(id, { skip: !id });
    const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
    const [deleteStages] = useDeleteStageMutation();

    const handleStageDelete = async (stageId: number, kind: ServerStageUrlKind, projectId: number) => {
        try {
            await deleteStages({ id: projectId, kind, stageId }).unwrap();
            alert("Этап успешно удалён");
        } catch (err) {
            console.error(err);
            alert("Ошибка при удалении этапа");
        }
    };

    const handleDelete = useCallback(async () => {
        if (!project) return;
        if (confirm("Вы уверены, что хотите удалить проект?")) {
            onDelete?.();
            try {
                await deleteProject(project.id).unwrap();
                alert("Проект удалён");
            } catch (err) {
                console.error(err);
                alert("Ошибка при удалении проекта");
            }
        }
    }, [project, deleteProject, onDelete]);

    return {
        project,
        isLoading,
        isDeleting,
        handleStageDelete,
        handleDelete,
    };
}