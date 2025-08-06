'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { applicationSchema } from "@/share/services/auth/validation/authSchema";
import { Application, ApplicationRequest } from "@/share/types/applications/appTypes";
import { useState } from "react";
import { useCreateApplicationMutation } from "@/api/appApi";

type ApplicationFormData = z.infer<typeof applicationSchema>;

type ApplicationFormProps = {
  onSubmitSuccess?: (data: ApplicationRequest) => void;
};

export function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createApplication] = useCreateApplicationMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const response = await createApplication(data).unwrap();
      setSuccessMessage("✅ Заявка успешно отправлена!");
      if (onSubmitSuccess) {
        onSubmitSuccess(response);
      }
    } catch (error: any) {
      console.error("Ошибка при отправке:", error);
      setServerError("Не удалось отправить заявку");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("name")} placeholder="Имя" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input type="text" {...register("surname")} placeholder="Фамилия" />
      {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}

      <input type="email" {...register("email")} placeholder="Email" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input type="tel" {...register("phone_number")} placeholder="Телефон" />
      {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
      
      {successMessage && (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {serverError && <p className="text-red-600">{serverError}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Отправить
      </button>
    </form>
  );
}