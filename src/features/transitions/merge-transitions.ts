import { TransitionClasses } from "@headlessui/react";

export const mergeTransitions = (transitions: TransitionClasses[]) => {
  const classes: TransitionClasses = {};

  const mergeWithClasses = (hook: keyof TransitionClasses, value: string) => {
    const current = classes[hook];

    if (!current) {
      classes[hook] = value;
      return;
    }

    classes[hook] = `${current} ${value}`;
  };

  for (const transition of transitions) {
    transition.enterFrom && mergeWithClasses("enterFrom", transition.enterFrom);
    transition.enterTo && mergeWithClasses("enterTo", transition.enterTo);
    transition.leaveFrom && mergeWithClasses("leaveFrom", transition.leaveFrom);
    transition.leaveTo && mergeWithClasses("leaveTo", transition.leaveTo);
    transition.enter && mergeWithClasses("enter", transition.enter);
    transition.leave && mergeWithClasses("leave", transition.leave);
  }

  return classes;
};
