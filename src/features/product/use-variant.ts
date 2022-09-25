import { useMemo } from "react";
import { useOptions } from "./options";
import { useProduct } from "./ProductContext";
import { ProductVariant } from "./schema";

export const useVariant = (): ProductVariant | undefined => {
  const { selectedOptions, getOptionValue } = useOptions();
  const { product } = useProduct();

  const variant = useMemo(() => {
    const variant = product.variants.nodes.find((variant) => {
      const sameLength =
        variant.selectedOptions.length === selectedOptions.length;

      const sameOptions = variant.selectedOptions.every((option) => {
        const selectedOptionValue = getOptionValue(option.name);
        return selectedOptionValue === option.value;
      });

      return sameLength && sameOptions;
    });

    return variant;
  }, [selectedOptions, product, getOptionValue]);

  return variant;
};
