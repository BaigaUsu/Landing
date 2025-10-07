import { rootApi } from "@/RTKQuery/api/rootApi";

interface FileUploadResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

interface FileData {
    id: string;
    filename: string;
    size: number;
    uploaded_at: string;
}

export const filesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<FileUploadResponse<FileData>, { id: string; category: string; file: File }>({
            query: ({ id, category, file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `projects/${id}/files/${category}/`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Projects'], // Можно конкретизировать тег категории, если хочешь
        }),
        deleteFile: builder.mutation<void, { id: string; category: string; fileId: string }>({
            query: ({ id, category, fileId }) => ({
                url: `projects/${id}/files/${category}/${fileId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects'],
        }),
            getFiles: builder.query<FileUploadResponse<FileData>, { id: string; category: string }>({
            query: ({ id, category }) => `projects/${id}/files/${category}/`,
            providesTags: ['Projects'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useUploadFileMutation,
    useDeleteFileMutation,
    useGetFilesQuery,
} = filesApi;