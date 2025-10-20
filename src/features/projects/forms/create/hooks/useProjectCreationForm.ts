import { useCreateProjectMutation } from "@/features/projects/api/projectApi";
import { ProjectCreateFormValues, projectCreateSchema } from "@/features/projects/services/validation/projectsSchema";
import { useGetCustomersQuery } from "@/share/api/customersApi";
import { useGetManagerStaffQuery } from "@/share/api/managerStaffApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    taskIds?: number[];
    applicationId?: number;
    onSuccess?: () => void;
}

export function useProjectCreationForm({ taskIds, applicationId, onSuccess}: Props) {
    const [createProject] = useCreateProjectMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { data: customerOptions, isLoading: isCustomerLoading } = useGetCustomersQuery();
    const { data: projectManagers, isLoading: isProjectManagersLoading } = useGetManagerStaffQuery(); // Assuming project managers are fetched similarly
  
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectCreateFormValues>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            project_name: "",
            customer: undefined,
            project_manager: undefined,
            description: "",
            start_date: "",
            end_date: "",
            cost: undefined,
            application: applicationId || null,
            tasks: taskIds || [],
        }
    });

    const onSubmit = async (data: ProjectCreateFormValues) => {
        const payload: ProjectCreateFormValues = {
            ...data,
            cost: Number(data.cost), // превращаем строку в число
        };
        try {
            await createProject(payload).unwrap();
            setSuccess(true);
            setErrorMsg(null);
            reset();
            onSuccess?.();
        } catch (err) {
            console.error("Ошибка при создании проекта:", err);
            setErrorMsg("Произошла ошибка при создании проекта");
        }
    };
    return {
        onSubmit,
        success,
        errorMsg,
        register,
        handleSubmit,
        errors,
        isCustomerLoading,
        customerOptions,
        projectManagers,
        isProjectManagersLoading,
    };
}