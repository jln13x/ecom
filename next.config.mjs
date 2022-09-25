import nextBundleAnalyzer from "@next/bundle-analyzer";

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["cdn.shopify.com"],
    },
    experimental: {
      images: {
        allowFutureImage: true,
      },
    },
  }),
);
