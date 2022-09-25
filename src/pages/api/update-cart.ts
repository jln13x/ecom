import { updateCartSchema } from "@/features/cart";
import { COOKIES, getCookie } from "@/server/cookie";
import { storefrontClient } from "@/server/graphql-client";
import { gql } from "graphql-request";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Waiting for https://community.shopify.com/c/shopify-apis-and-sdks/storefront-api-generation-of-delegate-access-token-shopify/td-p/1650815
  return res.status(405).end();

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const cartId = getCookie(req, COOKIES.CART);

  if (!cartId) {
    res.status(400).end();
    return;
  }

  const { lines } = updateCartSchema.parse(req.body);

  const response = await storefrontClient.request(document, {
    cartId,
    lines,
  });

  return res.json(response);
};

const document = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`;

export default handler;
