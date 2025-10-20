import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffId, StaffList } from "../types/staffTypes";

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
    }),
});

export const {
    useGetManagerStaffQuery,
    useGetManagerStaffByIdQuery,
} = staffApi;