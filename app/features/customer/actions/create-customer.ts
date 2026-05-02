"use server";

export interface CreateCustomerInput {
  name: string;
}

export async function createCustomer(_input: CreateCustomerInput) {
  return {
    success: false,
    message: "Not implemented",
  };
}
