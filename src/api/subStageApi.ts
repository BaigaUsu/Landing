import { rootApi } from "@/RTKQuery/api/rootApi";
import { SubStage, SubStageRequest } from "@/types/subStagesTypes";

export const subStageApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSubStages: build.query<SubStage[], void>({
      query: () => ({
        url: "http://95.179.247.253/api/v1/projects/substages/",
        method: "GET",
      }),
    }),
    getSubStageById: build.query<SubStage, number>({
      query: (id) => ({
        url: `http://95.179.247.253/api/v1/projects/substages/${id}/`,
        method: "GET",
      }),
    }),
    createSubStage: build.mutation<SubStage, { body: SubStageRequest }>({
      query: ({ body }) => ({
        url: "http://95.179.247.253/api/v1/projects/substages/",
        method: "POST",
        body,
      }),
    }),
    updateSubStage: build.mutation<SubStage, { id: number; data: SubStageRequest }>({
      query: ({ id, data }) => ({
        url: `http://95.179.247.253/api/v1/projects/substages/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    patchSubStage: build.mutation<SubStage, { id: number; data: Partial<SubStage> }>({
      query: ({ id, data }) => ({
        url: `http://95.179.247.253/api/v1/projects/substages/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSubStage: build.mutation<void, number>({
      query: (id) => ({
        url: `http://95.179.247.253/api/v1/projects/substages/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSubStagesQuery,
  useGetSubStageByIdQuery,
  useCreateSubStageMutation,
  useUpdateSubStageMutation,
  usePatchSubStageMutation,
  useDeleteSubStageMutation,
} = subStageApi;