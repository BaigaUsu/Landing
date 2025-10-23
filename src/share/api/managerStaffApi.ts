import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffCreateRequest, StaffId, StaffList, StaffUpdateRequest } from "../types/staffTypes";

export const staffApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getManagerStaff: build.query<Staff<StaffList>, void>({
            query: () => ({
                url: "/accounts/staff/manager/",
                method: "GET",
            }),
            providesTags: ["Manager"],
        }),
        getManagerStaffById: build.query<StaffId, number>({
            query: (id) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "GET",
            }),
            providesTags: ["Manager"],
        }),
        createManagerStaff: build.mutation<StaffId, StaffCreateRequest>({
            query: (body) => ({
                url: `/accounts/staff/manager/`,
                method: "POST",
                body,
            }),
        }),
        updateManagerStaff: build.mutation<StaffId, { id: number; data: StaffUpdateRequest }>({
            query: ({ id, data }) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Manager"],
        }),
        patchManagerStaff: build.mutation<StaffId, { id: number; data: Partial<StaffUpdateRequest> }>({
            query: ({ id, data }) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Manager"],
        }),
        deleteManagerStaff: build.mutation<{ detail: string }, number>({
            query: (id) => ({
                url: `/accounts/staff/manager/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Manager"],
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