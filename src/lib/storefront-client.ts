import { env } from "@/env/client.mjs";
import { GraphQLClient } from "graphql-request";

export const storefrontClient = new GraphQLClient(
  `${env.NEXT_PUBLIC_STOREFRONT_API_URL}`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
      "Content-Type": "application/json",
    },
  },
);
