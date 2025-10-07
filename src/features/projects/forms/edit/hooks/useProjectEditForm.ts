import { useUpdateProjectMutation } from "@/features/projects/api/projectApi";
import { ProjectUpdateFormValues, projectUpdateSchema } from "@/features/projects/services/validation/projectsCreateSchema";
import { ProjectId } from "@/features/projects/types/projectTypes";
import { useGetClientsQuery } from "@/share/api/usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    project: ProjectId;
    onSuccess?: () => void;
};

export function useProjectEditForm({ project, onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectUpdateFormValues>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues: {
        project_name: project.project_name,
        description: project.description || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        cost: Number(project.cost) || undefined,
        status: project.status || "",
        comment: project.comment || "",
        tasks: project.tasks?.length ? project.tasks.map(t => t.id) : [],
        },
    });

    const [updateProject] = useUpdateProjectMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { data: clients, isLoading: isClientsLoading } = useGetClientsQuery();

    const onSubmit = async (data: ProjectUpdateFormValues) => {
        try {
        await updateProject({ id: project.id, data }).unwrap();
        setSuccess(true);
        setErrorMsg(null);
        onSuccess?.();
        } catch (err) {
        console.error(err);
        setErrorMsg("Ошибка при обновлении проекта");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isClientsLoading,
        clients,
        onSubmit,
        errorMsg,
        success
    };
}