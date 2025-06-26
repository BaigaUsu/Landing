import { rootApi } from "@/RTKQuery/api/rootApi";
import { Stage, StageRequest } from "@/types/stagesTypes";

export const stageApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getStages: build.query<Stage[], void>({
      query: () => ({
        url: "http://95.179.247.253/api/v1/projects/stages/",
        method: "GET",
      }),
    }),
    getStageById: build.query<Stage, number>({
      query: (id) => ({
        url: `http://95.179.247.253/api/v1/projects/stages/${id}/`,
        method: "GET",
      }),
    }),
    createStage: build.mutation<Stage, { body: StageRequest }>({
      query: ({ body }) => ({
        url: "http://95.179.247.253/api/v1/projects/stages/",
        method: "POST",
        body,
      }),
    }),
    updateStage: build.mutation<Stage, { id: number; data: StageRequest }>({
      query: ({ id, data }) => ({
        url: `http://95.179.247.253/api/v1/projects/stages/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    patchStage: build.mutation<Stage, { id: number; data: Partial<Stage> }>({
      query: ({ id, data }) => ({
        url: `http://95.179.247.253/api/v1/projects/stages/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteStage: build.mutation<void, number>({
      query: (id) => ({
        url: `http://95.179.247.253/api/v1/projects/stages/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStagesQuery,
  useGetStageByIdQuery,
  useCreateStageMutation,
  useUpdateStageMutation,
  usePatchStageMutation,
  useDeleteStageMutation,
} = stageApi;