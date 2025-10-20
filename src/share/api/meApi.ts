import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffList } from "../types/staffTypes";

export const meApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getCurrentMe: build.query<Staff<StaffList>, void>({
            query: () => ({
                url: "/accounts/me/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetCurrentMeQuery,
} = meApi;