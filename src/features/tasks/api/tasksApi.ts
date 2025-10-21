import { rootApi } from "@/RTKQuery/api/rootApi";
import { Task, TaskCreateRequest, TaskId, TaskList, TaskUpdateRequest } from "@/features/tasks/types/taskType";

export const tasksApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task<TaskList>, string | undefined>({
            query: (status) => ({
                url: "/tasks/",
                method: "GET",
                params: status ? { status: status } : undefined,
            }),
            providesTags: ['Tasks'],
        }),
        getTaskById: build.query<TaskId, number | null>({
            query: (id) => ({
                url: `/tasks/${id}/`,
                method: "GET"
            }),
            providesTags: ['Tasks'],
        }),
        createTask: build.mutation<TaskId, TaskCreateRequest>({
            query: (body) => ({
                url: "/tasks/",
                method: "POST",
                body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: build.mutation<TaskId, { id: number; data: TaskUpdateRequest }>({
            query: ({ id, data }) => ({
                url: `/tasks/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Tasks'],
        }),
        patchTask: build.mutation<TaskId, { id: number; data: Partial<TaskUpdateRequest> }>({
            query: ({ id, data }) => ({
                url: `/tasks/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: build.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    usePatchTaskMutation,
    useDeleteTaskMutation
} = tasksApi;