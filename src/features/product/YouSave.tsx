import clsx from "clsx";

interface YouSaveProps {
  text: string;
  className?: string;
}

export const YouSave: React.FC<YouSaveProps> = ({ text, className }) => {
  return (
    <p
      className={clsx(
        "rounded-full bg-rose-600 p-1  px-2 text-center text-xs font-semibold text-white",
        className,
      )}
    >
      You save {text}
    </p>
  );
};

export const YouSaveText: React.FC<YouSaveProps> = ({ text, className }) => {
  return (
    <p className={clsx("text-[10px] font-medium  text-rose-600", className)}>
      You save {text}
    </p>
  );
};
