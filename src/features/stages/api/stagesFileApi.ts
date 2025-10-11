
import { rootApi } from "@/RTKQuery/api/rootApi";
import { FileData, FileUploadResponse } from "../types/StagesFileTypes";
import { ServerStageUrlKind } from "../types/types";

export const filesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadStageFile: builder.mutation<FileUploadResponse<FileData>, { id: number; kind: ServerStageUrlKind; stageId: number; category: string; file: File }>({
      query: ({ id, kind, category, file, stageId }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `projects/${id}/stages/${kind}/${stageId}/files/${category}/`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Files'], 
    }),
    deleteStageFile: builder.mutation<void, { id: number; kind: ServerStageUrlKind; stageId: number; category: string; fileId: string }>({
      query: ({ id, kind, stageId, category, fileId }) => ({
        url: `projects/${id}/stages/${kind}/${stageId}/files/${category}/${fileId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
    getStageFiles: builder.query<FileUploadResponse<FileData>, { id: number; kind: ServerStageUrlKind; stageId: number; category: string }>({
      query: ({ id, kind, stageId, category }) => `projects/${id}/stages/${kind}/${stageId}/files/${category}/`,
      providesTags: ['Files'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUploadStageFileMutation,
  useDeleteStageFileMutation,
  useGetStageFilesQuery,
} = filesApi;