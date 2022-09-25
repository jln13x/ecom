import { storefrontClient } from "@/lib/storefront-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { validateResponse } from "../error-tracking";
import { GetCartResponse, getCartShopifyResponseSchema } from "./schema";
import { getCartId, removeCartId } from "./storage";

export const cartQueryKeys = {
  all: [
    {
      scope: "cart",
    },
  ],
};

// Pre Client Side Fetching - Waiting for https://community.shopify.com/c/shopify-apis-and-sdks/storefront-api-generation-of-delegate-access-token-shopify/td-p/1650815
// export const useCart = () => {
//   return useQuery<GetCartResponse>(cartQueryKeys.all, {
//     queryFn: () => httpClient.get("/api/cart"),
//     staleTime: 1000 * 60 * 5,
//     retry: 3,
//   });
// };

export const useCart = () => {
  const qc = useQueryClient();
  return useQuery<GetCartResponse>(cartQueryKeys.all, {
    queryFn: async () => {
      const cartId = getCartId();

      if (!cartId) {
        return {
          cart: null,
        };
      }

      const response = await storefrontClient.request(document, {
        cartId,
      });

      return validateResponse(response, getCartShopifyResponseSchema);
    },
    onSuccess: ({ cart }) => {
      if (!cart) removeCartId();
    },
    onError: () => {
      removeCartId();
    },
    // 1min
    staleTime: 1000 * 60 * 1,
    retry: 3,
  });
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
