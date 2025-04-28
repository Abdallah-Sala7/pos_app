import { Input } from "@/components/ui/input";

const NumberInput = ({
  value,
  max = 999999,
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
  const numValue = Number(value || 0);

  return (
    <Input
      type="text"
      className={className}
      value={numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(2)}
      required={required}
      placeholder="0.00"
      disabled={disabled}
      onChange={(e) => {
        const num = Number(e.target.value);

        if (!isNaN(num) && e.target.value.length <= max) {
          onChange && onChange(num % 1 === 0 ? num.toString() : num.toFixed(2));
        }
      }}
      onFocus={(e) => e.target.select()}
      {...props}
    />
  );
};

export default NumberInput;
