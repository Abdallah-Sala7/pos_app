import { useState } from "react";
import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";
import Image from "./Image";

const InputImage = ({
  defValue,
  className,
  onChange,
  iconClass,
  required = false,
  disabled = false,
}: {
  defValue?: string;
  className?: string;
  onChange?: (img: File) => void;
  iconClass?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  const [img, setImg] = useState<File | null>(null);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (targetFile) {
      setImg(targetFile);
    }

    onChange && onChange(targetFile as File);
  };

  return (
    <label
      htmlFor="image"
      className={cn(
        "relative flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg cursor-pointer overflow-hidden",
        className
      )}
    >
      <input
        type="file"
        onChange={handelChange}
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        name="image"
        required={required}
        disabled={disabled}
      />

      <Image
        src={
          img ? URL.createObjectURL(img) : defValue || "/images/placeholder.jpg"
        }
        alt="image"
        className="w-full h-full rounded-lg"
      />

      <div
        className={`absolute pointer-events-none top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg flex items-center justify-center
        ${img || defValue ? "opacity-0" : "opacity-100"}`}
      >
        <CameraIcon className={cn("w-12 h-12 text-white", iconClass)} />
      </div>
    </label>
  );
};

export default InputImage;
