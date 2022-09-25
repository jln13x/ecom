import { Container } from "@/components";
import { adminClient } from "@/lib/admin-client";
import { gql } from "graphql-request";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { z } from "zod";

const Policy: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  policy,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="pt-16">
        <Container className="word prose">
          <h1>{title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: policy,
            }}
          />
        </Container>
      </section>
    </>
  );
};

interface PolicyProps {
  title: string;
  policy: string;
}

export const getStaticProps: GetStaticProps<PolicyProps> = async ({
  params,
}) => {
  const response = await adminClient.request(document);

  const parsedResponse = policiesShopifyResponseSchema.safeParse(response);

  const policyParam = params?.policy;

  if (!parsedResponse.success || !policyParam)
    return {
      notFound: true,
    };

  const param = Array.isArray(policyParam) ? policyParam[0] : policyParam;

  if (!param)
    return {
      notFound: true,
    };

  const transformedType = transformType(param, "to-shopify");

  const policy = parsedResponse.data.shop.shopPolicies.find(
    (policy) => policy.type === transformedType,
  );

  if (!policy) {
    return {
      notFound: true,
    };
  }

  const policyType = transformType(policy.type, "from-shopify");

  if (!isSupported(policyType)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      policy: policy.body,
      title: policyTitles[policyType],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await adminClient.request(document);
  const parsedResponse = policiesShopifyResponseSchema.parse(response);

  const paths: Awaited<GetStaticPathsResult>["paths"] = [];

  for (const policy of parsedResponse.shop.shopPolicies) {
    const transformedType = transformType(policy.type, "from-shopify");

    if (isSupported(transformedType)) {
      paths.push({
        params: {
          policy: transformedType,
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

const policiesShopifyResponseSchema = z.object({
  shop: z.object({
    shopPolicies: z.array(
      z.object({
        type: z.string(),
        body: z.string(),
      }),
    ),
  }),
});

const document = gql`
  query {
    shop {
      shopPolicies {
        url
        body
        type
      }
    }
  }
`;

const transformType = (
  type: string,
  strategy: "from-shopify" | "to-shopify",
) => {
  if (strategy === "from-shopify") {
    return type.split("_").join("-").toLowerCase();
  }

  return type.split("-").join("_").toUpperCase();
};

const supportedPolicies = [
  "privacy-policy",
  "terms-of-service",
  "shipping-policy",
  "refund-policy",
  "legal-notice",
] as const;

const policyTitles: Record<typeof supportedPolicies[number], string> = {
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "shipping-policy": "Shipping & Delivery Policy",
  "refund-policy": "Refund Policy",
  "legal-notice": "Legal Notice",
};

const isSupported = (
  type: string,
): type is typeof supportedPolicies[number] => {
  const policies = supportedPolicies as unknown as string[];
  return policies.includes(type);
};

export default Policy;
