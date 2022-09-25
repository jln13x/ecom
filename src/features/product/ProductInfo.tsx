import { Button, Container } from "@/components";
import { Disclosure } from "@headlessui/react";
import NextLink from "next/link";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { ClientAnalytics } from "../analytics";
import { ImageCarousel } from "../carousel";
import { AddToCart } from "../cart/AddToCart";
import { useCheckout } from "../checkout";
import { PaymentMethods } from "../payment-methods";
import { Price } from "../price";
import { ReviewStars } from "../reviews";
import { Checklist } from "./Checklist";
import { Options } from "./options";
import { useProduct } from "./ProductContext";
import { useVariant } from "./use-variant";

export const ProductInfo = () => {
  const { product } = useProduct();
  const variant = useVariant();
  const { mutate: checkout } = useCheckout();

  const { title } = product;

  const handleCheckout = () => {
    if (!variant) return;

    ClientAnalytics.publish({
      action: "product_checkout",
      params: {
        currency: "USD",
        item_id: variant.product.id,
        item_name: variant.product.title,
        item_variant: variant.id,
        quantity: 1,
      },
    });

    checkout({
      lineItems: [
        {
          variantId: variant.id,
          quantity: 1,
        },
      ],
    });
  };

  return (
    <section title="Product Info" id="product-info" className="md:pt-24">
      <Container className="md:flex md:space-x-4">
        {product.images.nodes.length > 0 && (
          <div className="mx-auto max-w-2xl">
            <ImageCarousel images={product.images.nodes} />
          </div>
        )}
        <div>
          <h1>{title}</h1>
          <div className="mt-2 flex items-center space-x-2">
            <ReviewStars rating={4.5} />
            <NextLink href="#reviews" scroll>
              <a className="text-xs text-zinc-500">325 reviews</a>
            </NextLink>
          </div>
          <p className="mt-2 text-sm text-zinc-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quasi corrupti rem architecto commodi nulla.
          </p>
          {variant && (
            <div className="my-2">
              <Price
                price={+variant.priceV2.amount}
                previousPrice={
                  variant.compareAtPriceV2
                    ? +variant.compareAtPriceV2.amount
                    : undefined
                }
                showSavedAmount
              />
            </div>
          )}
          <Options options={product.options} />
          <div className="mt-4 flex flex-col items-center justify-center space-y-2 xl:flex-row xl:justify-start xl:space-y-0 xl:space-x-2">
            <Button
              className="xl inline-flex w-full items-center justify-center self-center font-bold uppercase tracking-wide xl:w-auto"
              onClick={handleCheckout}
              isDisabled={!variant}
            >
              Buy it now!
            </Button>
            <AddToCart productVariant={variant} className="w-full xl:w-auto" />
          </div>
          <PaymentMethods
            className="mt-8 lg:justify-start"
            methods={[
              "paypal",
              "apple-pay",
              "google-pay",
              "visa",
              "mastercard",
              "amex",
              "maestro",
              "shop-pay",
            ]}
          />

          <div>
            <Checklist
              className="my-8"
              items={[
                "Ergonomic",
                "Keeps you productive and healthy",
                "Works on any surface",
                "Easy to carry - bring it with you anywhere",
              ]}
            />
            <Disclosure>
              <Disclosure.Button className="flex w-full items-center justify-between border-b-2 border-b-black text-lg font-medium">
                <span>Details</span>
                <HiChevronDown />
              </Disclosure.Button>
              <Disclosure.Panel>
                <table className="mt-2 w-full table-auto">
                  <tr>
                    <td className="font-bold">Size</td>
                    <td>
                      <ChangeableSize
                        length={10}
                        width={4.5}
                        height={1.7}
                        unit={"cm"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Weight</td>
                    <td>
                      <ChangeableWeight weight={40.6} unit="g" />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Material</td>
                    <td>Silicone</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Colors</td>
                    <td>Midnight Black & Platinum Gray</td>
                  </tr>
                </table>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
      </Container>
    </section>
  );
};

interface SizeProps {
  length: number;
  width: number;
  height: number;
  unit: Unit;
}

type Unit = "cm" | "in";

const ChangeableSize = ({ length, width, height, unit }: SizeProps) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(unit);

  const oppositeUnit = selectedUnit === "cm" ? "in" : "cm";

  const changeUnit = () => {
    setSelectedUnit(oppositeUnit);
  };

  const convertedLength = selectedUnit === "cm" ? length : length / 2.54;
  const convertedWidth = selectedUnit === "cm" ? width : width / 2.54;
  const convertedHeight = selectedUnit === "cm" ? height : height / 2.54;

  return (
    <div className="flex space-x-1">
      <p>{`${Number(convertedLength.toFixed(2))} x  ${Number(
        convertedWidth.toFixed(2)
      )} x ${Number(convertedHeight.toFixed(2))}`}</p>
      <button className="rounded-md bg-neutral-200 px-1" onClick={changeUnit}>
        {selectedUnit}
      </button>
    </div>
  );
};

interface WeightProps {
  weight: number;
  unit: WeightUnit;
}

type WeightUnit = "g" | "oz";

const ChangeableWeight = ({ weight, unit }: WeightProps) => {
  const [selectedUnit, setSelectedUnit] = useState(unit);

  const oppositeUnit = selectedUnit === "g" ? "oz" : "g";

  const changeUnit = () => {
    setSelectedUnit(oppositeUnit);
  };

  const convertedWeight = selectedUnit === "g" ? weight : weight / 28.3495;

  return (
    <div className="flex space-x-1">
      <p>{Number(convertedWeight.toFixed(2))}</p>
      <button className="rounded-md bg-neutral-200 px-1" onClick={changeUnit}>
        {selectedUnit}
      </button>
    </div>
  );
};
