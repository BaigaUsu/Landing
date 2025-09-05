import { rootApi } from "@/RTKQuery/api/rootApi";
import { Application, ApplicationId, ApplicationList, ApplicationPatchRequest, } from "@/features/applications/types/appTypes";


export const appApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getApplications: build.query<Application<ApplicationList>, string | undefined>({
      query: (status) => ({
        url: '/applications/',
        method: "GET",
        params: status ? { status: status } : undefined,
      }),
      providesTags: ['Apps'],
    }),

    getApplicationById: build.query<ApplicationId, number>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: 'GET'
      })
    }),

    getApplicationLabels: build.query<{ id: number; label: string }[], void>({
      query: () => ({
        url: `/applications/labels/`,
        method: "GET",
      }),
    }),

    patchApplication: build.mutation<ApplicationPatchRequest, { id: number; data: Partial<ApplicationId> }>({
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
  useGetApplicationByIdQuery,
  useGetApplicationLabelsQuery,
  usePatchApplicationMutation,
  useDeleteApplicationMutation
} = appApi;