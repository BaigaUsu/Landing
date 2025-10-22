'use client';

import LoginForm from "@/features/auth/forms/login/components/LoginForm";
import { meApi } from "@/share/api/meApi";
import Link from "next/link";

type Mode = "worker" | "manager" | "admin";

// Функция определения роли
const getRole = (user: { specializations: { specialization: string }[] }) => {
    if (!user.specializations || user.specializations.length === 0) return "admin";
    if (user.specializations.some(s => s.specialization === "manager")) return "manager";
    return "worker";
};

export default function Home() {
  // Получаем текущего пользователя с сервера
  const { data: currentUser, isLoading } = meApi.useGetCurrentMeQuery();

  const role: Mode | null = currentUser ? getRole(currentUser) : null;

  if (isLoading) return <p className="p-8">Загрузка...</p>;

  return (
    <div className="p-8 space-y-4">
      <div>Главная страница</div>

      <div className="space-x-4">
        <Link href="/applications" className="text-blue-600 underline">
          Перейти к заявкам
        </Link>
        <Link href="/tasks" className="text-blue-600 underline">
          Перейти к задачам
        </Link>
        <Link href="/projects" className="text-blue-600 underline">
          Перейти к проектам
        </Link>

        {/* Ссылка на общий дашборд только для менеджеров и админов */}
        {(role === "manager" || role === "admin") && (
          <Link href="/dashboard" className="text-blue-600 underline">
            Личный кабинет
          </Link>
        )}

        {/* Ссылка на персональную страницу для обычного сотрудника */}
        {role === "worker" && currentUser && (
          <Link
            href={`/dashboard/${currentUser.id}`}
            className="text-green-600 underline"
          >
            Личный кабинет
          </Link>
        )}
      </div>

      {/* Форма логина */}
      <LoginForm
        onLoginSuccess={(user) => {
          console.log("User logged in:", user);
          // Если используешь meApi, можно просто перезагрузить кэш или вызвать refetch
        }}
      />
    </div>
  );
}