import { rootApi } from "@/RTKQuery/api/rootApi";
import { create } from "domain";
import { Specialization } from "../types/specializationTypes";

export const specializationApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // specializationApi.ts
getWorkerLabels: build.query<Specialization[], string | undefined>({
    query: (specialization) => ({
      url: "/accounts/staff/worker-labels/",
      method: "GET",
      // RTK Query сам добавит ?specialization=... в конец URL
      params: specialization ? { specialization } : {},
    }),
  }),

    getSpecializations: build.query<Specialization[], void>({
      query: () => ({
        url: "/accounts/specializations/",
        method: "GET",
      }),
    }),
    createSpecialization: build.mutation<void, Partial<Specialization>>({
      query: (newSpecialization) => ({
        url: "/accounts/specializations/",
        method: "POST",
        body: newSpecialization,
      }),
    }),
  }),
});

export const {
  useGetWorkerLabelsQuery,
  useGetSpecializationsQuery,
  useCreateSpecializationMutation,
} = specializationApi;