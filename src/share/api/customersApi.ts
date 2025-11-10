// src/api/clientsApi.ts

import { rootApi } from "@/RTKQuery/api/rootApi";
import { CreateCustomers, Customers, UpdateCustomers } from "../types/customersTypes";

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
            providesTags: ["Clients"],
        }),

        createCustomer: build.mutation<Customers, Partial<CreateCustomers>>({
            query: (newCustomer) => ({
                url: "/accounts/customers/",
                method: "POST",
                body: newCustomer,
            }),
            invalidatesTags: ["Clients"],
        }),

        updateCustomer: build.mutation<Customers, { id: number; data: Partial<UpdateCustomers> }>({
            query: ({ id, data }) => ({
                url: `/accounts/customers/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Clients"],
        }),

        patchCustomer: build.mutation<Customers, { id: number; data: Partial<UpdateCustomers> }>({
            query: ({ id, data }) => ({
                url: `/accounts/customers/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Clients"],
        }),

        deleteCustomer: build.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/accounts/customers/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Clients"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetCustomersQuery,
    useGetCustomersByIdQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    usePatchCustomerMutation,
    useDeleteCustomerMutation,
} = customersApi;