import { useCreateStagesMutation } from "@/features/stages/api/specificStages";
import { StageCreateRequest } from "@/features/stages/types/stagesTypes";

export const useStageCreateMutation = () => {
    const [createStage, { isLoading, isError, error }] = useCreateStagesMutation();

    const create = async (args: { 
        projectId: number; 
        kind: string; 
        body: StageCreateRequest;
    }) => {
        return createStage({
            id: args.projectId,
            kind: args.kind,
            body: args.body,
        }).unwrap();
    };

    return { create, isLoading, isError, error };
};