'use client';

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logoutAction, setUser } from "@/features/auth/service/authSlice";
import { meApi } from "@/share/api/meApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { data: currentUser } = meApi.useGetCurrentMeQuery(undefined, {
        skip: !isAuthenticated,
    });

    useEffect(() => setIsClient(true), []);
    useEffect(() => {
        if (currentUser) dispatch(setUser(currentUser));
    }, [currentUser, dispatch]);

    const handleLogout = () => {
        dispatch(logoutAction());
        dispatch(meApi.util.resetApiState());
        router.push('/');
    };

    if (!isClient || !isAuthenticated || !user) return null;

    return (
        <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div>
                <p className="font-medium">{user.name || "Админ нахуй"} 👋</p>
                <p className="text-sm text-gray-500">{user.surname}</p>
            </div>
            <button onClick={handleLogout} className="text-red-600 underline">
                Выйти
            </button>
        </div>
    );
}