import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const getHeaderHeight = () => {
  const header = document.querySelector("header");
  return header?.clientHeight;
};

export const useHeaderHeight = () => {
  const [height, setHeight] = useState<number>();
  const windowSize = useWindowSize();

  useEffect(() => {
    const headerHeight = getHeaderHeight();

    if (headerHeight) {
      setHeight(headerHeight);
    }
  }, []);

  useEffect(() => {
    const headerHeight = getHeaderHeight();

    if (headerHeight) {
      setHeight(headerHeight);
    }
  }, [windowSize]);

  return height;
};
