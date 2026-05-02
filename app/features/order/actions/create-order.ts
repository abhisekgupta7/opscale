"use server";

export interface CreateOrderInput {
  customerId: string;
}

export async function createOrder(_input: CreateOrderInput) {
  return {
    success: false,
    message: "Not implemented",
  };
}
