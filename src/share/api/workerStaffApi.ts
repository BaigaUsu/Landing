import { rootApi } from "@/RTKQuery/api/rootApi";
import { StaffId, StaffUpdateRequest } from "../types/staffTypes";

export const workerApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getWorkerStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "GET",
            }),
            providesTags: ["Worker"],
        }),
        updateWorkerStaff: build.mutation<StaffId, { id: number; body: StaffUpdateRequest }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Worker"],
        }),
        patchWorkerStaff: build.mutation<StaffId, { id: number; data: Partial<StaffUpdateRequest> }>({
            query: ({ id, data }) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Worker"]
        }),
    }),
});

export const {
    useGetWorkerStaffByIdQuery,
    useUpdateWorkerStaffMutation,
    usePatchWorkerStaffMutation,
} = workerApi;