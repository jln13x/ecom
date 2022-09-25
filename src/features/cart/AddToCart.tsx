import { Button } from "@/components";
import { ProductVariant } from "@/features/product";
import { ClientAnalytics } from "../analytics";
import { CartIcon } from "./CartIcon";
import { useAddToCart } from "./use-add-to-cart";
import { useCartControl } from "./use-cart-control";
import clsx from "clsx";

interface AddToCartProps {
  productVariant?: ProductVariant;
  className?: string;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  productVariant,
  className,
}) => {
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddToCart();
  const { open: openCart } = useCartControl();

  const handleAddToCart = () => {
    if (!productVariant) return;

    ClientAnalytics.publish({
      action: "add_to_cart",
      params: {
        currency: "USD",
        value: productVariant.priceV2.amount,
        items: [
          {
            item_id: productVariant.product.id,
            item_name: productVariant.product.title,
            item_variant: productVariant.id,
            quantity: 1,
          },
        ],
      },
    });

    addToCart(
      {
        lines: [
          {
            merchandiseId: productVariant.id,
            quantity: 1,
          },
        ],
      },
      {
        onSuccess: () => openCart(),
      },
    );
  };

  return (
    <Button
      variant="outline"
      className={clsx(
        "flex items-center justify-center font-bold uppercase tracking-wide",
        className,
      )}
      onClick={handleAddToCart}
      isLoading={isAddingToCart}
      isDisabled={!productVariant}
    >
      <CartIcon className="mr-2" /> Add to Cart
    </Button>
  );
};
