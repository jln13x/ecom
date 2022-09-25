import clsx from "clsx";
import { ComponentProps } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps {
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const Button: React.FC<ButtonProps & ComponentProps<"button">> = ({
  className,
  children,
  variant = "solid",
  isLoading,
  isDisabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "relative rounded-md p-4 text-white outline-transparent transition-all  focus:outline-brand-primary-lighter disabled:cursor-not-allowed disabled:opacity-40",
        {
          "bg-brand-primary enabled:hover:bg-brand-primary/90":
            variant === "solid",
          "border border-brand-primary text-brand-primary enabled:hover:bg-gray-100":
            variant === "outline",
        },
        className,
      )}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 grid h-full w-full place-items-center rounded-md bg-white/80">
          <Spinner />
          <span className="sr-only">Loading</span>
        </div>
      )}
    </button>
  );
};
