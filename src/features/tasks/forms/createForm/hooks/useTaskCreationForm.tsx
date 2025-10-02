// features/tasks/components/TaskCreateForm/useTaskForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateTaskMutation } from "@/features/tasks/api/tasksApi";
import { FormValues, taskSchema } from "@/features/tasks/services/validation/taskSchema";
import { Props } from "../types/taskCreationTypes";

export const useTaskCreationForm = (props: Props) => {
    const { onSuccess } = props;
    const [createTask] = useCreateTaskMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const defaultValues = {
        previous_task: props.type === "form-task" ? props.previousTaskId : null,
        application:
        props.type === "form-task" || props.type === "form-application"
            ? props.applicationId
            : null,
        project: props.type === "form-task" ? props.projectId || null : null,
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues,
    });
    
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: FormValues) => {
        const payload = {
            ...data,
            application: data.application ? Number(data.application) : null,
            previous_task: data.previous_task ?? null,
            action: data.action || null,
            action_date: data.action_date || null,
            action_time: data.action_time || null,
        };

        try {
            await createTask(payload).unwrap();
            setSuccess(true);
            setErrorMsg(null);
            form.reset();
            onSuccess?.();
        } catch (err) {
            console.error("Ошибка при создании:", err);
            setErrorMsg("Произошла ошибка при создании задачи");
        }
    };

    return {
        form,
        onSubmit,
        success,
        errorMsg,
        register, 
        handleSubmit,
        errors
    };
};