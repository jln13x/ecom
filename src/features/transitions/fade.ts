import { TransitionClasses } from "@headlessui/react";
import { mergeTransitions } from "./merge-transitions";

type Fade = "full" | "1/4" | "3/4";

const fades: Record<Fade, string> = {
  full: "opacity-100",
  "1/4": "opacity-25",
  "3/4": "opacity-75",
};

export const fadeOut = (variant: Fade = "full"): TransitionClasses => ({
  leaveFrom: fades[variant],
  leaveTo: "opacity-0",
});

export const fadeIn = (variant: Fade = "full"): TransitionClasses => ({
  enterFrom: "opacity-0",
  enterTo: fades[variant],
});

export const fadeInOut = (variant: Fade = "full") => {
  return mergeTransitions([fadeIn(variant), fadeOut(variant)]);
};
