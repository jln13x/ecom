import { Container, Link } from "@/components";
import { Mark } from "@/components/Mark";
import { ClientAnalytics } from "@/features/analytics";
import { Price } from "@/features/price";
import { FeaturedProduct, featuredProductSchema } from "@/features/product";
import { Checklist } from "@/features/product/Checklist";
import { ProductLink } from "@/features/product/ProductLink";
import { storefrontClient } from "@/server/graphql-client";
import { gql } from "graphql-request";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import NextLink from "next/link";
import { HiChevronDoubleDown } from "react-icons/hi";
import { z } from "zod";

interface HomeProps {
  featuredProduct: FeaturedProduct;
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  featuredProduct,
}) => {
  const handleCta = () => {
    ClientAnalytics.publish({
      action: "hero_product_link_click",
      params: {},
    });
  };

  return (
    <>
      <Head>
        <title>Lorem Ipsum</title>
      </Head>
      <div className="h-full w-full">
        <div className="relative  h-[calc(100vh-8.5rem)] w-full overflow-hidden ">
          <Image
            src="/frontpage.jpg"
            width={1354}
            height={1000}
            alt=""
            className="h-full w-full object-cover blur-[1px]"
            priority
          />
          <div className="absolute inset-0 top-0 h-full w-full bg-black/60 pt-16 pb-4 md:pt-32">
            <Container className="relative flex h-full  w-full flex-col justify-between text-white">
              <div className="md:mx-auto md:flex md:w-1/2 md:flex-col md:justify-center">
                <h1 className="relative z-20 text-center font-bold">
                  Lorem <Mark className="">Ipsum</Mark>
                </h1>
                <div className="mt-8 flex flex-col">
                  <p className="text-center text-lg md:text-2xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Veritatis nihil molestias, dignissimos fugiat enim itaque
                    obcaecati facere vero doloribus provident, ipsa ducimus
                    laudantium impedit nobis et? Illum tempora tenetur dolorum.
                    Possimus architecto at libero odit quod sit laborum,
                    dignissimos placeat cum quibusdam earum voluptas eveniet
                    consectetur. Impedit error quam eos.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col">
                <p className="text-center text-xs font-medium uppercase tracking-widest text-stone-200">
                  Lorem Ipsum
                </p>

                <Link
                  className="relative mt-2 self-center font-bold uppercase tracking-wider"
                  href="/products/foo"
                  onClick={handleCta}
                >
                  Show me the product
                  <div className="absolute -left-4 -bottom-2 w-14 rotate-45">
                    <Image
                      src="/product.png"
                      width={400}
                      height={400}
                      alt="Picture of the product"
                    />
                  </div>
                </Link>
              </div>

              <div className="text-xs text-stone-400">
                <NextLink href="/" passHref>
                  <a className="grid place-items-center">
                    <p className="font-medium uppercase tracking-wide">
                      Read more
                    </p>
                    <HiChevronDoubleDown className="mt-2 animate-bounce" />
                  </a>
                </NextLink>
              </div>
            </Container>
          </div>
        </div>
        <section className="pt-8 md:pt-36">
          <Container>
            <h2 className="font-bold">
              Lorem ipsum dolor, sit amet <Mark>consectetur</Mark> adipisicing
              elit.
            </h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              sapiente id maxime in corporis quis quod aliquam laudantium? Hic
              voluptatum id, corrupti velit ut cum facere laudantium veritatis
              in quas tempora eos aspernatur itaque dolores dolore, quis fugiat
              commodi eveniet delectus sint similique magni rem obcaecati.
              Labore nemo quo illum?
            </p>

            <p className="mt-2">
              <ProductLink />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              fugit harum accusamus ratione assumenda expedita dolore aliquid at
              repellat ullam.
            </p>

            <Checklist
              items={["Foo1", "Foo2", "Foo3", "Foo4", "Foo5"]}
              className="mt-4"
            />

            <Link
              href="/products/product"
              className="mx-auto mt-4 w-fit font-bold"
            >
              Get your product
            </Link>

            <div className="mt-6 h-auto w-full">
              <Image
                src="/product.jpg"
                width={790}
                height={361}
                alt="Lorem Ipsum"
                className="h-full w-full rounded-lg"
              />
            </div>
          </Container>
        </section>
        <section className="pt-8 md:pt-36">
          <Container>
            <h2 className="font-bold">
              Lorem ipsum, dolor sit <Mark>amet</Mark> consectetur adipisicing
              elit.
            </h2>
            <p className="mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptate fugit beatae eum nulla, ullam veritatis.
            </p>

            <p className="mt-2">
              With <ProductLink /> ipsum dolor sit amet consectetur adipisicing
              elit. Distinctio optio quia dolorem illum nobis modi harum vero
              quibusdam aliquam! Dolore.
            </p>

            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias, ducimus!
            </p>

            <Checklist
              className="mt-4"
              items={["Lorem 1", "Lorem 2", "Lorem 3", "Lorem 4", "Lorem 5"]}
            />

            <Link
              href="/products/product"
              className="mx-auto mt-6 w-fit font-bold"
            >
              Get your product
            </Link>
          </Container>
        </section>

        <Container className="my-16 flex justify-center">
          <Image
            src="/product.jpg"
            width={970}
            height={600}
            alt="Lorem Ipsum"
            className="max-h-full max-w-full rounded-lg"
            priority={true}
          />
        </Container>

        <section>
          <Container>
            <div>
              <div className="mx-auto mt-8 flex max-w-lg flex-col items-center rounded-md border border-zinc-200 bg-neutral-50 px-2 py-4 md:mt-12">
                <p className="text-xl font-bold">{featuredProduct.title}</p>
                {featuredProduct.featuredImage && (
                  <div className="w-2/3 max-w-2xl">
                    <Image
                      src={featuredProduct.featuredImage.url}
                      width={featuredProduct.featuredImage.width}
                      height={featuredProduct.featuredImage.height}
                      alt={featuredProduct.featuredImage.altText || ""}
                    />
                  </div>
                )}
                <Price
                  price={+featuredProduct.priceRange.maxVariantPrice.amount}
                  previousPrice={
                    +featuredProduct.compareAtPriceRange.maxVariantPrice.amount
                  }
                  showSavedAmount
                  className="mt-2"
                />

                <Link href="/products/product" className="mt-6 font-bold">
                  I want one!
                </Link>
              </div>
            </div>

            <div className="mt-32 sm:mx-auto md:mt-16">
              <p className="text-center text-xl font-medium md:text-2xl">
                Any questions?
              </p>
              <p className="mt-2 text-center md:text-lg">
                Make sure to checkout the{" "}
                <NextLink href="/products/product" passHref>
                  <a className="font-bold text-brand-primary">
                    Frequently asked questions
                  </a>
                </NextLink>{" "}
                on the product page or feel free to{" "}
                <NextLink href="/contact" passHref>
                  <a className="font-bold text-brand-primary">contact us.</a>
                </NextLink>
              </p>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featuredProductHandle = "lorem";

  const data = await storefrontClient.request(query, {
    handle: featuredProductHandle,
  });

  const schema = z.object({
    product: featuredProductSchema,
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      featuredProduct: result.data.product,
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
      featuredImage {
        width
        altText
        height
        id
        url
      }
      priceRange {
        minVariantPrice {
          amount
        }
        maxVariantPrice {
          amount
        }
      }
      compareAtPriceRange {
        maxVariantPrice {
          amount
        }
      }
    }
  }
`;

export default Home;
