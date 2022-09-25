import { getCartShopifyResponseSchema } from "@/features/cart";
import { COOKIES, getCookie } from "@/server/cookie";
import { storefrontClient } from "@/server/graphql-client";
import { gql } from "graphql-request";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Waiting for https://community.shopify.com/c/shopify-apis-and-sdks/storefront-api-generation-of-delegate-access-token-shopify/td-p/1650815
  return res.status(405).end();

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const cartId = getCookie(req, COOKIES.CART);

  if (!cartId)
    return res.json({
      cart: null,
    });

  const data = await storefrontClient.request(document, {
    cartId,
  });

  const shopifyResponse = getCartShopifyResponseSchema.parse(data);

  return res.status(200).json(shopifyResponse);
};

const document = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      checkoutUrl
      lines(first: 10) {
        nodes {
          merchandise {
            ... on ProductVariant {
              id
              image {
                width
                height
                altText
                url
              }
              product {
                title
              }
              priceV2 {
                amount
              }
              compareAtPriceV2 {
                amount
              }
              title
            }
          }
          id
          quantity
        }
      }
    }
  }
`;

export default handler;
