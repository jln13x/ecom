import { httpClient } from "@/lib/http-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CheckoutResponse, CreateCheckoutInput } from "./schema";

export const useCheckout = () => {
  const { push } = useRouter();
  return useMutation<CheckoutResponse, unknown, CreateCheckoutInput>(
    (input) => httpClient.post("/api/checkout", input),
    {
      onSuccess: (response) => {
        push(response.checkoutCreate.checkout.webUrl);
      },
    },
  );
};
