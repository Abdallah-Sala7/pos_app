import { useState } from "react";
import { Switch } from "../ui/switch";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useInstancePostMutation } from "@/store/server/mainApi";

const ChangeStatus = ({ status = 0, url }: { status: number; url: string }) => {
  const { t } = useTranslation();
  const [isActivated, setIsActivated] = useState(Boolean(status));
  const [mutate, { isLoading }] = useInstancePostMutation();

  const handleChanges = async () => {
    setIsActivated(!isActivated);

    await mutate({
      url,
    });
  };

  return (
    <div className="flex items-center gap-2 w-28">
      <Switch
        checked={isActivated}
        onCheckedChange={handleChanges}
        disabled={isLoading}
        className="data-[state=unchecked]:bg-destructive"
      />

      <span
        className={cn(
          "text-sm font-semibold",
          isActivated ? "text-primary" : "text-destructive"
        )}
      >
        {isActivated ? t("active") : t("inactive")}
      </span>
    </div>
  );
};

export default ChangeStatus;
