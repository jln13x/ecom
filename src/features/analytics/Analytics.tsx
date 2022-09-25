import Script from "next/script";
import { isProduction } from "@/features//common/is-production";
import { env } from "@/env/client.mjs";

export const Analytics = () => {
  if (!isProduction) return null;

  return (
    <Script
      async
      defer
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      src={env.NEXT_PUBLIC_UMAMI_SCRIPT_LINK}
    />
  );
};
