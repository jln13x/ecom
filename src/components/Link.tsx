import clsx from "clsx";
import NextLink from "next/link";
import { ComponentProps } from "react";

interface LinkProps {
  variant?: "solid" | "outline";
  href: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export const Link: React.FC<LinkProps & ComponentProps<"a">> = ({
  className,
  children,
  variant = "solid",
  href,
  disabled,
  size = "medium",
  ...props
}) => {
  return (
    <NextLink passHref href={href} aria-disabled={disabled}>
      <a
        className={clsx(
          "relative flex items-center rounded-md text-white",
          {
            "bg-brand-primary": variant === "solid",
            "border border-brand-primary text-brand-primary":
              variant === "outline",
            "p-4": size === "medium",
            "p-2": size === "small",
          },
          className,
        )}
        {...props}
      >
        {children}
        {disabled && (
          <div className="w-fullgrid absolute h-full place-items-center bg-white/80">
            <span className="sr-only">Disabled</span>
          </div>
        )}
      </a>
    </NextLink>
  );
};
