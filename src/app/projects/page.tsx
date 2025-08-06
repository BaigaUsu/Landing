'use client';

import { useState } from "react";
import { useGetActualProjectsQuery, useGetProjectsQuery } from "@/features/projects/api/projectApi";
import { ProjectCreateForm } from "@/features/projects/forms/create/components/ProjectCreationForm";
import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";

export default function ProjectsMasterDetailPage() {
  const { data: projects, isLoading, error } = useGetActualProjectsQuery();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateClick = () => {
    setSelectedId(null);
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
  };

  if (isLoading) return <p className="p-4">Загрузка проектов...</p>;
  if (error) return <p className="p-4 text-red-600">Ошибка загрузки проектов</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Проекты</h2>
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
          >
            + Создать
          </button>
        </div>

        {Array.isArray(projects) ? (
          projects.map((project) => (
            <div
              key={project.id}
              className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedId === project.id && !showCreateForm ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                setSelectedId(project.id);
                setShowCreateForm(false);
              }}
            >
              <p className="font-semibold">{project.project_name}</p>
              <p className="text-sm text-gray-600">{project.status}</p>
            </div>
          ))
        ) : (
          <p>Нет проектов</p>
        )}
      </div>

      {/* Detail */}
      <div className="w-2/3 p-8 overflow-y-auto">
        {/* Форма создания */}
        {showCreateForm && (
          <>
            <h1 className="text-2xl font-bold mb-4">Создание нового проекта</h1>
            <button
              onClick={() => setShowCreateForm(false)}
              className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded"
            >
              ❌ Закрыть форму
            </button>
            <ProjectCreateForm onSuccess={handleFormSuccess} />
          </>
        )}

        {/* Заглушка при отсутствии выбора */}
        {!selectedId && !showCreateForm && (
          <div className="text-gray-500 italic">Выберите проект из списка слева</div>
        )}

        {/* Подробности проекта */}
        {typeof selectedId === 'number' && !showCreateForm && (
          <ProjectDetailPage
            id={selectedId} 
            onDelete={() => {
              setSelectedId(null); // закрываем детальную панель
            }}
          />
        )}
      </div>
    </div>
  );
}