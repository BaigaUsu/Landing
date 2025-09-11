import { rootApi } from "@/RTKQuery/api/rootApi";
import { Specialization } from "@/share/types/specializationTypes";

export const specializationApi = rootApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getSpecializations: build.query<Specialization[], void>({
            query: () => ({
                url: "/specializations/",
                method: "GET",
            }),
        }),
        getArchitectLabels: build.query<Specialization[], void>({
            query: () => ({
                url: "/accounts/staff/architect-labels/",
                method: "GET",
            }),
        }),
        getDesignerLabels: build.query<Specialization[], void>({
            query: () => ({
                url: "accounts/staff/designer-labels/",
                method: "GET",
            }),
        }),
        getVisualizerLabels: build.query<Specialization[], void>({
            query: () => ({
                url: "/accounts/staff/visualizer-labels/",
                method: "GET",
            }),
        }),
        getComplectatorLabels: build.query<Specialization[], void>({
            query: () => ({
                url: "/accounts/staff/complectator-labels/",
                method: "GET",
            }),
        }),
        getManagerLabels: build.query<Specialization[], void>({
            query: () => ({
                url: "/accounts/staff/manager-labels/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetSpecializationsQuery,
    useGetArchitectLabelsQuery,
    useGetDesignerLabelsQuery,
    useGetVisualizerLabelsQuery,
    useGetComplectatorLabelsQuery,
    useGetManagerLabelsQuery,
} = specializationApi;