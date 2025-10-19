import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff } from "../types/staffTypes";

export const staffApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getStaffs: build.query<Staff[], void>({
            query: () => ({
                url: "/accounts/staff/",
                method: "GET",
            }),
        }),
        getStaffById: build.query<Staff, number>({
            query: (id) => ({
                url: `/accounts/staff/${id}/`,
                method: "GET",
            }),
        }),
            getCurrentStaff: build.query<Staff, void>({
            query: () => ({
                url: "/accounts/me/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetStaffsQuery,
    useGetStaffByIdQuery,
    useGetCurrentStaffQuery,
} = staffApi;