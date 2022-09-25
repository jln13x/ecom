import { Context, useContext } from "react";

export const useDefinedContext = <T>(context: Context<T | undefined>): T => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error(`${context.displayName} - Not inside a provider!`);
  }

  return ctx;
};
