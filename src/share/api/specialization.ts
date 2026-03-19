import { rootApi } from "@/RTKQuery/api/rootApi";
import { Worker } from "@/share/types/worker-LabelsTypes";

export const specializationApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // specializationApi.ts
getWorkerLabels: build.query<Worker[], string | undefined>({
    query: (specialization) => ({
      url: "/accounts/staff/worker-labels/",
      method: "GET",
      // RTK Query сам добавит ?specialization=... в конец URL
      params: specialization ? { specialization } : {},
    }),
  }),

    getSpecializations: build.query<Worker[], void>({
      query: () => ({
        url: "/accounts/specializations/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWorkerLabelsQuery,
  useGetSpecializationsQuery,
} = specializationApi;