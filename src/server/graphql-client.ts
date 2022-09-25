import { GraphQLClient } from "graphql-request";
import { env } from "../env/server.mjs";

export const storefrontClient = new GraphQLClient(`${env.STOREFRONT_API_URL}`, {
  headers: {
    "X-Shopify-Storefront-Access-Token": env.STOREFRONT_API_TOKEN,
    "Content-Type": "application/json",
  },
});
