import { z } from "zod";

export const addToCartSchema = z.object({
  lines: z.array(
    z.object({
      merchandiseId: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const createCartShopifyResponseSchema = z.object({
  cartCreate: z.object({
    cart: z.object({
      id: z.string(),
    }),
  }),
});

export const addToCartShopifyResponseSchema = z.object({
  cartLinesAdd: z.object({
    cart: z
      .object({
        id: z.string(),
      })
      .nullable(),
  }),
});

const cartItemSchema = z.object({
  merchandise: z.object({
    id: z.string(),
    image: z.object({
      width: z.number(),
      height: z.number(),
      altText: z.string().nullable(),
      url: z.string(),
    }),
    product: z.object({
      title: z.string(),
    }),
    title: z.string(),
    priceV2: z.object({
      amount: z.string(),
    }),
    compareAtPriceV2: z
      .object({
        amount: z.string(),
      })
      .nullable(),
  }),
  id: z.string(),
  quantity: z.number(),
});

export const getCartShopifyResponseSchema = z.object({
  cart: z
    .object({
      checkoutUrl: z.string(),
      cost: z.object({
        subtotalAmount: z.object({
          amount: z.string(),
          currencyCode: z.string(),
        }),
      }),
      lines: z.object({
        nodes: z.array(cartItemSchema),
      }),
    })
    .nullable(),
});

export const updateCartSchema = z.object({
  lines: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(0).max(1000),
    }),
  ),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartInput = z.infer<typeof updateCartSchema>;

export interface AddToCartResponse {
  cartId: string;
}

export type GetCartResponse = z.infer<typeof getCartShopifyResponseSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
