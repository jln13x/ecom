import { OptionLabel } from "./OptionLabel";
import { useOptions } from "./use-options";
import clsx from "clsx";

type ColorMapping = Record<string, string>;

interface ColorsProps {
  mapping: ColorMapping;
  colorNames: string[];
}

export const Colors: React.FC<ColorsProps> = ({ colorNames, mapping }) => {
  const { selectedOptions, setOption } = useOptions();
  const activeColor = selectedOptions.find((option) => option.name === "Color");

  if (!activeColor) return null;

  const changeSelectedColor = (color: string) => {
    setOption({
      name: "Color",
      value: color,
    });
  };

  return (
    <div>
      <OptionLabel>Color</OptionLabel>
      <div className="flex space-x-2">
        {colorNames.map((colorName) => {
          const color = mapping[colorName];

          if (!color) {
            return null;
          }

          return (
            <div
              key={colorName}
              style={{
                backgroundColor: color,
              }}
              className={clsx("h-8 w-8 rounded-md", {
                "ring-2 ring-brand-primary ring-offset-2":
                  activeColor.value === colorName,
              })}
              onClick={() => changeSelectedColor(colorName)}
              title={colorName}
            />
          );
        })}
      </div>
    </div>
  );
};
