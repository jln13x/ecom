import { ComponentProps } from "react";
import clsx from "clsx";

export const Container: React.FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(`mx-auto max-w-7xl px-4`, className)} {...props}>
      {children}
    </div>
  );
};
