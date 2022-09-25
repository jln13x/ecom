import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useSwipeable } from "react-swipeable";
import { Container } from "./Container";

import { slideInOut } from "@/features/transitions";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { CloseIcon } from "./icons";
import { NavLink, routes } from "./Navbar";
import { useHeaderHeight } from "@/features/common/use-header-height";
import Link from "next/link";

export const Menu = () => {
  const headerHeight = useHeaderHeight();
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handlers = useSwipeable({
    onSwiped: () => toggleMenu(),
  });

  const toggleMenu = () => setIsOpen((open) => !open);

  const Icon = isOpen ? CloseIcon : MenuIcon;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="rounded-full p-1 focus:outline-offset-4 focus:outline-white"
        title="Open navigation menu"
        aria-label="Open navigation menu"
      >
        <Icon className="text-2xl text-zinc-500" />
      </button>
      <Transition
        show={isOpen}
        enter="transition-all duration-300 ease-out"
        leave="transition-all duration-300 ease-out"
        className="fixed inset-0 top-0 bottom-0 z-40 mt-28 h-[calc(100vh-7rem)] bg-white "
        {...slideInOut("left")}
        {...handlers}
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          marginTop: headerHeight,
        }}
      >
        <Container className="flex h-full flex-col justify-between pb-32 pt-12">
          <div className="flex flex-col space-y-8">
            {routes.map((route) => (
              <NavLink
                key={route.href}
                href={route.href}
                name={route.name}
                icon={route?.icon}
              />
            ))}
          </div>
          <div>
            <p className="text-sm text-zinc-500">Follow us on Social Media</p>
            <div className="mt-2 flex space-x-2">
              <Link
                href="https://www.tiktok.com/@tiktok_page"
                target="_blank"
                passHref
              >
                <a className="rounded-full bg-brand-primary p-2 text-lg text-white">
                  <FaTiktok />
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </Transition>
    </>
  );
};

const MenuIcon = HiMenu;
