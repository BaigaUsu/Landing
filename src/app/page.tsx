'use client';

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
  </div>
  );
}