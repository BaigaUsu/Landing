'use client';

import Link from "next/link";
import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";

type Mode = "worker" | "manager" | "admin";

const getRole = (user: { specializations?: { specialization: string }[] }) => {
	if (!user.specializations || user.specializations.length === 0) return "admin";
	if (user.specializations.some(s => s.specialization === "manager")) return "manager";
	return "worker";
};

export default function HomePage() {
	const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

	// Проверяем, когда данные auth загружены (можно заменить на конкретный флаг из redux, если есть)
	useEffect(() => {
		// Симулируем, что состояние известно после инициализации store
		// Например, можно в authSlice добавить флаг "isInitialized"
		setIsAuthChecked(true);
	}, []);

	const role: Mode | null = user ? getRole(user) : null;

	// Пока auth не определён — ничего не показываем
	if (!isAuthChecked) {
		return null;
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

	return (
		<div className="p-8 space-y-4">
			<h1 className="text-2xl font-bold">Главная страница</h1>

			{/* Если работник — только личный кабинет */}
			{role === "worker" && (
				<Link
					href={`/dashboard/${user.id}`}
					className="text-green-600 underline"
				>
					Личный кабинет
				</Link>
			)}

			{/* Если менеджер или админ — все остальные ссылки */}
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
				</div>
			)}
		</div>
	);
}