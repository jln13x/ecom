import { z } from "zod";

export const createCheckoutSchema = z.object({
  lineItems: z.array(
    z.object({
      variantId: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const checkoutResponseSchema = z.object({
  checkoutCreate: z.object({
    checkout: z.object({
      id: z.string(),
      webUrl: z.string(),
    }),
  }),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>;
