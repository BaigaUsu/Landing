import { rootApi } from "@/RTKQuery/api/rootApi";
import { StageKind } from "../types/types";

export const stageKindsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getStageKinds: builder.query<StageKind[], void>({
      query: () => ({
        url: "/projects/stage-kinds/",
        method: "GET",
      }),
      providesTags: ["Stages"],
    }),
    createStageKinds: builder.mutation<StageKind, Partial<StageKind>>({
      query: (body) => ({
        url: "/projects/stage-kinds/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Stages"],
    }),
  }),
});

export const { useGetStageKindsQuery, useCreateStageKindsMutation } = stageKindsApi;