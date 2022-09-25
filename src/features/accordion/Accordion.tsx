import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi";

interface AccordionProps {
  items: {
    title: string;
    text: string;
  }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="flex flex-col space-y-4">
      {items.map(({ title, text }, idx) => (
        <Disclosure key={`${title}_${idx}`}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-brand-primary/10 px-4 py-2 text-left text-sm font-medium text-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-brand-primary focus-visible:ring-opacity-75">
                <span className="max-w-[90%]">{title}</span>
                <HiChevronDown
                  className={`${clsx(" text-lg text-brand-primary", {
                    "rotate-180 transform": open,
                  })}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-gray-50 px-4 py-2 text-sm text-stone-600">
                {text}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};
