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
    getTaskById: build.query<Task, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}`,
            method: "GET"
        }),
    }),
    createTask: build.mutation<Task, {body: TaskRequest}>({
        query: (body) => ({
            url: "http://95.179.247.253/api/v1/tasks/",
            method: "POST",
            body,
        }),
    }),
    updateTask: build.mutation<Task, { id: number; data: TaskRequest }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/tasks/${id}/`,
            method: "PUT",
            body: data,
        }),
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
    }),
  }),
//   overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  usePatchTaskMutation,
  useDeleteTaskMutation
} = tasksApi;