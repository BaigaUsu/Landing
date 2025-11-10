'use client';

import { useGetCustomersByIdQuery } from "@/share/api/customersApi";


interface CustomerDetailPageProps {
    id: number;
    onDelete: () => void;
}

export function CustomerDetailPage({ id, onDelete }: CustomerDetailPageProps) {
    const { data: customer, isLoading, error } = useGetCustomersByIdQuery(id);

    if (isLoading) return <p className="text-gray-500">Загрузка клиента...</p>;
    if (error || !customer) return <p className="text-red-600">Ошибка загрузки клиента</p>;

    return (
        <div className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{customer.name} {customer.surname}</h1>
                <button
                    onClick={onDelete}
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
    );
}