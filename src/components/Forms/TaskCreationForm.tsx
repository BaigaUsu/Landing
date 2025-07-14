"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTaskMutation, useGetTaskLabelsQuery } from "@/api/tasksApi";
import { useGetApplicationLabelsQuery } from "@/api/appApi";
import { useGetProjectLabelsQuery } from "@/api/projectApi";
import { taskSchema } from "@/services/auth/validation/authSchema";
import { useState } from "react";

type FormValues = z.infer<typeof taskSchema>;

type Props = {
  onSuccess?: () => void;
};

export const TaskCreateForm = ({ onSuccess }: Props) => {
  const [createTask] = useCreateTaskMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: taskOptions, isLoading: isTaskLoading } = useGetTaskLabelsQuery();
  const { data: applicationOptions, isLoading: isApplicationLoading } = useGetApplicationLabelsQuery();
  const { data: projectOptions, isLoading: isProjectLoading } = useGetProjectLabelsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      application: data.application ? Number(data.application) : null,
      project: data.project ? Number(data.project) : null,
      previous_task: data.previous_task ? Number(data.previous_task) : null,
      action: data.action || null,
      action_date: data.action_date || null,
      action_time: data.action_time || null,
    };

    try {
      await createTask(payload).unwrap();
      setSuccess(true);
      setErrorMsg(null);
      reset();
      onSuccess?.();
    } catch (err) {
      console.error("Ошибка при создании:", err);
      setErrorMsg("Произошла ошибка при создании задачи");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold">Создание новой задачи</h2>

      {/* Основные поля */}
      {[
        { label: "Имя", name: "name" },
        { label: "Фамилия", name: "surname" },
        { label: "Email", name: "email", type: "email" },
        { label: "Телефон", name: "phone_number", type: "tel" },
        { label: "Дата действия", name: "action_date", type: "date" },
        { label: "Время действия", name: "action_time", type: "time" },
      ].map((field, idx) => (
        <div key={idx} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{field.label}</label>
          <input
            {...register(field.name as keyof FormValues)}
            type={field.type || "text"}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors[field.name as keyof FormValues] && (
            <p className="text-red-600 text-sm mt-1">
              {errors[field.name as keyof FormValues]?.message as string}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Действие</label>
          <select
          {...register("action")}
          defaultValue="Действие"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <option value="" hidden>Не выбрано</option>
          <option value="meet">meet</option>
          <option value="call">call</option>
          </select>
          {errors.action && (
          <p className="text-red-600 text-sm mt-1">{errors.action.message}</p>
          )}
      </div>

      {/* Предыдущая задача */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Предыдущая задача</label>
        {isTaskLoading ? (
          <p className="text-sm italic text-gray-500">Загрузка...</p>
        ) : (
          <select
            {...register("previous_task", {
              setValueAs: (v) => v === "" ? null : Number(v),
            })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Не выбрано</option>
            {taskOptions?.map((task) => (
              <option key={task.id} value={task.id}>
                {task.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Заявка */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Заявка</label>
        {isApplicationLoading ? (
          <p className="text-sm italic text-gray-500">Загрузка...</p>
        ) : (
          <select
            {...register("application", {
              setValueAs: (v) => v === "" ? null : Number(v),
            })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Не выбрано</option>
            {applicationOptions?.map((app) => (
              <option key={app.id} value={app.id}>
                {app.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Проект */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Проект</label>
        {isProjectLoading ? (
          <p className="text-sm italic text-gray-500">Загрузка...</p>
        ) : (
          <select
            {...register("project", {
              setValueAs: (v) => v === "" ? null : Number(v),
            })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Не выбрано</option>
            {projectOptions?.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Сообщения */}
      {success && <p className="text-green-600">✅ Задача успешно создана</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Создать задачу
      </button>
    </form>
  );
};