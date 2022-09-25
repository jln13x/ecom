import clsx from "clsx";
import { Spinner } from "./Spinner";

interface LoadingOverlayProps {
  className?: string;
}

export const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-items-center bg-white/60",
        className,
      )}
    >
      <Spinner size="xxl" />
    </div>
  );
};
