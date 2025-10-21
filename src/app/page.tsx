'use client';

import LoginForm from "@/features/auth/forms/login/components/LoginForm";
import Link from "next/link";

export default function Home() {

  return (
    <div className="p-8">
    Главная страница
    <Link href="/applications" className="text-blue-600 underline">
      Перейти к заявкам
    </Link>
    <Link href="/tasks" className="text-blue-600 underline ml-4">
      Перейти к задачам
    </Link>
    <Link href="/projects" className="text-blue-600 underline ml-4">
      Перейти к проектам
    </Link>
    <Link href="/dashboard" className="text-blue-600 underline ml-4">
      Перейти в личный кабинет
    </Link>
    <LoginForm onLoginSuccess={(user) => {
      console.log("User logged in:", user);
    }} />
  </div>
  );
}