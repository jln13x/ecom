import { PaymentMethods } from "@/features/payment-methods";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="rounded-t-xl bg-stone-900 pt-4">
      <Container>
        <Logo className="mx-auto h-3.5" />

        <div className="mt-4">
          <strong className="font-bold uppercase tracking-wider text-white">
            Shop
          </strong>
          <ul className="text-sm text-neutral-400">
            <li className="flex items-center space-x-1">
              <NavLink href="/products/product" text="product" />
              <HiSparkles className="text-amber-200" />
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <strong className="font-bold uppercase tracking-wider text-white">
            Support
          </strong>
          <ul className="text-sm text-neutral-400">
            <li>
              <NavLink text="Contact" href="/contact" />
            </li>
            <li>
              <NavLink
                text="Shipping & Delivery"
                href="/legal/shipping-policy"
              />
            </li>
            <li>
              <NavLink text="Terms of Service" href="/legal/terms-of-service" />
            </li>
            <li>
              <NavLink text="Refund policy" href="/legal/refund-policy" />
            </li>
            <li>
              <NavLink text="Privacy policy" href="/legal/privacy-policy" />
            </li>
            <li>
              <NavLink text="Legal notice" href="/legal/legal-notice" />
            </li>
          </ul>
        </div>
      </Container>

      <hr className="mt-8" />
      <Container className="py-4">
        <PaymentMethods
          methods={[
            "visa",
            "mastercard",
            "amex",
            "maestro",
            "shop-pay",
            "apple-pay",
            "google-pay",
            "paypal",
          ]}
        />
      </Container>
    </footer>
  );
};

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  const { asPath } = useRouter();
  const isActive = asPath.split("#")[0] === href;

  if (isActive) {
    return <p className="font-bold">{text}</p>;
  }

  return (
    <Link href={href} passHref>
      <a className="transition-all duration-150 hover:cursor-pointer hover:text-white">
        {text}
      </a>
    </Link>
  );
};
