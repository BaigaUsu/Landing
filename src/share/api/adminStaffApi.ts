import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffId, StaffList } from "../types/staffTypes";

export const adminApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getAdminStaff: build.query<Staff<StaffList>, void>({
            query: () => ({
                url: "/accounts/staff/admin/",
                method: "GET",
            }),
        }),
        getAdminStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "GET",
            }),
        }),
        createAdminStaff: build.mutation<StaffId, Partial<StaffId>>({
            query: (body) => ({
                url: `/accounts/staff/admin/`,
                method: "POST",
                body,
            }),
        }),
        updateAdminStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "PUT",
                body,
            }),
        }),
        patchAdminStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "PATCH",
                body,
            }),
        }),
        deleteAdminStaff: build.mutation<{ detail: string }, number>({
            query: (id) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAdminStaffQuery,
    useGetAdminStaffByIdQuery,
    useCreateAdminStaffMutation,
    useUpdateAdminStaffMutation,
    usePatchAdminStaffMutation,
    useDeleteAdminStaffMutation,
} = adminApi;