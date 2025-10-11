import { SubStageFormData, subStageSchema } from "@/features/stages/subStages/services/validation/subStagesSchema";
import { useCreateSubStagesMutation } from "../../api/subStagesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ServerStageUrlKind } from "@/features/stages/types/types";

type Props = {
    projectId: number;
    stageId: number;
    stageKind: ServerStageUrlKind;
    onSuccess: () => void;
};

export function useSubStageCreateForm ({ projectId, stageId, stageKind, onSuccess }: Props) {
    const [createSubStage, { isLoading }] = useCreateSubStagesMutation();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SubStageFormData>({
        resolver: zodResolver(subStageSchema),
    });

    const onSubmit = async (data: SubStageFormData) => {
        try {
            await createSubStage({
                id: projectId,
                kind: stageKind,
                stageId: stageId,
                body: {
                    ...data,
                    // Убедимся, что пустые строки отправляются как null
                    start_date: data.start_date || null,
                    end_date: data.end_date || null,
                }
            }).unwrap();
            
            alert("Подэтап успешно создан!");
            onSuccess();
        } catch (err) {
            console.error("Ошибка при создании подэтапа:", err);
            alert("Произошла ошибка");
        }
    };
    return { register, handleSubmit, errors, onSubmit, isLoading };
}