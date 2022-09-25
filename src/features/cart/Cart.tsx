import { Link, LoadingOverlay } from "@/components";
import { CloseIcon } from "@/components/icons";
import { Dialog, Transition } from "@headlessui/react";
import { useIsMutating } from "@tanstack/react-query";
import Image from "next/future/image";
import React, {
  FocusEventHandler,
  Fragment,
  KeyboardEventHandler,
  useRef,
} from "react";
import { HiExclamation, HiLockClosed, HiMinus, HiPlus } from "react-icons/hi";
import { useSwipeable } from "react-swipeable";
import { YouSaveText } from "@/features/product";
import { fadeInOut, slideInOut } from "../transitions";
import { CartIcon } from "./CartIcon";
import { CartItem as CartItemType } from "./schema";
import { useCart } from "./use-cart";
import { useCartControl } from "./use-cart-control";
import { updateCartMutationKey, useUpdateCart } from "./use-update-cart";
import { ClientAnalytics } from "@/features/analytics";

export const Cart = () => {
  const { isOpen, toggle: toggleCart, close: closeCart } = useCartControl();
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => closeCart(),
    delta: 30,
  });

  const { data, isLoading: isLoadingCart, isFetching, isError } = useCart();
  const isUpdatingCart = useIsMutating(updateCartMutationKey);

  const lines = data?.cart?.lines;

  const isEmptyCart = data?.cart === null || lines?.nodes.length === 0;

  const handleCheckout = () => {
    if (!data?.cart) return;

    ClientAnalytics.publish({
      action: "cart_checkout",
      params: {
        currency: "USD",
        price: data.cart.cost,
        items: data.cart.lines.nodes.map((item) => ({
          product: item.merchandise.product.title,
          variant: item.merchandise.title,
          quantity: item.quantity,
          price: item.merchandise.priceV2.amount,
        })),
      },
    });
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleCart}
          className="group rounded-full border border-zinc-500 bg-white p-2 focus-within:outline-none focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <CartIcon className="stroke-brand-primary text-xl" />
        </button>
        <div className="absolute grid w-full -translate-y-2.5 place-items-center">
          <span className="flex h-6 w-6 select-none  items-center justify-center rounded-full border-2 border-white bg-brand-primary text-xs text-white">
            {data?.cart?.lines.nodes.length || 0}
          </span>
        </div>
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeCart} className="fixed inset-0 z-[9999]">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            leave="transition-opacity ease-out duration-300"
            {...fadeInOut("3/4")}
          >
            <Dialog.Overlay className="fixed inset-0 z-0 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            leave="transition-transform ease-in-out duration-300"
            {...slideInOut("right")}
          >
            <Dialog.Panel className="relative ml-auto h-full w-full p-3 sm:w-3/4 sm:pl-0 md:w-1/4 md:min-w-[32rem]">
              <div
                className=" relative z-30 flex  h-full flex-col rounded-md bg-white p-4"
                {...swipeHandlers}
              >
                <div className="flex justify-between">
                  <p className="grow text-2xl font-bold">Your Cart</p>
                  <button onClick={toggleCart}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="h-full  overflow-y-scroll py-4 pr-2 scrollbar-thin scrollbar-thumb-brand-primary">
                  {isError && (
                    <div className="grid h-full place-items-center">
                      <div className="flex select-none flex-col items-center">
                        <HiExclamation className="text-4xl text-rose-600" />
                        <p className="w-full text-center font-bold text-rose-600 ">
                          We are currently experiencing issues with your cart.
                          <br />
                          Our team is actively working on it.
                        </p>
                      </div>
                    </div>
                  )}
                  {isEmptyCart && (
                    <div className="grid h-full flex-grow place-items-center">
                      <div>
                        <p className="select-none text-neutral-600">
                          There are no items in your cart.
                        </p>
                      </div>
                    </div>
                  )}

                  {lines && lines.nodes.length > 0 && (
                    <div className="mt-6 flex w-full flex-grow flex-col space-y-16 ">
                      {lines?.nodes.map((line) => (
                        <CartItem
                          key={`${line.merchandise.id}_${line.quantity}`}
                          item={line}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between space-x-2 text-lg">
                    <p className="font-bold uppercase tracking-widest">
                      Subtotal
                    </p>
                    <p>${data?.cart?.cost?.subtotalAmount?.amount || 0}</p>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    Shipping and taxes are calculated at checkout.
                  </p>
                  {data?.cart?.checkoutUrl && (
                    <div className="relative">
                      <Link
                        href={data.cart.checkoutUrl}
                        disabled={lines?.nodes.length === 0}
                        className="mt-4 flex w-full items-center justify-center font-bold uppercase tracking-wide"
                        onClick={handleCheckout}
                      >
                        <HiLockClosed className="mr-2" /> Checkout
                      </Link>
                      {lines?.nodes.length === 0 && (
                        <div className="absolute inset-0 w-full bg-white/60" />
                      )}
                    </div>
                  )}
                </div>
                {(isLoadingCart || isUpdatingCart === 1 || isFetching) && (
                  <LoadingOverlay />
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { merchandise, quantity, id } = item;
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateCart } = useUpdateCart();

  const updateCartQuantity = (quantity: number) => {
    updateCart({
      lines: [
        {
          id,
          quantity,
        },
      ],
    });
  };

  const increment = () => updateCartQuantity(quantity + 1);
  const decrement = () => updateCartQuantity(quantity - 1);
  const handleRemove = () => updateCartQuantity(0);

  const resetQuantity = () => {
    if (inputRef.current) {
      inputRef.current.value = quantity.toString();
    }
  };

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === "") {
      resetQuantity();
      return;
    }

    const value = +e.target.value;

    if (value === quantity) return;

    updateCartQuantity(value);
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        resetQuantity();
        return;
      }

      const value = +e.currentTarget.value;

      if (value === quantity) return;

      updateCartQuantity(value);
    }
  };

  const currentPrice = +merchandise.priceV2.amount;
  const previousPrice = merchandise.compareAtPriceV2
    ? +merchandise.compareAtPriceV2.amount
    : undefined;

  return (
    <div className="flex items-center space-x-6">
      <div className="h-24 w-24">
        <Image
          src={merchandise.image.url}
          width={merchandise.image.width}
          height={merchandise.image.height}
          alt={merchandise.image.altText || ""}
          className="object-contain"
        />
      </div>

      <div className="flex grow flex-col">
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="font-bold">{merchandise.product.title}</p>
            <p className="text-sm">{merchandise.title}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="my-2 text-zinc-500">${currentPrice}</p>
          {previousPrice && (
            <YouSaveText
              className="ml-1"
              text={`${Math.floor(
                ((previousPrice - currentPrice) / previousPrice) * 100,
              )} %`}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex border">
            <button className="p-2" onClick={decrement}>
              <HiMinus />
            </button>
            <input
              ref={inputRef}
              type="number"
              className="w-full max-w-[4ch] appearance-none border-none p-0 px-1 text-center caret-brand-primary selection:bg-brand-primary/20 focus:border-none focus:outline-none focus:ring-0"
              max={1000}
              onBlur={handleOnBlur}
              defaultValue={quantity}
              onKeyDown={handleOnKeyDown}
            />
            <button className="p-2" onClick={increment}>
              <HiPlus />
            </button>
          </div>
          <button
            className="select-none self-end text-xs tracking-wide"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
