import {
  CalendarRangeIcon,
  ClockIcon,
  ReceiptTextIcon,
  ScanQrCodeIcon,
} from "lucide-react";
import { t } from "i18next";
import Image from "@/components/common/Image";
import ProfileNavigation from "./ProfileNavigation";

const POSHeader = () => {
  return (
    <header className="w-full bg-background sticky top-0 z-40 border-b">
      <div
        className={
          "flex items-center justify-between gap-4 py-4 container-fluid"
        }
      >
        <div className="flex-1 flex justify-start">
          <Image
            src="/logo.png"
            alt="website logo"
            className="w-full max-w-[8rem]"
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
        </div>

        <div className="flex-1 flex justify-end gap-2">
          <ProfileNavigation />
        </div>
      </div>
    </header>
  );
};

export default POSHeader;
