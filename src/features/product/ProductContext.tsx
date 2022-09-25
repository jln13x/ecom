import { useDefinedContext } from "@/features/common/hooks";
import { createContext, PropsWithChildren } from "react";
import { Product } from "./schema";

interface ProductContext {
  product: Product;
}

export const ProductContext = createContext<ProductContext | undefined>(
  undefined,
);

export const ProductContextProvider: React.FC<
  PropsWithChildren<ProductContext>
> = ({ product, children }) => {
  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useDefinedContext(ProductContext);
};
