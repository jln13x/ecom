export const CART_STORAGE_KEY = "product_shopify_cart_id";

export const getCartId = () => {
  return localStorage.getItem(CART_STORAGE_KEY);
};

export const setCartId = (cartId: string) => {
  localStorage.setItem(CART_STORAGE_KEY, cartId);
};

export const removeCartId = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};
