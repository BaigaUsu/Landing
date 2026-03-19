import { useState } from "react";
import { useStageCreateMutation } from "./useStateCreateMutation";
import { useForm } from "react-hook-form";
import { StageFormValues, stageSchema } from "../../service/validation/stagesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StageKind } from "../../types/types";

type Props = {
    projectId: number;
    stageKind: StageKind;
    onSuccess?: () => void;
};

export function useStageCreationForm({ projectId, onSuccess, stageKind }: Props) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const availableSpecializations =
  stageKind?.specializations?.map(s => s.specialization) ?? []
    const stageKindApi = stageKind.slug;
    const { create } = useStageCreateMutation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<StageFormValues>({
            resolver: zodResolver(stageSchema),
            defaultValues: {
                specialization: "", // Устанавливаем начальное значение
            }
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
                kind: stageKindApi,   // <- сюда пойдёт "pre-projects" / "conceptual-designs"
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
        isSubmitting,
        submitError,
        submitSuccess,
        availableSpecializations,
    };
}