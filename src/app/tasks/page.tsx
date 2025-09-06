'use client';

import { useEffect, useState } from "react";
import { useGetTasksQuery } from "@/features/tasks/api/tasksApi";
import { TaskCreateForm } from "@/features/tasks/forms/createForm/components/TaskCreationForm";
import { TaskDetailPage } from "@/features/tasks/components/TaskDetailPage";

export default function TasksMasterDetailPage() {
    // по умолчанию actual
    const [statusFilter, setStatusFilter] = useState<
    "all" | "actual" | "done" | "done-positive" | "done-negative"
  >("actual");
  const { data: tasks, isLoading, error } = useGetTasksQuery(statusFilter);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);  
  
  // при смене фильтра сбрасываем выбор, чтобы не показывать деталь, которой нет в текущем списке
  useEffect(() => {
    setSelectedId(null);
    setShowCreateForm(false);
  }, [statusFilter]);

  const handleCreateClick = () => {
    setSelectedId(null); // сбрасываем выбранную задачу
    setShowCreateForm(true); // показываем форму
  };

  if (isLoading) return <p className="p-4">Загрузка задач...</p>;
  if (error) return <p className="p-4 text-red-600">Ошибка загрузки задач</p>;

  const results = tasks?.results ?? [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Задачи</h2>
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
          >
            + Создать
          </button>
        </div>

        
        {/* Селект фильтра — по умолчанию "actual" */}
        <div className="mb-4">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as typeof statusFilter)
            }
            className="border px-2 py-1 rounded w-full"
          >
            <option value="all">Все</option>
            <option value="actual">Актуальные</option>
            <option value="done">Выполненные</option>
            <option value="done-positive">Успешные</option>
            <option value="done-negative">Неуспешные</option>
          </select>
        </div>

        {tasks?.results?.length ? (
          tasks.results.map((task) => (
            <div
              key={task.id}
              className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedId === task.id && !showCreateForm ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                setSelectedId(task.id);
                setShowCreateForm(false);
              }}
            >
              <p><strong>{task.name} {task.surname}</strong></p>
              <p className="text-sm text-gray-600">{task.action} — {task.status}</p>
            </div>
          ))
        ) : (
          <p>Нет задач</p>
        )}
      </div>

      {/* Detail */}
      <div className="w-2/3 p-8 overflow-y-auto">

        {/* Форма создания */}
        {showCreateForm && (
          <>
            <h1 className="text-2xl font-bold mb-4">Создание новой задачи</h1>
            <button
              onClick={() => setShowCreateForm(false)}
              className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded"
            >
              ❌ Закрыть форму 
            </button>
            <TaskCreateForm
                type="independent"
                onSuccess={() => setShowCreateForm(false)}/>
          </>
        )}

        {/* Заглушка при отсутствии выбора */}
        {!selectedId && !showCreateForm && (
          <div className="text-gray-500 italic">Выберите задачу из списка слева</div>
        )}

        {/* Подробности задачи */}
        {typeof selectedId === 'number' && !showCreateForm && (
          <TaskDetailPage
            taskId={selectedId}
            onDelete={() => {
              setSelectedId(null); // закрываем детальную панель
            }}
          />
        )}
      </div>
    </div>
  );
}