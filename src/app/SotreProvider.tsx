'use client';

import { AppStore, makeStore } from "@/redux/store";
import { useAuthInit } from "@/share/hooks/useAuthInit";
import { useRef } from "react";
import { Provider } from "react-redux";


export default function StoreProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<AppStore | null>(null);
	
	if (!storeRef.current) {
	storeRef.current = makeStore();
	}
	
	return <Provider store={storeRef.current}>
                <AuthInitializer />
                    {children}
                </Provider>;
}

function AuthInitializer() {
    useAuthInit();
    return null; // компонент-невидимка
}