// src/api/clientsApi.ts

import { rootApi } from "@/RTKQuery/api/rootApi";
import { Customers } from "../types/customersTypes";


export const customersApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<Customers[], void>({
      query: () => ({
        url: "/accounts/customers/",
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    getCustomersById: build.query<Customers, number>({
      query: (id) => `accounts/customers/${id}/`,
    //   providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCustomersQuery, useGetCustomersByIdQuery } = customersApi;