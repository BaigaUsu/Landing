import { useState } from 'react';
import { useDeleteTaskMutation, useGetTaskByIdQuery } from '@/features/tasks/api/tasksApi';
import { useGetManagerStaffQuery } from '@/share/api/managerStaffApi';

type UseTaskDetailPageParams = {
    taskId: number;
    onDelete?: () => void;
};

export function useTaskDetailPage({ taskId, onDelete }: UseTaskDetailPageParams) {
    const { data: task, isLoading: isTaskLoading } = useGetTaskByIdQuery(taskId, {
        skip: taskId == null,
    });
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'createTask' | 'createProject'>('view');

    const handleDelete = async () => {
        if (task && confirm('Вы действительно хотите удалить эту задачу?')) {
            onDelete?.();
            try {
                await deleteTask(task.id).unwrap();
                alert('Задача удалена');
            } catch (error) {
                alert('Ошибка при удалении задачи');
                console.error(error);
            }
        }
    };

    return {
        // Data and loading states
        task,
        isTaskLoading,
        isDeleting,

        // UI state
        viewMode,
        
        // Actions to change UI state
        showEditView: () => setViewMode('edit'),
        showCreateTaskView: () => setViewMode('createTask'),
        showCreateProjectView: () => setViewMode('createProject'),
        showDetailView: () => setViewMode('view'),

        // Business logic handlers
        handleDelete,
    };
}