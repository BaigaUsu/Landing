'use client';

import { useDeleteTaskMutation, useGetTaskByIdQuery } from "@/features/tasks/api/tasksApi";
import { useState } from "react";
import { TaskEditForm } from "../forms/editForm/components/TaskEditForm";
import { TaskCreateForm } from "../forms/createForm/components/TaskCreationForm";
import { ProjectCreateForm } from "@/features/projects/forms/create/components/ProjectCreationForm";
import { useTaskDetailPage } from "../hooks/useTaskDetailPage";
import { TaskDisplay } from "./TaskDisplay";

type Props = {
    taskId: number;
    onCloseEdit?: () => void;
    onDelete?: () => void;
};

export function TaskDetailPage({ taskId, onCloseEdit, onDelete }: Props) {
    const {
        task,
        isTaskLoading,
        isDeleting,
        viewMode,
        showEditView,
        showCreateTaskView,
        showCreateProjectView,
        showDetailView,
        handleDelete,
    } = useTaskDetailPage({ taskId, onDelete });
    
    if (isTaskLoading) return <p>Загрузка данных...</p>;
    if (!task) return <p>Задача не найдена</p>;

    return (
        <div>
            {viewMode === 'view' && (
                <TaskDisplay
                    task={task}
                    isDeleting={isDeleting}
                    onEdit={showEditView}
                    onDelete={handleDelete}
                    onCreateTask={showCreateTaskView}
                    onCreateProject={showCreateProjectView}
                />
            )}

            {viewMode === 'edit' && (
                <>
                    <button onClick={showDetailView} className="bg-gray-500 text-white px-3 py-1 rounded mb-4">
                        ❌ Отмена
                    </button>
                    <TaskEditForm
                        task={task}
                        onSuccess={() => {
                            showDetailView();
                            onCloseEdit?.();
                        }}
                    />
                </>
            )}

            {viewMode === 'createTask' && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Создание новой задачи</h1>
                    <button onClick={showDetailView} className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded">
                        ❌ Закрыть форму
                    </button>
                    <TaskCreateForm
                        type="form-task"              
                        applicationId={task.application?.id} 
                        applicationLabel={task.application?.email} 
                        previousTaskId={task.id}          
                        previousTaskLabel={task.action}
                        projectId={task.project?.id}
                        projectLabel={task.project?.project_name}
                        onSuccess={showDetailView}
                    />
                </>
            )}

            {viewMode === 'createProject' && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Создание нового проекта</h1>
                    <button onClick={showDetailView} className="bg-gray-300 text-gray-800 px-3 py-1 mb-4 rounded">
                        ❌ Закрыть форму 
                    </button>
                    <ProjectCreateForm
                        taskIds={[task.id, ...(task.previous_tasks?.map(t => t.id) || [])]}
                        applicationId={task.application?.id}
                        onSuccess={showDetailView}
                    />
                </>
            )}
        </div>
    );
}