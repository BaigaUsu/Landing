import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffCreateRequest, StaffId, StaffList } from "../types/staffTypes";

export const staffApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getManagerStaff: build.query<Staff<StaffList>, void>({
            query: () => ({
                url: "/accounts/staff/manager/",
                method: "GET",
            }),
        }),
        getManagerStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "GET",
            }),
        }),
        createManagerStaff: build.mutation<StaffId, StaffCreateRequest>({
            query: (body) => ({
                url: `/accounts/staff/manager/`,
                method: "POST",
                body,
            }),
        }),
        updateManagerStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "PUT",
                body,
            }),
        }),
        patchManagerStaff: build.mutation<StaffId, { id: number; body: Partial<StaffId> }>({
            query: ({ id, body }) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "PATCH",
                body,
            }),
        }),
        deleteManagerStaff: build.mutation<{ detail: string }, number>({
            query: (id) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetManagerStaffQuery,
    useGetManagerStaffByIdQuery,
    useCreateManagerStaffMutation,
    useUpdateManagerStaffMutation,
    usePatchManagerStaffMutation,
    useDeleteManagerStaffMutation,
} = staffApi;