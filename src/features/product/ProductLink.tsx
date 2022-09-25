import Link from "next/link";

export const ProductLink = () => {
  return (
    <Link href="/products/product" passHref>
      <a className="font-bold text-brand-primary transition-colors duration-150 hover:text-brand-primary-darker">
        Some product
      </a>
    </Link>
  );
};
