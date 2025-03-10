import { cn } from "@/lib/utils";
import SARIcon from "./SARIcon";

const CurrencyFormate = ({
  amount,
  className,
  iconSize = 16,
}: {
  amount: string | number;
  className?: string;
  iconSize?: number;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span> {amount || 0} </span>
      <SARIcon width={iconSize} height={iconSize} />
    </div>
  );
};

export default CurrencyFormate;
