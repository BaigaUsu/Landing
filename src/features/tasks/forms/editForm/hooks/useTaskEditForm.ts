// src/features/tasks/hooks/useTaskEditForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUpdateTaskMutation } from "@/features/tasks/api/tasksApi";
import { TaskId } from "@/features/tasks/types/taskType";
import { TaskFormData, taskUpdateSchema } from "@/features/tasks/services/validation/taskSchema";

type Props = {
    task: TaskId;
    onSuccess?: () => void;
};
export function useTaskEditForm({ task, onSuccess }: Props) {
    
    const [updateTask] = useUpdateTaskMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskUpdateSchema),
        defaultValues: {
            name: task.name,
            surname: task.surname,
            email: task.email,
            phone_number: task.phone_number,
            action: task.action,
            action_date: task.action_date,
            action_time: task.action_time,
            status: task.status,
            project: task.project?.id || undefined,
        },
    });

    const onSubmit = async (data: TaskFormData) => {
        setErrorMsg(null);
        setSuccess(false);
        if (data.status === task.status) {
            setErrorMsg("Необходимо изменить статус задачи (например, на 'done-positive' или 'done-negative').");
            return;
        }
        try {
            console.log("Отправляемые данные:", data);
            await updateTask({ id: task.id, data }).unwrap();
            setSuccess(true);
            setErrorMsg(null);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            setSuccess(false);
            setErrorMsg("Ошибка при обновлении задачи");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        errorMsg,
        success,
    };
}