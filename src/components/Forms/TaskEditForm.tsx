'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useUpdateTaskMutation } from "@/api/tasksApi";
import { taskUpdateSchema } from "@/services/auth/validation/authSchema";
import { Task } from "@/types/taskType";
import { useGetProjectLabelsQuery } from "@/api/projectApi";

type TaskFormData = z.infer<typeof taskUpdateSchema>;

type Props = {
  task: Task;
  onSuccess?: () => void;
};

export function TaskEditForm({ task, onSuccess }: Props) {
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
      status: 'to-do',
      project: task.project?.id || undefined,
    },
  });

  const [updateTask] = useUpdateTaskMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { data: projectOptions, isLoading: isProjectLoading } = useGetProjectLabelsQuery();

  const onSubmit = async (data: TaskFormData) => {
    try {
      console.log("Отправляемые данные:", data); 
      await updateTask({ id: task.id, data }).unwrap();
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setErrorMsg("Ошибка при обновлении задачи");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold">Редактировать задачу #{task.id}</h2>

      {[
        { label: "Имя", name: "name" },
        { label: "Фамилия", name: "surname" },
        { label: "Email", name: "email", type: "email" },
        { label: "Телефон", name: "phone_number", type: "tel" },
        { label: "Действие", name: "action" },
        { label: "Дата действия", name: "action_date", type: "date" },
        { label: "Время действия", name: "action_time", type: "time" },
      ].map((field, idx) => (
        <div key={idx} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{field.label}</label>
          <input
            {...register(field.name as keyof TaskFormData)}
            type={field.type || "text"}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors[field.name as keyof TaskFormData] && (
            <p className="text-red-600 text-sm mt-1">
              {errors[field.name as keyof TaskFormData]?.message as string}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Проекты</label>
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
            {projectOptions?.map((label) => (
              <option key={label.id} value={label.id}>
                {label.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {errors.project && (
        <p className="text-red-600 text-sm mt-1">
          {errors.project.message}
        </p>
      )}

      {/* Селектор для статуса */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Статус</label>
        <select
          {...register("status")}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="to-do" hidden>to-do</option>
          <option value="done-positive">done-positive</option>
          <option value="done-negative">done-negative</option>
        </select>
        {errors.status && (
          <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      {success && <p className="text-green-600">✅ Задача успешно обновлена</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Сохранить изменения
      </button>
    </form>
  );
}