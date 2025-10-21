import { rootApi } from "@/RTKQuery/api/rootApi";
import { Staff, StaffList } from "../types/staffTypes";
import { Me } from "../types/me";

export const meApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getCurrentMe: build.query<Me, void>({
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