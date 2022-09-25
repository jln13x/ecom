import { env } from "@/env/server.mjs";
import { GraphQLClient } from "graphql-request";

export const adminClient = new GraphQLClient(`${env.SHOPIFY_ADMIN_API_URL}`, {
  headers: {
    "X-Shopify-Access-Token": env.SHOPIFY_ADMIN_API_KEY,
    "Content-Type": "application/json",
  },
});
