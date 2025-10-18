import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff } from "../types/staffTypes";

export const staffApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getUsers: build.query<Staff[], void>({
            query: () => ({
                url: "/accounts/staff/",
                method: "GET",
            }),
        }),
            getCurrentUser: build.query<Staff, void>({
            query: () => ({
                url: "/accounts/me/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetCurrentUserQuery,
} = staffApi;