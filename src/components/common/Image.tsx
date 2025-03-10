import { cn } from "@/lib/utils";
import { AllHTMLAttributes } from "react";

function Image({
  src = "/images/placeholder.png",
  className,
  ...props
}: AllHTMLAttributes<HTMLImageElement> & {
  src?: string;
}) {
  return (
    <img
      src={src}
      alt="Image"
      onError={(e) => {
        e.currentTarget.src = "/images/placeholder.png";
        e.currentTarget.onerror = null;
      }}
      title="Image"
      loading="lazy"
      className={cn("object-cover", className)}
      {...props}
    />
  );
}

export default Image;
