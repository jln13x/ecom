// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  STOREFRONT_API_URL: z.string(),
  STOREFRONT_API_TOKEN: z.string(),
  EMAIL_FROM: z.string(),
  EMAIL_TO: z.string(),
  EMAIL_TEMPLATE_ID: z.string(),
  SENDGRID_API_KEY: z.string(),
  REVALIDATE_TOKEN: z.string(),
  SHOPIFY_WEBHOOK_KEY: z.string(),
  JUDGEME_API_KEY: z.string(),
  JUDGEME_API_URL: z.string(),
  SHOP_DOMAIN: z.string(),
  SHOPIFY_ADMIN_API_URL: z.string(),
  SHOPIFY_ADMIN_API_KEY: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_STOREFRONT_API_URL: z.string(),
  NEXT_PUBLIC_STOREFRONT_API_TOKEN: z.string(),
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string(),
  NEXT_PUBLIC_UMAMI_SCRIPT_LINK: z.string(),
  NEXT_PUBLIC_COMPANY_NAME: z.string(),
  NEXT_PUBLIC_COMPANY_EMAIL: z.string(),
  NEXT_PUBLIC_WEBSITE_URL: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_STOREFRONT_API_URL: process.env.NEXT_PUBLIC_STOREFRONT_API_URL,
  NEXT_PUBLIC_STOREFRONT_API_TOKEN:
    process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  NEXT_PUBLIC_UMAMI_SCRIPT_LINK: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_LINK,
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
};
