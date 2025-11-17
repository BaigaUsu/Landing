'use client';

import { useAppSelector, useAppDispatch } from "@/redux/reduxHooks";
import { logoutAction } from "@/features/auth/service/authSlice";
import { meApi } from "@/share/api/meApi";
import { useRouter } from "next/navigation";

export default function UserInfo() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((s) => s.auth);

    if (!isAuthenticated || !user) return null;
    console.log("User data inside component:", user);

    const logout = () => {
        dispatch(logoutAction());
        dispatch(meApi.util.resetApiState());
        router.push("/");
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div>
                <p className="font-medium">{user.name || 'Админ '}</p>
                <p className="text-sm text-gray-500">{user.surname}</p>
            </div>
            <button onClick={logout} className="text-red-600 underline">
                Выйти
            </button>
        </div>
    );
}