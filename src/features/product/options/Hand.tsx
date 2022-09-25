import { HiHand, HiOutlineHand } from "react-icons/hi";
import { OptionLabel } from "./OptionLabel";
import { useOptions } from "./use-options";
import clsx from "clsx";

type HandValue = "Left" | "Right";

export const Hand = () => {
  const { selectedOptions, setOption } = useOptions();

  const hand = selectedOptions.find((option) => option.name === "Hand");

  if (!hand) return null;

  const LeftHand = hand.value === "Left" ? HiHand : HiOutlineHand;
  const RightHand = hand.value === "Right" ? HiHand : HiOutlineHand;

  const changeSelectedHand = (hand: HandValue) => {
    setOption({
      name: "Hand",
      value: hand,
    });
  };

  return (
    <div>
      <OptionLabel>Hand</OptionLabel>
      <div className="flex space-x-2">
        <div
          className="flex flex-col items-center text-brand-primary "
          onClick={() => changeSelectedHand("Left")}
        >
          <LeftHand className="-scale-x-100 text-3xl" />
          <span
            className={clsx("text-xs text-black", {
              "font-bold": hand.value === "Left",
            })}
          >
            Left
          </span>
        </div>

        <div
          className="flex flex-col items-center text-brand-primary"
          onClick={() => changeSelectedHand("Right")}
        >
          <RightHand className="text-3xl" />
          <span
            className={clsx("text-xs text-black", {
              "font-bold": hand.value === "Right",
            })}
          >
            Right
          </span>
        </div>
      </div>
    </div>
  );
};
