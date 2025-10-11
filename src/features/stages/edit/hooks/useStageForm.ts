import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    StageUpdateFormValues, 
    stageUpdateSchema,
} from "@/features/stages/service/validation/stagesSchema";
import { STAGE_SPECIALIZATIONS_CONFIG, useSpecializationsByStage } from "./useSpecializationsByStage";
import { ServerStageType, ServerStageUrlKind, StageWithType } from "../../types/types";
import { useStageUpdateMutation } from "./useStageMutation";
import { StageUpdateRequest } from "@/features/stages/types/stagesTypes";
import { useGetStagesByIdQuery } from "../../api/specificStages";
import { convertStageTypeToServerKind } from "../../service/convertStageTypeToServerKind";

type Props = {
    stage: StageWithType;
    onSuccess?: () => void;
}

export function useStageForm({stage, onSuccess}: Props) {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validStageTypes = Object.keys(STAGE_SPECIALIZATIONS_CONFIG) as ServerStageType[];

    const stageType: ServerStageType = validStageTypes.includes(stage.type as ServerStageType)
        ? stage.type as ServerStageType
        : 'pre-project';

    const stageTypeApi: ServerStageUrlKind = convertStageTypeToServerKind(stageType);

    const { data: fullStage, isLoading: isStageLoading } = useGetStagesByIdQuery({
        id: stage.projectId,
        kind: stageTypeApi,
        stageId: stage.id,
    });    
    const { specializations, isLoading: isLoadingSpec } = useSpecializationsByStage(stageType);

    
    
    
    const formMethods = useForm<StageUpdateFormValues>({
        resolver: zodResolver(stageUpdateSchema),
        mode: "onChange"
    });
    const { register, handleSubmit, watch, reset, formState } = formMethods;

    const { updateStage, isLoading } = useStageUpdateMutation();

    useEffect(() => {
        if (fullStage) {
            reset({
                task: fullStage.task,
                specialization: fullStage.specialization || "",
                worker: fullStage.worker?.id || null,
                start_date: fullStage.start_date || "",
                end_date: fullStage.end_date || "",
                piece_rate_pay: fullStage.piece_rate_pay || undefined,
                status: fullStage.status || "",
                comment: fullStage.comment || "",
            });
            setSuccess(false); // Сброс статуса при новой загрузке
        }
    }, [fullStage, reset]);

    const onSubmit = async (data: StageUpdateFormValues) => {
        setIsSubmitting(true);
        setErrorMsg(null);
        
        try {
            const cleanedData: StageUpdateRequest = {
                task: data.task,
                specialization: data.specialization,
                worker: data.worker ?? null,
                start_date: data.start_date,
                end_date: data.end_date,
                piece_rate_pay: data.piece_rate_pay?.toString() ?? null,
                status: data.status,
            };

            await updateStage( {
                id: stage.projectId,
                kind: stageTypeApi,
                body: cleanedData,
                stageId: stage.id,
            });

            setSuccess(true);
            onSuccess?.();
        } catch (err) {
            console.error("Stage update failed:", err);
            setErrorMsg("Ошибка при обновлении этапа. Пожалуйста, попробуйте еще раз.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        register,
        handleSubmit,
        formState,
        onSubmit,
        fullStage,
        isStageLoading,
        isLoadingSpec,
        errorMsg,
        success,
        isSubmitting,
        stageType,
        watch,
        specializations,
    };
}