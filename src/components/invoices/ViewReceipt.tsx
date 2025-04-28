import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { PrinterIcon, ReceiptTextIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { POS_PERMISSIONS } from "@/constant";
import A4Invoice from "./A4Invoice";
import PrintInvoice from "./PrintInvoice";
import { t } from "i18next";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const ViewReceipt = ({
  invoice,
  isOpen,
  setIsOpen,
  hideTrigger,
}: {
  invoice: any;
  isOpen?: boolean;
  hideTrigger?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const invoiceRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: invoiceRef });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"outlinePrimary"}>
            <ReceiptTextIcon />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className={cn(
          user?.permissions?.includes(POS_PERMISSIONS.A4_INVOICE)
            ? "md:min-w-[22cm]"
            : "md:min-w-[10cm]"
        )}
      >
        <DialogHeader>
          <DialogTitle>{t("invoice")}</DialogTitle>
        </DialogHeader>

        {user?.permissions?.includes(POS_PERMISSIONS.A4_INVOICE) ? (
          <A4Invoice order={invoice} invoiceRef={invoiceRef} />
        ) : (
          <PrintInvoice order={invoice} invoiceRef={invoiceRef} />
        )}

        <div className="pt-4 flex items-center gap-4">
          <Button size={"lg"} onClick={() => reactToPrintFn()}>
            <span>{t("print")}</span>
            <PrinterIcon />
          </Button>

          <DialogClose asChild>
            <Button size={"lg"} variant={"outline"}>
              {t("close")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReceipt;
