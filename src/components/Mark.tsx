import clsx from "clsx";

interface MarkProps {
  children: string;
  className?: string;
}

export const Mark: React.FC<MarkProps> = ({ children, className }) => {
  return (
    <mark
      className={clsx(
        "relative -z-10 -my-1.5 -mx-2 inline bg-transparent bg-[url('/mark.svg')] py-1.5 px-2 font-bold text-white before:bg-center",
        className,
      )}
    >
      {children}
    </mark>
  );
};
