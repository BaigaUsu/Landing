
import { rootApi } from "@/RTKQuery/api/rootApi";
import { FileData, FileUploadResponse } from "../../types/StagesFileTypes";
import { ServerStageUrlKind } from "../../types/types";

export const filesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSubStageFile: builder.mutation<FileUploadResponse<FileData>, { id: number; kind: ServerStageUrlKind; stageId: number; subStageId: number; category: string; file: File }>({
      query: ({ id, kind, category, stageId, subStageId, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/files/${category}/`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Files'], 
    }),
    deleteSubStageFile: builder.mutation<void, { id: number; kind: ServerStageUrlKind; stageId: number; subStageId: number; category: string; fileId: string }>({
      query: ({ id, kind, stageId, subStageId, category, fileId }) => ({
        url: `projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/files/${category}/${fileId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
    getSubStageFiles: builder.query<FileUploadResponse<FileData>, { id: number; kind: ServerStageUrlKind; stageId: number; subStageId: number; category: string }>({
      query: ({ id, kind, stageId, subStageId, category }) => `projects/${id}/stages/${kind}/${stageId}/substages/${subStageId}/files/${category}/`,
      providesTags: ['Files'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUploadSubStageFileMutation,
  useDeleteSubStageFileMutation,
  useGetSubStageFilesQuery,
} = filesApi;