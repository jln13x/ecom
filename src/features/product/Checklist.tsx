import { HiCheckCircle } from "react-icons/hi";

interface ChecklistProps {
  items: string[];
  className?: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, className }) => {
  return (
    <ul className={className}>
      {items.map((item, idx) => (
        <li className="flex items-center" key={idx}>
          <HiCheckCircle className="text-brand-primary-lighter" />
          <p className="ml-2">{item}</p>
        </li>
      ))}
    </ul>
  );
};
