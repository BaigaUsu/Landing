// features/tasks/components/TaskCreateForm/useTaskForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateTaskMutation } from "@/features/tasks/api/tasksApi";
import { FormValues, taskCreateSchema } from "@/features/tasks/services/validation/taskSchema";
import { Props } from "../types/taskCreationTypes";
import { useGetManagerStaffQuery } from "@/share/api/managerStaffApi";

export const useTaskCreationForm = (props: Props) => {
    const { onSuccess } = props;
    const [createTask] = useCreateTaskMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const {data: assignees, isLoading: isAssigneesLoading} = useGetManagerStaffQuery();

    const defaultValues = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        action: "",
        action_date: "", 
        action_time: "",
        assignees: assignees?.results.map(user => user.id)|| [],
        previous_task: props.type === "form-task" ? props.previousTaskId : null,
        application:
        props.type === "form-task" || props.type === "form-application"
            ? props.applicationId
            : null,
        project: props.type === "form-task" ? props.projectId || null : null,
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues,
    });
    
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: FormValues) => {

        try {
            await createTask(data).unwrap();
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
        assignees,
        isAssigneesLoading,
        onSubmit,
        success,
        errorMsg,
        register, 
        handleSubmit,
        errors
    };
};