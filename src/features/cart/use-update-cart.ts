import { HttpError } from "@/lib/http-client";
import { storefrontClient } from "@/lib/storefront-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { UpdateCartInput } from "./schema";
import { getCartId } from "./storage";
import { cartQueryKeys } from "./use-cart";

export const updateCartMutationKey = [{ scope: "cart", action: "update" }];

export const useUpdateCart = () => {
  const qc = useQueryClient();

  return useMutation<unknown, HttpError, UpdateCartInput>(
    updateCartMutationKey,
    async (input) => {
      const cartId = getCartId();

      if (!cartId) {
        return Promise.reject("An error occured: No cart id");
      }

      return storefrontClient.request(document, {
        lines: input.lines,
        cartId,
      });
    },
    {
      onSuccess: async () => {
        await qc.invalidateQueries(cartQueryKeys.all);
      },
    },
  );
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
