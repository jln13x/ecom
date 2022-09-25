import { ComponentProps } from "react";
import clsx from "clsx";

export const OptionLabel: React.FC<ComponentProps<"label">> = ({
  className,
  ...props
}) => {
  return (
    <label
      className={clsx(
        "mb-2 block text-sm uppercase tracking-wide text-gray-500",
        className,
      )}
      {...props}
    />
  );
};
