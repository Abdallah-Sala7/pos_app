import { InputHTMLAttributes, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PasswordInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [type, setType] =
    useState<InputHTMLAttributes<HTMLInputElement>["type"]>("password");

  const Button = useMemo(() => {
    return (
      <button
        className="w-12 h-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 appearance-none"
        type="button"
        onClick={() => {
          if (type === "password") {
            setType("text");
          } else {
            setType("password");
          }
        }}
      >
        {type === "password" ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
      </button>
    );
  }, [type]);

  return (
    <div className="relative">
      <Input
        type={type}
        className={[className, "!ps-12"].join(" ")}
        placeholder="••••••••"
        required
        {...props}
      />
      {Button}
    </div>
  );
}
