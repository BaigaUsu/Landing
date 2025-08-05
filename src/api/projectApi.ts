import { rootApi } from "@/RTKQuery/api/rootApi";
import { Project, ProjectRequest } from "@/features/project/types/projectTypes";

export const projectsApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => ({
        url: `/projects/`,
        method: "GET",
      }),
      providesTags: ['Projects'],
    }),

    getActualProjects: build.query<Project[], void>({
      query: () => ({
        url: `/projects/actual/`,
        method: "GET",
      }),
      providesTags: ['Projects'],
    }),

    getProjectById: build.query<Project, number>({
      query: (id) => ({
        url: `/projects/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Stages', id }, {type: 'Projects'}],
    }),

    createProject: build.mutation<Project, ProjectRequest>({
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

    updateProject: build.mutation<Project, { id: number; data: ProjectRequest }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),

    patchProject: build.mutation<Project, { id: number; data: Partial<ProjectRequest> }>({
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
  useGetActualProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useGetProjectLabelsQuery,
  useUpdateProjectMutation,
  usePatchProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;