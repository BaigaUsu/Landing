

export type Customers = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };

  export type CreateCustomers = {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
  };

  export type UpdateCustomers = {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
  };