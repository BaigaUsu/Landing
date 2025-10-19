import { usePatchProjectMutation } from "@/features/projects/api/projectApi";
import { ProjectUpdateFormValues, projectUpdateSchema } from "@/features/projects/services/validation/projectsSchema";
import { ProjectId } from "@/features/projects/types/projectTypes";
import { useGetStaffsQuery } from "@/share/api/staffApi";
import { useGetClientsQuery } from "@/share/api/customersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    project: ProjectId;
    onSuccess?: () => void;
};

export function useProjectEditForm({ project, onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectUpdateFormValues>({
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

   

    const [updateProject] = usePatchProjectMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { data: customer, isLoading: isCustomerLoading } = useGetClientsQuery();
    const { data: projectManagers, isLoading: isProjectManagersLoading } = useGetStaffsQuery(); // Assuming project managers are fetched similarly

    useEffect(() => {
        if (project) {
          reset({
            project_name: project.project_name,
            description: project.description || "",
            start_date: project.start_date || "",
            end_date: project.end_date || "",
            cost: Number(project.cost) || undefined,
            status: project.status || "",
            comment: project.comment || "",
            customer: project.customer ?? null,
            project_manager: project.project_manager ?? null,
            tasks: project.tasks?.length ? project.tasks.map(t => t.id) : [],
          });
        }
      }, [project, reset]);

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
        isCustomerLoading,
        customer,
        projectManagers,
        isProjectManagersLoading,
        onSubmit,
        errorMsg,
        success
    };
}