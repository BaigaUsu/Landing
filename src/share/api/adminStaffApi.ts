import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffCreateRequest, StaffId, StaffList, StaffUpdateRequest } from "../types/staffTypes";

export const adminApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getAdminStaff: build.query<Staff<StaffList>, void>({
            query: () => ({
                url: "/accounts/staff/admin/",
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),
        getAdminStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),
        createAdminStaff: build.mutation<StaffId, StaffCreateRequest>({
            query: (body) => ({
                url: `/accounts/staff/admin/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Admin"],
        }),
        updateAdminStaff: build.mutation<StaffId, { id: number; data: StaffUpdateRequest }>({
            query: ({ id, data }) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Admin"],
        }),
        patchAdminStaff: build.mutation<StaffId, { id: number; data: Partial<StaffUpdateRequest> }>({
            query: ({ id, data }) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Admin"],
        }),
        deleteAdminStaff: build.mutation<{ detail: string }, number>({
            query: (id) => ({
                url: `/accounts/staff/admin/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admin"],
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