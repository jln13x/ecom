import {
  checkoutResponseSchema,
  createCheckoutSchema,
} from "@/features/checkout";
import { storefrontClient } from "@/server/graphql-client";
import { gql } from "graphql-request";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { lineItems } = createCheckoutSchema.parse(req.body);

  const data = await storefrontClient.request(document, {
    lineItems,
  });

  const response = checkoutResponseSchema.parse(data);

  return res.json(response);
};

const document = gql`
  mutation CreateCheckout($lineItems: [CheckoutLineItemInput!]) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        id
        webUrl
      }
    }
  }
`;

export default handler;
