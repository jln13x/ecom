import { NextApiRequest } from "next";
import crypto from "crypto";
import { env } from "@/env/server.mjs";

export const isRequestFromShopify = async (
  req: NextApiRequest,
  rawBody: Buffer,
) => {
  const shopifyHmac = req.headers["x-shopify-hmac-sha256"];
  if (!shopifyHmac) return false;

  const hash = crypto
    .createHmac("sha256", env.SHOPIFY_WEBHOOK_KEY)
    .update(rawBody)
    .digest("base64");

  return shopifyHmac === hash;
};
