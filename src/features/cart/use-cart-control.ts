import { atom, useAtom } from "jotai";

const cartAtom = atom(false);

export const useCartControl = () => {
  const [open, setOpen] = useAtom(cartAtom);

  return {
    close: () => setOpen(false),
    open: () => setOpen(true),
    toggle: () => setOpen((open) => !open),
    isOpen: open,
  };
};
