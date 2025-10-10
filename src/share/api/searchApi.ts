import { rootApi } from "@/RTKQuery/api/rootApi";

export type SearchType = "projects" | "stages" | "substages" | "tasks" | "applications";

export const searchApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    search: build.query<any, { type: SearchType; query: string }>({
      query: ({ type, query }) => {
        // Карта соответствия "типа" → фронтового proxy route
        const routes: Record<SearchType, string> = {
          projects: "/projects/search/",
          stages: "/projects/stages/search/",
          substages: "/projects/substages/search/",
          tasks: "/tasks/search/",
          applications: "/applications/search/",
        };

        return {
          url: routes[type],
          params: { query },
        };
      },
    }),
  }),
});

export const { useSearchQuery } = searchApi;