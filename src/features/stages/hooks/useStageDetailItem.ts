import { useGetStagesByIdQuery } from "../api/specificStages";
import { convertStageTypeToServerKind } from "../service/convertStageTypeToServerKind";
import { useDeleteSubStagesMutation } from "../subStages/api/subStagesApi";
import { ServerStageType, ServerStageUrlKind } from "../types/types";

type StageDetailItemProps = {
  stage: { id: number; kind: string };
  projectId: number;
};

export function useStageDetailItem({projectId, stage}: StageDetailItemProps) {
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

    return { 
        detailedStage, 
        isLoading, 
        isError, 
        handleDeleteSubStage, 
        isDeleting, stageKind  
    };
}