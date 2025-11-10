'use client';

import { CustomerDetailPage } from "@/features/customers/components/DetailCustomerPage";
import { CustomerCreateForm } from "@/features/customers/create/components/CustomerCreateForm";
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetCustomersQuery } from "@/share/api/customersApi";
import { useEffect, useRef, useState } from "react";

export default function CustomersMasterDetailPage() {
    const { data: customers, isLoading, error } = useGetCustomersQuery();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const detailPaneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (detailPaneRef.current) {
            detailPaneRef.current.scrollTop = 0;
        }
    }, [selectedId, showCreateForm]);

    const handleCreateClick = () => {
        setSelectedId(null);
        setShowCreateForm(true);
    };

    if (isLoading) return <p className="p-4">Загрузка клиентов...</p>;
    if (error) return <p className="p-4 text-red-600">Ошибка загрузки клиентов</p>;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 border-r overflow-y-auto p-4">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-semibold">Клиенты</h2>
                    <button
                        onClick={handleCreateClick}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    >
                        + Создать
                    </button>
                </div>

                {customers?.length ? (
                    customers.map((customer) => (
                        <div
                            key={customer.id}
                            className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                                selectedId === customer.id && !showCreateForm ? "bg-blue-100" : ""
                            }`}
                            onClick={() => {
                                setSelectedId(customer.id);
                                setShowCreateForm(false);
                            }}
                        >
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Нет клиентов</p>
                )}
            </div>

            {/* Detail */}
            <div ref={detailPaneRef} className="w-2/3 p-8 overflow-y-auto">
                {showCreateForm && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Создание нового клиента</h1>
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded"
                        >
                            ❌ Закрыть форму
                        </button>
                        <CustomerCreateForm onSuccess={() => setShowCreateForm(false)} />
                    </>
                )}

                {!selectedId && !showCreateForm && (
                    <div className="text-gray-500 italic">
                        Выберите клиента из списка слева
                    </div>
                )}

                {typeof selectedId === "number" && !showCreateForm && (
                    <CustomerDetailPage
                        key={selectedId}
                        id={selectedId}
                        onDelete={() => {
                            setSelectedId(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}