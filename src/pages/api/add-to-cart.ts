import {
  AddToCartInput,
  AddToCartResponse,
  addToCartSchema,
  addToCartShopifyResponseSchema,
  createCartShopifyResponseSchema,
} from "@/features/cart";
import { COOKIES, getCookie } from "@/server/cookie";
import { storefrontClient } from "@/server/graphql-client";
import { gql } from "graphql-request";
import { NextApiHandler } from "next";
import nookies from "nookies";

const handler: NextApiHandler = async (req, res) => {
  // Waiting for https://community.shopify.com/c/shopify-apis-and-sdks/storefront-api-generation-of-delegate-access-token-shopify/td-p/1650815
  return res.status(405).end();

  // if (req.method !== "POST") {
  //   res.status(405).end();
  //   return;
  // }

  // const lines = addToCartSchema.parse(req.body);

  // const cartId = getCookie(req, COOKIES.CART);

  // if (!cartId) {
  //   const response = await createNewCart(lines);

  //   nookies.set({ res }, "shopify_cart_id", response.cartId, {
  //     maxAge: 30 * 24 * 60 * 60,
  //     path: "/",
  //     httpOnly: true,
  //   });

  //   return res.json(response);
  // }

  // const response = await addToCart(cartId, lines);

  // return res.json(response);
};

const addToCart = async (
  cartId: string,
  lines: AddToCartInput,
): Promise<AddToCartResponse> => {
  const document = gql`
    mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;

  const data = await storefrontClient.request(document, {
    cartId,
    lines: lines.lines,
  });

  const shopifyResponse = addToCartShopifyResponseSchema.parse(data);

  if (!shopifyResponse.cartLinesAdd.cart) {
    return await createNewCart(lines);
  }

  return {
    cartId: shopifyResponse.cartLinesAdd.cart.id,
  };
};

const createNewCart = async (
  lines: AddToCartInput,
): Promise<AddToCartResponse> => {
  const document = gql`
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
        }
      }
    }
  `;

  const data = await storefrontClient.request(document, {
    input: lines,
  });

  const shopifyResponse = createCartShopifyResponseSchema.parse(data);

  return {
    cartId: shopifyResponse.cartCreate.cart.id,
  };
};

export default handler;
