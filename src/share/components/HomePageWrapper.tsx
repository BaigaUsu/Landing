'use client';

import Link from "next/link";
import { useAppSelector } from "@/redux/reduxHooks";

export default function HomePage() {
    const { user, isAuthenticated, isAuthInitialized } = useAppSelector((s) => s.auth);
    if (!isAuthInitialized) {
        return <div className="p-8">Загрузка...</div>; // Или компонент Spinner
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
                <Link href="/auth" className="text-blue-600 underline">
                    Войти
                </Link>
            </div>
        );
    }

    const specializations = user.specializations ?? [];
    const role = specializations.some(s => s.specialization === "manager")
        ? "manager"
        : specializations.length === 0
        ? "admin"
        : "worker";

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Главная страница</h1>

            {role === "worker" && (
                <Link href={`/dashboard/${user.id}`} className="text-green-600 underline">
                    Личный кабинет
                </Link>
            )}

            {(role === "manager" || role === "admin") && (
                <div className="space-x-4 mt-4">
                    <Link href="/applications" className="text-blue-600 underline">Перейти к заявкам</Link>
                    <Link href="/tasks" className="text-blue-600 underline">Перейти к задачам</Link>
                    <Link href="/projects" className="text-blue-600 underline">Перейти к проектам</Link>
                    <Link href="/dashboard" className="text-blue-600 underline">Личный кабинет</Link>
                    <Link href="/customers" className="text-blue-600 underline">Перейти к клиентам</Link>
                </div>
            )}
        </div>
    );
}