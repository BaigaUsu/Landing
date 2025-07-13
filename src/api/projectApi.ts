import { rootApi } from "@/RTKQuery/api/rootApi";
import { Project, ProjectRequest } from "@/types/projectTypes";

export const projectsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
        query: () => ({
            url: "http://95.179.247.253/api/v1/projects/",
            method: "GET"
        }),
        providesTags: ['Projects'],
    }),
    getActualProjects: build.query<Project[], void>({
        query: () => ({
            url: "http://95.179.247.253/api/v1/projects/actual/",
            method: "GET"
        }),
        providesTags: ['Projects'],
    }),
    getProjectById: build.query<Project, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`
        }),
    }),
    createProject: build.mutation<Project, ProjectRequest>({
        query: (body) => ({
            url: "http://95.179.247.253/api/v1/projects/",
            method: "POST",
            body,
        }),
        invalidatesTags: ['Projects'],
    }),
    getProjectLabels: build.query<{ id: number; label: string }[],void>({
        query: () => ({
            url: `http://95.179.247.253/api/v1/projects/labels/`,
            method: "GET",
        }),
    }),
    updateProject: build.mutation<Project, { id: number; data: ProjectRequest }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ['Projects'],
    }),
    patchProject: build.mutation<Project, { id: number; data: Partial<ProjectRequest> }>({
        query: ({ id, data }) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "PATCH",
            body: data,
        }),
        invalidatesTags: ['Projects'],
    }),
    deleteProject: build.mutation<void, number>({
        query: (id) => ({
            url: `http://95.179.247.253/api/v1/projects/${id}/`,
            method: "DELETE",
        }),
        invalidatesTags: ['Projects'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useGetActualProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useGetProjectLabelsQuery,
  useUpdateProjectMutation,
  usePatchProjectMutation,
  useDeleteProjectMutation
} = projectsApi;