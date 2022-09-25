import create from "zustand";

interface Option {
  name: string;
  value: string;
}

interface OptionsStore {
  selectedOptions: Option[];
  setOption: (option: Option) => void;
  getOptionValue: (name: string) => string | undefined;
}

export const useOptions = create<OptionsStore>((set, get) => ({
  selectedOptions: [
    {
      name: "Color",
      value: "Midnight Black",
    },
    {
      name: "Hand",
      value: "Right",
    },
  ],
  setOption: (newOption) =>
    set((state) => {
      const options = state.selectedOptions.map((option) => {
        if (option.name === newOption.name) {
          return newOption;
        }

        return option;
      });

      return {
        ...state,
        selectedOptions: options,
      };
    }),
  getOptionValue: (name) =>
    get().selectedOptions.find((option) => option.name === name)?.value,
}));
