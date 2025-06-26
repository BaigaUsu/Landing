import { rootApi } from "@/RTKQuery/api/rootApi";
import { Project, ProjectRequest } from "@/types/projectTypes";

export const ordersApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<Project[], void>({
        query: () => ({
            url: "http://95.179.247.253/api/v1/projects/",
            method: "GET"
        }),
    }),
    getOrderById: build.query<Project, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`
        }),
    }),
    createOrder: build.mutation<Project, {body: ProjectRequest}>({
        query: (body) => ({
            url: "http://95.179.247.253/api/v1/projects/",
            method: "POST",
            body,
        }),
    }),
    updateOrder: build.mutation<Project, { id: number; data: ProjectRequest }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "PUT",
            body: data,
        }),
    }),
    patchOrder: build.mutation<Project, { id: number; data: Partial<ProjectRequest> }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "PATCH",
            body: data,
        }),
    }),
    deleteOrder: build.mutation<void, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "DELETE",
        }),
    }),
  }),
//   overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  usePatchOrderMutation,
  useDeleteOrderMutation
} = ordersApi;