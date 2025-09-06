'use client';

import { useGetApplicationByIdQuery, usePatchApplicationMutation } from "@/features/applications/api/appApi";
import { TaskCreateForm } from "@/features/tasks/forms/createForm/components/TaskCreationForm";
import { useEffect, useState } from "react";

type Props = {
  id: number | null;
};

export default function ApplicationDetailPage({ id }: Props) {
  const { data, isLoading, error, refetch } = useGetApplicationByIdQuery(id!, {
    skip: !id,
  });

  const [patchApplication] = usePatchApplicationMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (id) refetch();
  }, [id, refetch]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!id) return;
    try {
      await patchApplication({
        id: id,
        data: { status: e.target.value },
      }).unwrap();
      refetch();
    } catch (err) {
      alert("Ошибка при обновлении статуса");
      console.error(err);
    }
  };

  if (!id) return <p className="text-gray-500 italic">Выберите заявку</p>;
  if (isLoading) return <p>Загрузка данных...</p>;
  if (error || !data) return <p>Ошибка загрузки заявки</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Заявка #{data.id}</h1>
      <p><strong>Имя:</strong> {data.name}</p>
      <p><strong>Фамилия:</strong> {data.surname}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Телефон:</strong> {data.phone_number}</p>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">Статус заявки:</label>
        <select
          value={data.status}
          onChange={handleStatusChange}
          className="border px-3 py-2 rounded"
        >
          <option value="pending">pending</option>
          <option value="verified-positive">verified-positive</option>
          <option value="verified-negative">verified-negative</option>
          <option value="verified-waiting">verified-waiting</option>
        </select>
      </div>

      <p className="mt-4"><strong>Создан:</strong> {new Date(data.created_at).toLocaleString()}</p>
      <p><strong>Обновлён:</strong> {new Date(data.updated_at).toLocaleString()}</p>

      {/* Блок задач */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Задачи:</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
          >
            + Создать задачу
          </button>
        </div>

        {showCreateForm && (
          <div>
            <TaskCreateForm
              type="from-application"
              applicationId={data.id}
              applicationLabel={data.email}
              onSuccess={() => {
                setShowCreateForm(false);
                refetch();
              }}
            />
            <button
              onClick={() => setShowCreateForm(false)}
              className="mt-2 bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              ❌ Закрыть форму
            </button>
          </div>
        )}

        {data.tasks.length > 0 ? (
          <ul className="space-y-2 list-disc ml-6">
            {data.tasks.map((task) => (
              <li key={task.id} className="p-2 border rounded">
                <p><strong>Задача №</strong>{task.id}</p>
                <p><strong>Действие:</strong> {task.action}</p>
                <p><strong>Статус:</strong> {task.status}</p>
                <p><strong>Дата:</strong> {task.action_date}</p>
                <p><strong>Время:</strong> {task.action_time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">Нет задач</p>
        )}
        
      <p className="mt-4"><strong>Проект:</strong> {data.project?.project_name ?? "Нет проекта"}</p>
    </div>
  );
}