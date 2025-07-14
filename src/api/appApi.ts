import { rootApi } from "@/RTKQuery/api/rootApi";
import { Application, ApplicationRequest } from "@/types/appTypes";


export const appApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getApplications: build.query<Application[], void>({
      query: () => ({
        url: '/applications/',
        method: "GET",
      }),
      providesTags: ['Apps'],
    }),

    getActualApplications: build.query<Application[], void>({
      query: () => ({
        url: `/applications/actual/`,
        method: "GET"
      }),
      providesTags: ['Apps'],
    }),

    getApplicationById: build.query<Application, number>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: 'GET'
      })
    }),

    createApplication: build.mutation<Application, ApplicationRequest>({
      query: (body) => ({
        url: `/applications/`,
        method: "POST",
        body,
      }),
    }),

    getApplicationLabels: build.query<{ id: number; label: string }[], void>({
      query: () => ({
        url: `/applications/labels/`,
        method: "GET",
      }),
    }),

    updateApplication: build.mutation<Application, { id: number; data: ApplicationRequest }>({
      query: ({ id, data }) => ({
        url: `/applications/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    patchApplication: build.mutation<Application, { id: number; data: Partial<Application> }>({
      query: ({ id, data }) => ({
        url: `/applications/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['Apps'],
    }),

    deleteApplication: build.mutation<void, number>({
      query: (id) => ({
        url: `/applications/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetActualApplicationsQuery,
  useGetApplicationByIdQuery,
  useCreateApplicationMutation,
  useGetApplicationLabelsQuery,
  useUpdateApplicationMutation,
  usePatchApplicationMutation,
  useDeleteApplicationMutation
} = appApi;