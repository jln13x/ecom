import { YouSave } from "../product/YouSave";

interface PriceProps {
  price: number;
  previousPrice?: number;
  showSavedAmount?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  previousPrice,
  showSavedAmount,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        {previousPrice && (
          <span className="mr-2 text-sm text-zinc-400 line-through">
            ${previousPrice}
          </span>
        )}
        <span className="text-2xl font-bold text-brand-primary">${price}</span>
        {showSavedAmount && previousPrice && (
          <YouSave
            text={`${Math.floor(
              ((previousPrice - price) / previousPrice) * 100,
            )}%`}
            className="ml-2"
          />
        )}
      </div>
      <p className="text-[10px] text-zinc-400">Excluding VAT</p>
    </div>
  );
};
