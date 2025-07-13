import { rootApi } from "@/RTKQuery/api/rootApi";
import { Task, TaskRequest } from "@/types/taskType";

export const tasksApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
        query: () => ({
            url: "http://95.179.247.253/api/v1/tasks/",
            method: "GET"
        }),
    }),
    getActualTasks: build.query<Task[], void>({
        query: () => ({
            url: "http://95.179.247.253/api/v1/tasks/actual/",
            method: "GET"
        }),
        providesTags: ['Tasks'],
    }),
    getTaskById: build.query<Task, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}`,
            method: "GET"
        }),
    }),
    createTask: build.mutation<Task, TaskRequest>({
        query: (body) => ({
            url: "http://95.179.247.253/api/v1/tasks/",
            method: "POST",
            body,
        }),
        invalidatesTags: ['Tasks'],
    }),
    getTaskLabels: build.query<{ id: number; label: string }[],void>({
        query: () => ({
            url: `http://95.179.247.253/api/v1/tasks/labels/`,
            method: "GET",
        }),
    }),
    updateTask: build.mutation<Task, { id: number; data: TaskRequest }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}/`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ['Tasks'],
    }),
    patchTask: build.mutation<Task, { id: number; data: Partial<TaskRequest> }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}/`,
            method: "PATCH",
            body: data,
        }),
    }),
    deleteTask: build.mutation<void, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}/`,
            method: "DELETE",
        }),
        invalidatesTags: ['Tasks'],
    }),
  }),
  overrideExisting: true,
});

export const {
    useGetTasksQuery,
    useGetActualTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useGetTaskLabelsQuery,
    useUpdateTaskMutation,
    usePatchTaskMutation,
    useDeleteTaskMutation
} = tasksApi;