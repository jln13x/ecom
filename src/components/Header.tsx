import { Announcement } from "@/features/announcements/Announcement";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { Container } from "./Container";
import { Navbar } from "./Navbar";

const scrollingUpThreshold = 30;

export const Header = () => {
  const [scrollY, setScrollY] = useState(
    typeof window !== "undefined" ? window.pageXOffset : 0
  );

  const previousScrollY = useRef(scrollY);
  const accumulatedScrollUp = useRef(0);
  const [scrollingUp, setScrollingUp] = useState(false);

  // Refactor into reuseable hook
  useEffect(() => {
    const handler = () => {
      setScrollY((scrollY) => {
        const { pageYOffset } = window;
        return scrollY !== pageYOffset ? pageYOffset : scrollY;
      });
    };

    window.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const isScrollingUp = scrollY < previousScrollY.current;
    const previousScroll = previousScrollY.current;
    previousScrollY.current = scrollY;

    if (!isScrollingUp && accumulatedScrollUp.current !== 0) {
      accumulatedScrollUp.current = 0;
    }

    if (isScrollingUp) {
      const scrollAmount = previousScroll - scrollY;
      accumulatedScrollUp.current = accumulatedScrollUp.current + scrollAmount;

      if (accumulatedScrollUp.current > scrollingUpThreshold) {
        setScrollingUp(true);
        return;
      }
    }

    setScrollingUp(false);
  }, [scrollY]);

  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  return (
    <header
      className={clsx("sticky top-0 z-50 w-full transition-all duration-200", {
        "-translate-y-full": !scrollingUp && scrollY > windowHeight,
        "translate-y-0": scrollingUp,
        fixed: scrollY > windowHeight,
      })}
    >
      <Announcement>
        <Container className="text-center">
          <p className="uppercase">
            Limited Offer: Use code <strong className="inline">BOTH</strong> to
            get 30% off your second product
          </p>
        </Container>
      </Announcement>
      <Navbar />
    </header>
  );
};
