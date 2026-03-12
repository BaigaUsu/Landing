import { useState } from "react";
import { getAvailableSpecializationNames, useSpecializationsByStage } from "../../hooks/useSpecializationsByStage";
import { ServerStageType, ServerStageUrlKind } from "../../types/types";
import { convertStageTypeToServerKind } from "../../service/convertStageTypeToServerKind";
import { useStageCreateMutation } from "./useStateCreateMutation";
import { useForm } from "react-hook-form";
import { StageFormValues, stageSchema } from "../../service/validation/stagesSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    projectId: number;
    stageType: ServerStageType;
    onSuccess?: () => void;
};

export function useStageCreationForm({ projectId, onSuccess, stageType }: Props) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {specializations} = useSpecializationsByStage(stageType);
    const isLoading = !specializations.length;
    
    const availableSpecializations = getAvailableSpecializationNames(stageType);
    const stageTypeApi: ServerStageUrlKind = convertStageTypeToServerKind(stageType);
    const { create } = useStageCreateMutation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<StageFormValues>({
            resolver: zodResolver(stageSchema),
        });

    const onSubmit = async (data: StageFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);
    
        const payload = {
            ...data,
            worker: data.worker
        };
    
        try {
            await create({
                projectId,
                kind: stageTypeApi,   // <- сюда пойдёт "pre-projects" / "conceptual-designs"
                body: payload,
            });
        
                setSubmitSuccess(true);
                reset();
                onSuccess?.();
        } catch (err) {
                console.error("Stage creation failed:", err);
                setSubmitError("Ошибка при создании этапа. Пожалуйста, попробуйте еще раз.");
        } finally {
                setIsSubmitting(false);
        }
    };

    return {
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isLoading,
        isSubmitting,
        submitError,
        submitSuccess,
        availableSpecializations,
        specializations
    };
}