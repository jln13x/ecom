import { env } from "@/env/server.mjs";
import { isRequestFromShopify } from "@/server/req-from-shopify";
import { NextApiHandler, NextApiRequest } from "next";
import getRawBody from "raw-body";
import { z } from "zod";

// Source: https://github.com/vercel/next.js/discussions/27702
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

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== env.REVALIDATE_TOKEN) {
    console.log({ message: "Invalid revalidate token" });
    return res.status(401).json({ message: "Invalid token" });
  }

  const rawBody = await getRawBody(req);

  if (!(await isRequestFromShopify(req, rawBody))) {
    console.log({ message: "Request not from shopify" });

    return res
      .status(401)
      .json({ message: "This request must originate from Shopify" });
  }

  const parsedSchema = productSchema.safeParse(JSON.parse(rawBody.toString()));

  if (!parsedSchema.success) {
    console.log({ message: "Invalid request body from Shopify" });
    return res
      .status(400)
      .json({ message: "Invalid request body from Shopify" });
  }

  const { handle } = parsedSchema.data;

  try {
    await res.revalidate(`/products/${handle}`);
    await res.revalidate(`/`);
    return res.json({ revalidated: true });
  } catch (err) {
    console.log({
      error: err,
    });
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
};

const productSchema = z.object({
  handle: z.string(),
});

export default handler;
