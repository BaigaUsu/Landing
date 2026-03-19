import { useGetStagesByIdQuery } from "../api/specificStages";
import { useDeleteSubStagesMutation } from "../subStages/api/subStagesApi";

type StageDetailItemProps = {
  stage: { id: number; kind: string };
  projectId: number;
};

export function useStageDetailItem({projectId, stage}: StageDetailItemProps) {
    const stageKind = (stage.kind);
    
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