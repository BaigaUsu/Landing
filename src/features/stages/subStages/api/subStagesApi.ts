import { rootApi } from "@/RTKQuery/api/rootApi";
import { SubStage, SubStageId, SubStageList, SubStageRequest } from "../types/subStagesTypes";
import { ServerStageUrlKind } from "../../types/types";

export const subStages = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getSubStages: build.query<SubStage<SubStageList>, {id: number, kind: ServerStageUrlKind; status?: string; stageId: number}>({
            query: ({id, kind, status, stageId}) => ({
                method: 'GET',
                url: `/projects/${id}/stages/${kind}/${stageId}/substages/`,
                params: status ? { status: status } : undefined,
            }),
            providesTags: ['SubStages'],
        }),
        getSubStagesById: build.query<SubStageId, {id: number, kind: ServerStageUrlKind; stageId: number; subStageId: number}>({
            query: ({id, kind, stageId, subStageId}) => ({
                method: 'GET',
                url: `/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/`,
            }),
            providesTags: ['SubStages'],
        }),
        createSubStages: build.mutation<SubStageList, {id: number, kind: ServerStageUrlKind; stageId: number, body: SubStageRequest}>({
            query: ({id, kind, stageId, body}) => ({
                method: 'POST',
                url: `/projects/${id}/stages/${kind}/${stageId}/substages/`,
                body
            }),
            invalidatesTags: ['Stages', 'SubStages'],
        }),
        updateSubStages: build.mutation<SubStageList, {id: number, kind: ServerStageUrlKind; stageId: number, subStageId: number, body: SubStageRequest}>({
            query: ({id, kind, stageId, subStageId, body}) => ({
                method: 'PUT',
                url: `/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/`,
                body
            }),
            invalidatesTags: ['SubStages'],
        }),
        deleteSubStages: build.mutation<void, {id: number, kind: ServerStageUrlKind; stageId: number, subStageId: number}>({
            query: ({id, kind, stageId, subStageId}) => ({
                method: 'DELETE',
                url: `/projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/`,
            }),
            invalidatesTags: ['Stages', 'SubStages'],
        }),
    })
});

export const { 
    useGetSubStagesQuery,
    useGetSubStagesByIdQuery,
    useCreateSubStagesMutation,
    useUpdateSubStagesMutation,
    useDeleteSubStagesMutation
 } = subStages;
