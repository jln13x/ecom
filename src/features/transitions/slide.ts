import { TransitionClasses } from "@headlessui/react";
import { mergeTransitions } from "./merge-transitions";
import clsx from "clsx";

type Direction = "left" | "right" | "top" | "bottom";

export const slideIn = (from: Direction): TransitionClasses => {
  return {
    enterFrom: clsx({
      "-translate-y-full": from === "top",
      "-translate-x-full": from === "left",
      "translate-x-full": from === "right",
    }),
    enterTo: clsx({
      "translate-x-0": from === "left" || from === "right",
      "translate-y-0": from === "top" || from === "bottom",
    }),
  };
};

export const slideOut = (from: Direction): TransitionClasses => {
  return {
    leaveFrom: clsx({
      "translate-x-0": from === "left" || from === "right",
      "translate-y-0": from === "top" || from === "bottom",
    }),
    leaveTo: clsx({
      "-translate-y-full": from === "top",
      "-translate-x-full": from === "left",
      "translate-x-full": from === "right",
    }),
  };
};

export const slideInOut = (from: Direction) => {
  return mergeTransitions([slideIn(from), slideOut(from)]);
};
