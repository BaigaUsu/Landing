'use client';

import { useLoginMutation } from "@/features/auth/api/authApi";
import { LoginFormData } from "@/features/auth/service/validation/authSchema";
import { useAppDispatch } from "@/redux/reduxHooks";
import { meApi } from "@/share/api/meApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Me } from "@/share/types/me";

type LoginFormProps = {
  onLoginSuccess: (user: Me) => void;
};

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      // 1️⃣ Авторизация (получаем токены)
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();

    //   2️⃣ Получаем текущего пользователя
    const user = await dispatch(
        meApi.endpoints.getCurrentMe.initiate()
      ).unwrap();

    //   3️⃣ Обрабатываем успешный вход
      if (user) {
        onLoginSuccess(user);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-10 space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">Войти</h2>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email", { required: "Email обязателен" })}
          id="email"
          placeholder="you@example.com"
          className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Пароль
        </label>
        <input
          type="password"
          {...register("password", { required: "Пароль обязателен" })}
          id="password"
          placeholder="******"
          className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Ждать, сука!" : "Войти"}
        </button>
      </div>
    </form>
  );
}