import clsx from "clsx";

interface AnnouncementProps {
  children: React.ReactNode;
  className?: string;
}

export const Announcement = ({ children, className }: AnnouncementProps) => {
  return (
    <div
      className={clsx(
        "grid h-14 w-full place-items-center overflow-y-auto bg-brand-primary-darker text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};
