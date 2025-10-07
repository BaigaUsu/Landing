import { rootApi } from "@/RTKQuery/api/rootApi";

export const filesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getFiles: builder.mutation<Blob, { id: string }>({
            query: ({ id }) => ({
                url: `files/download/${id}/`,
                method: 'GET',
                responseHandler: (response) => response.blob(), // чтобы получить сам файл
              }),
        }),
    }),
    overrideExisting: false,
});

export const {
  useGetFilesMutation,
} = filesApi;