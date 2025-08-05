// src/api/clientsApi.ts

import { rootApi } from "@/RTKQuery/api/rootApi";
import { Client } from "@/share/types/usersTypes";


export const clientsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => ({
        url: "/accounts/clients/",
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    getClientById: build.query<Client, number>({
      query: (id) => `accounts/clients/${id}/`,
    //   providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetClientsQuery, useGetClientByIdQuery } = clientsApi;