// components/HomePage.tsx
'use client';

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";
import { useGetCurrentMeQuery } from "../api/meApi";
import { logoutAction } from "@/features/auth/service/authSlice";

type Mode = "worker" | "manager" | "admin";

const getRole = (user: { specializations?: { specialization: string }[] }) => {
    if (!user.specializations || user.specializations.length === 0) return "admin";
    if (user.specializations.some(s => s.specialization === "manager")) return "manager";
    return "worker";
  };

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Добавим 'isFetching' и 'isError' для более точного контроля
  const { data, error, isLoading, isFetching, isError } = useGetCurrentMeQuery(undefined, {
    skip: !isClient || !isAuthenticated,
  });

  useEffect(() => {
    if (error) {
      dispatch(logoutAction());
    }
  }, [error, dispatch]);

  // Пока мы не на клиенте ИЛИ идет любая загрузка/проверка, показываем "Загрузка..."
  // Это покроет и SSR, и первый рендер клиента, и фоновое обновление
  if (!isClient || isLoading || isFetching) {
    return <div className="p-8">Загрузка...</div>;
  }

  // **** ВОТ ГЛАВНОЕ ИЗМЕНЕНИЕ ****
  // Если (пользователь не в Redux) ИЛИ (API вернул ошибку)
  // показываем страницу входа.
  if (!isAuthenticated || !user || isError) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
        <Link href="/auth" className="text-blue-600 underline">
          Войти
        </Link>
      </div>
    );
  }

  // Если мы дошли сюда, значит:
  // 1. Мы на клиенте.
  // 2. Загрузка завершена.
  // 3. 'isAuthenticated' = true.
  // 4. 'isError' = false (запрос успешен).
  // Значит, можно смело показывать контент для вошедшего.

  const role: Mode = getRole(user);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Главная страница</h1>

      {role === "worker" && (
        <Link
          href={`/dashboard/${user.id}`}
          className="text-green-600 underline"
        >
          Личный кабинет
        </Link>
      )}

      {(role === "manager" || role === "admin") && (
        <div className="space-x-4 mt-4">
          <Link href="/applications" className="text-blue-600 underline">
            Перейти к заявкам
          </Link>
          <Link href="/tasks" className="text-blue-600 underline">
            Перейти к задачам
          </Link>
          <Link href="/projects" className="text-blue-600 underline">
            Перейти к проектам
          </Link>
          <Link href="/dashboard" className="text-blue-600 underline">
            Личный кабинет
          </Link>
          <Link href="/customers" className="text-blue-600 underline">
            Перейти к клиентам
          </Link>
        </div>
      )}
    </div>
  );
}