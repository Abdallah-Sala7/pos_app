import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SARIcon from "./SARIcon";

const PriceInput = ({
  value,
  max = 999999999999999999,
  onChange,
  className = "",
  required,
  disabled,
  ...props
}: {
  value: any;
  max?: number;
  className?: string;
  onChange?: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const numValue =
    String(value)?.split(".")?.[1]?.length > 3
      ? Number(value)?.toFixed(3)
      : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow only digits and at most one decimal point
    if (/^\d*\.?\d{0,3}$/.test(val) && val.length <= max.toString().length) {
      onChange?.(val);
    }
  };

  return (
    <div className="relative">
      <div className="w-14 h-10 absolute top-1/2 -translate-y-1/2 end-0 flex items-center justify-center text-muted-foreground">
        <SARIcon width={16} height={16} />
      </div>

      <Input
        type="text"
        className={cn("pe-14", className)}
        value={numValue}
        required={required}
        placeholder="0.00"
        disabled={disabled}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
        {...props}
      />
    </div>
  );
};

export default PriceInput;
