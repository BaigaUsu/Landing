import { rootApi } from "@/RTKQuery/api/rootApi";
import { Project, ProjectId, ProjectList, ProjectPostRequest, ProjectUpdateRequest, } from "@/features/projects/types/projectTypes";

export const projectsApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProjects: build.query<Project<ProjectList>, string | undefined>({
      query: (status) => ({
        url: `/projects/`,
        method: "GET",
        params: status ? { status: status } : undefined,
      }),
      transformResponse: (response: any) => {
        console.log('API response:', response);
        return response;
      },
      providesTags: ['Projects'],
    }),

    getProjectById: build.query<ProjectId, number>({
      query: (id) => ({
        url: `/projects/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Stages', id }, {type: 'Projects'}],
    }),

    createProject: build.mutation<ProjectId, ProjectPostRequest>({
      query: (body) => ({
        url: `/projects/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Projects'],
    }),

    getProjectLabels: build.query<{ id: number; label: string }[], void>({
      query: () => ({
        url: `/projects/labels/`,
        method: "GET",
      }),
    }),

    updateProject: build.mutation<ProjectId, { id: number; data: ProjectUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),

    patchProject: build.mutation<Project<ProjectList>, { id: number; data: Partial<ProjectUpdateRequest> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),

    deleteProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/projects/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useGetProjectLabelsQuery,
  useUpdateProjectMutation,
  usePatchProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;