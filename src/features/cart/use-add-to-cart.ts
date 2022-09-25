import { HttpError } from "@/lib/http-client";
import { storefrontClient } from "@/lib/storefront-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { validateResponse } from "../error-tracking";
import {
  AddToCartInput,
  AddToCartResponse,
  addToCartShopifyResponseSchema,
  createCartShopifyResponseSchema,
} from "./schema";
import { getCartId, removeCartId, setCartId } from "./storage";
import { cartQueryKeys } from "./use-cart";

export const useAddToCart = () => {
  const qc = useQueryClient();
  return useMutation<AddToCartResponse, HttpError, AddToCartInput>(
    (input) => {
      const cartId = getCartId();

      if (!cartId) {
        return createCart(input);
      }

      return addToCart(cartId, input);
    },
    {
      onSuccess: ({ cartId }) => {
        setCartId(cartId);
        qc.invalidateQueries(cartQueryKeys.all);
      },
      onError: () => removeCartId(),
    },
  );
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

  const response = await validateResponse(data, addToCartShopifyResponseSchema);

  if (!response.cartLinesAdd.cart) {
    return createCart(lines);
  }

  return {
    cartId: response.cartLinesAdd.cart.id,
  };
};

const createCart = async (
  lines: AddToCartInput,
): Promise<AddToCartResponse> => {
  const data = await storefrontClient.request(document, {
    input: lines,
  });

  const response = await validateResponse(
    data,
    createCartShopifyResponseSchema,
  );

  return {
    cartId: response.cartCreate.cart.id,
  };
};

const document = gql`
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
      }
    }
  }
`;
