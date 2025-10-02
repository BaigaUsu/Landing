"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTaskMutation } from "@/features/tasks/api/tasksApi";
import { useState } from "react";
import { taskSchema } from "@/features/tasks/services/validation/taskSchema";

type FormValues = z.infer<typeof taskSchema>;

type Props =
  | {
        type: "form-task";
        previousTaskId: number;
        previousTaskLabel: string;
        applicationId?: number;
        applicationLabel?: string;
        projectId?: number;
        projectLabel?: string;
        onSuccess?: () => void;
    }
  | {
        type: "independent";
        onSuccess?: () => void;
    }
  | {
        type: "form-application";
        applicationId: number;
        applicationLabel: string;
        onSuccess?: () => void;
    };

export const TaskCreateForm = (props: Props) => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues
  });

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
          <input
          {...register("action")}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.action && (
          <p className="text-red-600 text-sm mt-1">{errors.action.message}</p>
          )}
      </div>

      {/* если из задачи → показываем предыдущую задачу */}
      {props.type === "form-task" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Предыдущая задача</label>
          <input 
            type="text"
            value={props.previousTaskLabel} 
            readOnly 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
      )}

      {/* поле заявки */}
      {props.type === "form-task" || props.type === "form-application" ? (
        <div className="flex flex-col">
          <label>Заявка</label>
          <input
            type="text"
            value={props.applicationLabel || "Без заявки"}
            readOnly
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : null}
        {/* поле проекта */}
        {props.type === "form-task" ? (
        <div className="flex flex-col">
          <label>Проект</label>
          <input
            type="text"
            value={props.projectLabel || "Без проекта"}
            readOnly
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : null}

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