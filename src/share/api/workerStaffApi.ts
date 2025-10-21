import { rootApi } from "@/RTKQuery/api/rootApi";
import { StaffId } from "../types/staffTypes";

export const workerApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getWorkerStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "GET",
            }),
        }),
        updateWorkerStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "PUT",
                body,
            }),
        }),
        patchWorkerStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/worker/${id}/`,
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const {
    useGetWorkerStaffByIdQuery,
    useUpdateWorkerStaffMutation,
    usePatchWorkerStaffMutation,
} = workerApi;