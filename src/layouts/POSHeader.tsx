import {
  CalendarRangeIcon,
  ClockIcon,
  LogOutIcon,
  ReceiptTextIcon,
  RefreshCcwDotIcon,
  ScanQrCodeIcon,
} from "lucide-react";
import { t } from "i18next";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import useSyncProducts from "@/hooks/useSyncProducts";

const POSHeader = () => {
  const { handleLogged } = useLogout();

  return (
    <header className="w-full bg-background sticky top-0 z-40 border-b">
      <div
        className={
          "flex items-center justify-between gap-4 py-4 container-fluid"
        }
      >
        <div className="flex-1 flex justify-start max-w-60">
          <Image
            src="/logo.png"
            alt="website logo"
            className="w-full h-auto object-contain max-w-32"
            width="128"
            height="63"
          />
        </div>

        <div className="flex-1 flex justify-center gap-4">
          <button className="flex items-center gap-1.5 text-primary">
            <ScanQrCodeIcon size={20} />

            <span>{t("pos")}</span>
          </button>

          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <CalendarRangeIcon size={20} />

            <span>{t("today-orders")}</span>
          </button>

          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <ClockIcon size={20} />

            <span>{t("history")}</span>
          </button>

          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <ReceiptTextIcon size={20} />

            <span>{t("bills")}</span>
          </button>

          <SyncProducts />
        </div>

        <div className="flex-1 flex justify-end gap-2 max-w-60">
          <Button
            size={"icon"}
            type="button"
            variant={"outline"}
            onClick={handleLogged}
            className="cursor-pointer"
          >
            <LogOutIcon width={24} height={24} className="text-destructive" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default POSHeader;

const SyncProducts = () => {
  const { handleSync, productsSyncIsLoading } = useSyncProducts();

  return (
    <button
      onClick={handleSync}
      disabled={productsSyncIsLoading}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RefreshCcwDotIcon size={20} className={productsSyncIsLoading ? "animate-spin" : ""}/>

      <span>{t("sync-products")}</span>
    </button>
  );
};
