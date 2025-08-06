"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "@/features/projects/api/projectApi";
import { useState } from "react";
import { projectSchema } from "@/share/services/auth/validation/authSchema";
import { useGetClientsQuery } from "@/share/api/usersApi";
import { useGetApplicationLabelsQuery } from "@/features/applications/api/appApi";

type FormValues = z.infer<typeof projectSchema>;

type Props = {
  onSuccess?: () => void;
};

export const ProjectCreateForm = ({ onSuccess }: Props) => {
  const [createProject] = useCreateProjectMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: applicationOptions, isLoading: isAppLoading } = useGetApplicationLabelsQuery();
  const { data: clientOptions, isLoading: isClientLoading } = useGetClientsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      client: data.client ?? null,
      application: data.application ?? null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold">Создание проекта</h2>

      {/* Название проекта */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Название проекта</label>
        <input
          {...register("project_name")}
          className="border border-gray-300 rounded px-3 py-2"
        />
        {errors.project_name && <p className="text-red-600 text-sm">{errors.project_name.message}</p>}
      </div>

      {/* Клиент */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Клиент</label>
        {isClientLoading ? (
          <p className="italic text-gray-500">Загрузка клиентов...</p>
        ) : (
          <select
            {...register("client", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="" hidden>Не выбрано</option>
            {clientOptions?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.email}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Описание */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Описание</label>
        <textarea
          {...register("description")}
          className="border border-gray-300 rounded px-3 py-2"
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      {/* Даты начала и конца */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Дата начала</label>
          <input
            type="date"
            {...register("start_date")}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Дата окончания</label>
          <input
            type="date"
            {...register("end_date")}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Стоимость */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Стоимость</label>
        <input
          {...register("cost", {
            setValueAs: (v) => (v === "" ? null : parseFloat(v)),
          })}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Статус */}
      {/* <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Статус</label>
        <select
          {...register("status")}
          defaultValue="in-progress"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
          <option value="not-completed">not-completed</option>
        </select>
        {errors.status && (
          <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
        )}
      </div> */}

      {/* Заявка */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Заявка</label>
        {isAppLoading ? (
          <p className="italic text-gray-500">Загрузка заявок...</p>
        ) : (
          <select
            {...register("application", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="" hidden>Не выбрано</option>
            {applicationOptions?.map((app) => (
              <option key={app.id} value={app.id}>
                {app.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Сообщения */}
      {success && <p className="text-green-600">✅ Проект успешно создан</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Создать проект
      </button>
    </form>
  );
};