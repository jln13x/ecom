import { env } from "@/env/server.mjs";
import { adminClient } from "@/lib/admin-client";
import { httpClient } from "@/lib/http-client";
import { isRequestFromShopify } from "@/server/req-from-shopify";
import { gql } from "graphql-request";
import { NextApiHandler } from "next";
import getRawBody from "raw-body";
import { z } from "zod";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const rawBody = await getRawBody(req);

  if (!(await isRequestFromShopify(req, rawBody))) {
    console.log({ message: "Request not from shopify" });

    return res
      .status(401)
      .json({ message: "This request must originate from Shopify" });
  }

  const body = JSON.parse(rawBody.toString());

  const parsedSchema = productSchema.safeParse(body);

  if (!parsedSchema.success) {
    console.log({ message: "Invalid request body from Shopify" });
    return res
      .status(400)
      .json({ message: "Invalid request body from Shopify" });
  }

  const params = new URLSearchParams({
    shop_domain: env.SHOP_DOMAIN,
    api_token: env.JUDGEME_API_KEY,
    external_id: `${parsedSchema.data.id}`,
  });

  const judgemeResponse = await httpClient.get(
    `${env.JUDGEME_API_URL}/products/-1?${params.toString()}`,
  );

  const judgemeParsedSchema = judgeMeProductSchema.safeParse(judgemeResponse);

  if (!judgemeParsedSchema.success) {
    console.log({
      message: "Invalid response body from JudgeMe",
      response: judgemeResponse,
    });
    return res
      .status(400)
      .json({ message: "Invalid response body from JudgeMe" });
  }

  const response = await adminClient.request(document, {
    metafields: [
      {
        namespace: "judgeme",
        key: "internal_id",
        type: "single_line_text_field",
        value: `${judgemeParsedSchema.data.product.id}`,
        ownerId: parsedSchema.data.admin_graphql_api_id,
      },
    ],
  });

  console.log({
    message: "Product Metafield created or updated",
    response,
  });

  return res.json({ message: "Product initialized" });
};

const productSchema = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string(),
});

const judgeMeProductSchema = z.object({
  product: z.object({
    id: z.number(),
  }),
});

const document = gql`
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        ownerType
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default handler;
