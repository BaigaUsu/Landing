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
      providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),

    createCustomer: build.mutation<Customers, Partial<Customers>>({
      query: (newCustomer) => ({
        url: "/accounts/customers/",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Clients"],
    }),

    updateCustomer: build.mutation<Customers, { id: number; data: Partial<Customers> }>({
      query: ({ id, data }) => ({
        url: `/accounts/customers/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Clients", id }],
    }),

    patchCustomer: build.mutation<Customers, { id: number; data: Partial<Customers> }>({
        query: ({ id, data }) => ({
          url: `/accounts/customers/${id}/`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Clients", id }],
      }),

    deleteCustomer: build.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/accounts/customers/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomersByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;