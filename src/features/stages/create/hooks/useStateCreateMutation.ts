import { useCreateStagesMutation } from "@/features/stages/api/specificStages";
import { StageCreateRequest } from "@/features/stages/types/stagesTypes";
import { ServerStageUrlKind } from "../../types/types";

export const useStageCreateMutation = () => {
    const [createStage, { isLoading, isError, error }] = useCreateStagesMutation();

    const create = async (args: { 
        projectId: number; 
        kind: ServerStageUrlKind; 
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