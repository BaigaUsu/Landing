'use client';

import { useEffect, useRef, useState } from "react";
import { useGetProjectsQuery } from "@/features/projects/api/projectApi";
import { ProjectCreateForm } from "@/features/projects/forms/create/components/ProjectCreationForm";
import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";
import { SearchBar } from "@/share/components/SearchBar";

const FILTER_OPTIONS = [
  { value: "actual", label: "Актуальные" },
  { value: "all", label: "Все" },
  { value: "completed", label: "Одобренные" },
  { value: "not-completed", label: "Успешные" },
] as const;

type StatusFilterValue = typeof FILTER_OPTIONS[number]["value"];

export default function ProjectsMasterDetailPage() {
    const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("actual");
    const { data: projects, isLoading, error } = useGetProjectsQuery(statusFilter);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const detailPaneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedId(null);
        setShowCreateForm(false);
        setSearchResults([]); // сбрасываем поиск при смене фильтра
    }, [statusFilter]);
    
    useEffect(() => {
        if (detailPaneRef.current) {
            detailPaneRef.current.scrollTop = 0;
        }
    }, [selectedId]);

    const handleCreateClick = () => {
        setSelectedId(null);
        setShowCreateForm(true);
    };

    const listToRender =
        searchResults.length > 0
        ? searchResults
        : projects?.results ?? [];

    if (isLoading) return <p className="p-4">Загрузка проектов...</p>;
    if (error) return <p className="p-4 text-red-600">Ошибка загрузки проектов</p>;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 border-r overflow-y-auto p-4">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-semibold">Проекты</h2>
                    <button
                        onClick={handleCreateClick}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    >
                        + Создать
                    </button>
                </div>

                <div className="mb-3">
                    <SearchBar
                        type="projects"
                        placeholder="Найди проект..."
                        onResults={(results) => setSearchResults(results)}
                    />
                </div>

                <div className="mb-4">
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value as typeof statusFilter)
                        }
                        className="border px-2 py-1 rounded w-full"
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {listToRender.length ? (
                    listToRender.map((project) => (
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
                    <p className="text-gray-500">Нет проектов</p>
                )}
            </div>

            {/* Detail */}
            <div ref={detailPaneRef} className="w-2/3 p-8 overflow-y-auto">
                {showCreateForm && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Создание нового проекта</h1>
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded"
                        >
                            ❌ Закрыть форму
                        </button>
                        <ProjectCreateForm onSuccess={() => setShowCreateForm(false)} />
                    </>
                )}

                {!selectedId && !showCreateForm && (
                    <div className="text-gray-500 italic">
                        Выберите проект из списка слева
                    </div>
                )}

                {typeof selectedId === "number" && !showCreateForm && (
                    <ProjectDetailPage
                        key={selectedId}
                        id={selectedId}
                        onDelete={() => setSelectedId(null)}
                    />
                )}
            </div>
        </div>
    );
}