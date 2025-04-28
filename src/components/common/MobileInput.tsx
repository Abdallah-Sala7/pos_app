import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.sa";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function MobileInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const { i18n } = useTranslation();

  return (
    <Cleave
      options={{
        phone: true,
        phoneRegionCode: "sa",
      }}
      placeholder="05 000 0000"
      dir="ltr"
      {...props}
      className={cn(
        "flex h-11 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        i18n.language === "ar" ? "placeholder:text-right" : "text-start",
        props.className
      )}
    />
  );
}
