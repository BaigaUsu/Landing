'use client';

import { useState } from "react";
import { CustomerEditForm } from "../edit/components/CustomersEditForm";
import { useDetailCustomersPage } from "../hooks/useDetailCustomersPage";


interface Props {
    id: number;
    onDelete: () => void;
}

export function CustomerDetailPage({ id, onDelete }: Props) {
    const { customer, isCustomerLoading, isDeleting, handleDelete, customerError } = useDetailCustomersPage({ customerId: id, onDelete });
    const [showEdit, setShowEdit] = useState(false);

    if (isCustomerLoading) return <p className="text-gray-500">Загрузка клиента...</p>;
    if (customerError || !customer) return <p className="text-red-600">Ошибка загрузки клиента</p>;

    return (
        <div className="p-4 border rounded shadow-sm">
            {!showEdit ? (
                <div
                    key={customer.id}
                    className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">{customer.name} {customer.surname}</h1>
                        <button
                            onClick={() => setShowEdit(true)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                                ✏️ Редактировать
                            </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                            Удалить
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p className="font-semibold">Имя</p>
                            <p>{customer.name}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Фамилия</p>
                            <p>{customer.surname}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Email</p>
                            <p>{customer.email}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Телефон</p>
                            <p>{customer.phone_number}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Дата создания</p>
                            <p>{new Date(customer.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Дата обновления</p>
                            <p>{new Date(customer.updated_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
                    >
                        ❌ Отмена
                    </button>
    
                    <CustomerEditForm
                        customer={customer}
                        onSuccess = {() => setShowEdit(false)}    
                    />
                </>
            )}
        </div>
    );
}