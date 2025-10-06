import { useCreateProjectMutation } from "@/features/projects/api/projectApi";
import { ProjectCreateFormValues, projectCreateSchema } from "@/features/projects/services/validation/projectsCreateSchema";
import { useGetClientsQuery } from "@/share/api/usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    taskIds?: number[];
    applicationId?: number;
    onSuccess?: () => void;
}

export function useProjectCreationForm({ taskIds, applicationId, onSuccess }: Props) {
    const [createProject] = useCreateProjectMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { data: clientOptions, isLoading: isClientLoading } = useGetClientsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectCreateFormValues>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
        project_name: "",
        client: 0,
        description: "",
        start_date: "",
        end_date: "",
        cost: 0,
        application: applicationId || null,
        tasks: taskIds || [], // ← вот так
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
        isClientLoading,
        clientOptions,
    };
}