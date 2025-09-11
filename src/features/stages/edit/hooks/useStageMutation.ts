// src/features/stages/edit/hooks/useStageUpdateMutation.ts
import { StageUpdateRequest } from "@/share/types/stages/stagesTypes";
import { ServerStageUrlKind } from "../../types/types";
import { useUpdateStagesMutation } from "../../api/specificStages";

export const useStageUpdateMutation = () => {
    const [trigger, { isLoading, isError, error }] = useUpdateStagesMutation();

    const updateStage = async (args: { 
        id: number; 
        kind: ServerStageUrlKind; 
        body: StageUpdateRequest;
        stageId: number;
    }) => {
        return trigger({
            id: args.id,
            kind: args.kind,
            body: args.body,
            stageId: args.stageId,
        }).unwrap();
    };

    return { updateStage, isLoading, isError, error };
};