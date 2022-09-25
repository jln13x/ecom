import { Cart } from "@/features/cart/Cart";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiSparkles } from "react-icons/hi";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

export const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Product",
    href: "/products/product",
    icon: <HiSparkles className="text-amber-200" />,
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const Navbar = () => {
  return (
    <div
      className={clsx("relative z-50 h-20 border-b-2 border-zinc-200 bg-white")}
    >
      <Container className="flex h-full w-full items-center justify-between">
        <div className="md:hidden">
          <Menu />
        </div>
        <Link href="/" passHref>
          <a className="order">
            <Logo />
          </a>
        </Link>
        <div className="hidden md:ml-6 md:flex md:grow md:justify-center md:space-x-10">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              href={route.href}
              name={route.name}
              icon={route.icon}
            />
          ))}
        </div>
        <Cart />
      </Container>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  name: string;
  icon?: JSX.Element;
}

export const NavLink = ({ href, name, icon }: NavLinkProps) => {
  const { asPath } = useRouter();

  const isActive = asPath.split("#")[0] === href;

  return (
    <div className="flex items-center space-x-2 text-2xl">
      <Link href={href} passHref>
        <a
          className={clsx("lowercase tracking-wider text-stone-600", {
            "font-bold": isActive,
          })}
        >
          {name}
        </a>
      </Link>
      {icon && icon}
    </div>
  );
};
