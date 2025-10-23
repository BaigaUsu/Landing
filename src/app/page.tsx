'use client';

import Link from "next/link";
import { useAppSelector } from "@/redux/reduxHooks";

type Mode = "worker" | "manager" | "admin";

const getRole = (user: { specializations?: { specialization: string }[] }) => {
  if (!user.specializations || user.specializations.length === 0) return "admin";
  if (user.specializations.some(s => s.specialization === "manager")) return "manager";
  return "worker";
};

export default function HomePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const role: Mode | null = user ? getRole(user) : null;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Главная страница</h1>

      {isAuthenticated && user ? (
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

          {(role === "manager" || role === "admin") && (
            <Link href="/dashboard" className="text-blue-600 underline">
              Личный кабинет
            </Link>
          )}

          {role === "worker" && (
            <Link
              href={`/dashboard/${user.id}`}
              className="text-green-600 underline"
            >
              Личный кабинет
            </Link>
          )}
        </div>
      ) : (
        <Link href="/auth" className="text-blue-600 underline">
          Войти
        </Link>
      )}
    </div>
  );
}