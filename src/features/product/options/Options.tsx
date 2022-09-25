import { ProductOptions } from "..";
import { Colors } from "./Colors";
import { Hand } from "./Hand";

interface OptionsProps {
  options: ProductOptions;
}

export const Options: React.FC<OptionsProps> = ({ options }) => {
  return (
    <div className="flex space-x-8">
      {options.map((option) => {
        if (option.name === "Color") {
          return (
            <Colors
              key={option.name}
              mapping={colorMapping}
              colorNames={option.values}
            />
          );
        }

        if (option.name === "Hand") {
          return <Hand key={option.name} />;
        }

        return null;
      })}
    </div>
  );
};

const colorMapping = {
  "Midnight Black": "#000",
  "Platinum Gray": "#ccc",
};
