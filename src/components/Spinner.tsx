import { AiOutlineLoading } from "react-icons/ai";
import clsx from "clsx";

interface SpinnerProps {
  size?: "lg" | "xl" | "xxl";
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "lg" }) => {
  return (
    <AiOutlineLoading
      className={clsx("animate-spin text-brand-primary", {
        "text-lg": size === "lg",
        "text-2xl": size === "xl",
        "text-4xl": size === "xxl",
      })}
    />
  );
};
