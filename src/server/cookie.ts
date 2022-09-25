import nookies from "nookies";
import { NextApiRequest } from "next";

export enum COOKIES {
  CART = "shopify_cart_id",
}

export const getCookie = (req: NextApiRequest, cookieName: COOKIES) => {
  const cookies = nookies.get({ req });
  return cookies[cookieName];
};
