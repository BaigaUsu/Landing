import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  StageUpdateFormValues,
  stageUpdateSchema,
} from "@/features/stages/service/validation/stagesSchema";


import { useStageUpdateMutation } from "./useStageMutation";
import { StageUpdateRequest } from "@/features/stages/types/stagesTypes";
import { useGetStagesByIdQuery } from "../../api/specificStages";
import { useGetStageKindsQuery } from "@/features/stages/api/stageKinds";

type Props = {
  stage: { id: number; kind: string; projectId: number };
  onSuccess?: () => void;
};

export function useStageForm({ stage, onSuccess }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { data: stageKinds = [] } = useGetStageKindsQuery();
  const stageKind = useMemo(() => 
    stageKinds.find((k) => k.slug === stage.kind),
    [stageKinds, stage.kind]
  );

  // Извлекаем массив строк-специализаций
  const availableSpecializations = useMemo(() => 
    stageKind?.specializations?.map(s => s.specialization) ?? [], 
    [stageKind]
  );
  /**
   * Получаем полный этап
   */
  const { data: fullStage, isLoading: isStageLoading } =
    useGetStagesByIdQuery({
      id: stage.projectId,
      kind: stage.kind,
      stageId: stage.id,
    });

  const formMethods = useForm<StageUpdateFormValues>({
    resolver: zodResolver(stageUpdateSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, watch, reset, formState } = formMethods;

  const { updateStage } = useStageUpdateMutation();

  /**
   * Заполняем форму
   */
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

      setSuccess(false);
    }
  }, [fullStage, reset]);

  /**
   * Submit
   */
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

      await updateStage({
        id: stage.projectId,
        kind: stage.kind,
        body: cleanedData,
        stageId: stage.id,
      });

      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      console.error("Stage update failed:", err);
      setErrorMsg(
        "Ошибка при обновлении этапа. Пожалуйста, попробуйте еще раз."
      );
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
    errorMsg,
    success,
    isSubmitting,
    stageType: stage.kind,
    watch,
    availableSpecializations,
  };
}