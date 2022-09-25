import { Container } from "@/components";
import { Accordion } from "@/features/accordion";
import {
  Product,
  ProductContextProvider,
  shopifyProductResponseSchema,
} from "@/features/product";
import { ProductInfo } from "@/features/product/ProductInfo";
import { Reviews } from "@/features/reviews";
import { gql } from "graphql-request";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { FaPlane } from "react-icons/fa";
import { HiLockClosed, HiShieldCheck } from "react-icons/hi";
import { z } from "zod";

import { storefrontClient } from "@/lib/storefront-client";
import Head from "next/head";
import NextLink from "next/link";

interface ProductProps {
  product: Product;
}

const Product: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
}) => {
  const title = `Shop - ${product.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ProductContextProvider product={product}>
        <ProductInfo />
        <div className="my-12 bg-neutral-100 py-8">
          <Container className="flex w-full flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-8 sm:space-y-0">
            <div className="flex flex-col items-center rounded-md  py-4 text-center ">
              <FaPlane className="-rotate-45 text-4xl" />
              <p className="mt-2 font-medium">Free Worldwide Shipping</p>
            </div>
            <div className="flex flex-col items-center rounded-md  py-4 text-center ">
              <HiShieldCheck className="text-4xl" />
              <p className="mt-2 font-medium">30 Day Money Back Guarantee</p>
            </div>
            <div className="flex flex-col items-center rounded-md  py-4 text-center ">
              <HiLockClosed className="text-4xl" />
              <p className="mt-2 font-medium">100% Safe and Secure Checkout</p>
            </div>
          </Container>
        </div>

        <Container className="text-center">
          <p>
            To find out even more about this product, please checkout{" "}
            <NextLink href="/" passHref>
              <a className="font-bold text-brand-primary">this page</a>
            </NextLink>{" "}
            .
          </p>
        </Container>

        <section id="reviews" className="pt-16">
          <Container>
            <h2 className="mb-4 text-center sm:text-left">
              What some of our customer say
            </h2>
            <Reviews />
          </Container>
        </section>
        <section className="my-16" title="Frequently Asked Questions" id="#faq">
          <Container>
            <h2 className="mb-6 text-center sm:text-left">
              Frequently Asked Questions
            </h2>
            <Accordion
              items={[
                {
                  title: "How long does shipping take?",
                  text: "Shipping takes 3-5 business days.",
                },
                {
                  title: "How long does shipping take?",
                  text: "Shipping takes 3-5 business days.",
                },
                {
                  title: "How long does shipping take?",
                  text: "Shipping takes 3-5 business days.",
                },
                {
                  title: "How long does shipping take?",
                  text: "Shipping takes 3-5 business days.",
                },
                {
                  title: "How long does shipping take?",
                  text: "Shipping takes 3-5 business days.",
                },
              ]}
            />

            <div className="mt-16 text-center">
              <p className="text-xl font-medium">Still questions left?</p>
              <p className="mt-2">
                We are happy to help you. Feel free to{" "}
                <NextLink href="/contact" passHref>
                  <a className="font-bold text-brand-primary">contact us</a>
                </NextLink>{" "}
                so we can help you out.
              </p>
            </div>
          </Container>
        </section>
      </ProductContextProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProductProps> = async ({
  params,
}) => {
  const handle = params?.product as string;

  const data = await storefrontClient.request(query, {
    handle,
  });

  const { product } = shopifyProductResponseSchema.parse(data);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...product,
        reviews: null,
      },
    },
  };
};

const query = gql`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      title
      handle
      id
      options {
        name
        id
        values
      }
      variants(first: 10) {
        nodes {
          id
          title
          selectedOptions {
            name
            value
          }
          priceV2 {
            amount
          }
          product {
            id
            title
          }
          compareAtPriceV2 {
            amount
          }
        }
      }
      images(first: 5) {
        nodes {
          width
          altText
          height
          id
          url
        }
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await storefrontClient.request(gql`
    {
      products(first: 5) {
        nodes {
          handle
        }
      }
    }
  `);

  const productsSchema = z.object({
    products: z.object({
      nodes: z.array(
        z.object({
          handle: z.string(),
        })
      ),
    }),
  });

  const { products } = productsSchema.parse(data);

  return {
    paths: products.nodes.map(({ handle }) => ({
      params: {
        product: handle,
      },
    })),
    fallback: false,
  };
};

export default Product;
