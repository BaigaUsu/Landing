import { rootApi } from "@/RTKQuery/api/rootApi";
import { Stage, StageCreateRequest, StageId, StageList, StageUpdateRequest } from "@/features/stages/types/stagesTypes";
import { ServerStageUrlKind } from "../types/types";

export const specificStagesApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        // === GET by type ===
        getStages: build.query<Stage<StageList>, { id: number; kind: ServerStageUrlKind; status?: string }>({
            query: ({id, kind, status}) => ({
                url: `/projects/${id}/stages/${kind}/`,
                method: 'GET',
                params: status ? { status: status } : undefined,
            }),
            providesTags: ['Stages'],
        }),

        getStagesById: build.query<StageId, { id: number; kind: ServerStageUrlKind; stageId: number }>({
            query: ({ id, kind, stageId }) => ({
                url: `/projects/${id}/stages/${kind}/${stageId}/`,
                method: 'GET',
            }),
            providesTags: ['Stages'],
        }),

        // === CREATE by type ===
        createStages: build.mutation<StageList, { id: number; kind: string; body: StageCreateRequest }>({
            query: ({id, kind, body} ) => ({
                url: `/projects/${id}/stages/${kind}/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ['Stages'],
        }),

        // === UPDATE by type ===
        updateStages: build.mutation<StageList, { id: number; kind: string; body: StageUpdateRequest; stageId: number }>({
            query: ({ id, kind, body, stageId }) => ({
                url: `/projects/${id}/stages/${kind}/${stageId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ['Stages'],
        }),

        deleteStage: build.mutation<void, { id: number; kind: ServerStageUrlKind; stageId: number }>({
            query: ({ id, kind, stageId }) => ({
                url: `/projects/${id}/stages/${kind}/${stageId}/`,
                method: "DELETE",
            }),
            invalidatesTags: ['Stages'],
        }),
    }),
});

export const {
    useGetStagesQuery,
    useGetStagesByIdQuery,
    useCreateStagesMutation,
    useUpdateStagesMutation,
    useDeleteStageMutation
} = specificStagesApi;
