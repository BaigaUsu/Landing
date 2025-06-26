import { rootApi } from "@/RTKQuery/api/rootApi";
import { Application, ApplicationRequest } from "@/types/appTypes";

export const appApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getApplication: build.query<Application[], void>({
            query: () => ({
                url: "http://95.179.247.253/api/v1/applications/",
                method: "GET",
            }),
        }),
        getApplicationById: build.query<Application, number>({
            query: (id) => ({
                url: `http://95.179.247.253/api/v1/applications/${id}`,
                method: 'GET'
            })
        }),
        createApplication: build.mutation<Application, {body: ApplicationRequest}>({
            query: (body) => ({
                url: "http://95.179.247.253/api/v1/applications/",
                method: "POST",
                body,
            }),
        }),
        updateApplication: build.mutation<Application, { id: number; data: ApplicationRequest }>({
            query: ({ id, data }) => ({
                url: `http://95.179.247.253/api/v1/applications/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),
        patchApplication: build.mutation<Application, { id: number; data: Partial<Application> }>({
            query: ({ id, data }) => ({
                url: `http://95.179.247.253/api/v1/applications/${id}/`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteApplication: build.mutation<void, number>({
            query: (id) => ({
                url: `http://95.179.247.253/api/v1/applications/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
  useGetApplicationQuery,
  useGetApplicationByIdQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  usePatchApplicationMutation,
  useDeleteApplicationMutation
} = appApi;