import CurrencyFormate from "@/components/common/CurrencyFormate";
import A4Invoice from "@/components/invoices/A4Invoice";
import PrintInvoice from "@/components/invoices/PrintInvoice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { POS_PERMISSIONS } from "@/constant";
import { RootState } from "@/store";
import { t } from "i18next";
import { PrinterIcon } from "lucide-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const SuccessBooking = ({
  isOpen,
  setIsOpen,
  invoice,
  resetForm,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  invoice: any;
  resetForm: () => void;
}) => {
  const invoiceRef = useRef(null);
  const { user } = useSelector((state: RootState) => state.user);
  const reactToPrintFn = useReactToPrint({ contentRef: invoiceRef });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("success-order")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">{t("total")}</p>
              <p className="font-semibold text-end">
                <CurrencyFormate
                  amount={invoice?.total}
                  className="text-lg font-bold"
                  iconSize={20}
                />
              </p>

              {invoice?.credit_payment ? (
                <>
                  <p className="text-muted-foreground">{t("payment-type")}</p>
                  <p className="font-semibold text-end">{t("credit")}</p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground">{t("cash-amount")}</p>
                  <p className="font-semibold text-end">
                    <CurrencyFormate
                      amount={invoice?.cash_amount}
                      className="text-lg font-bold"
                      iconSize={20}
                    />
                  </p>

                  <p className="text-muted-foreground">{t("card-amount")}</p>
                  <p className="font-semibold text-end">
                    <CurrencyFormate
                      amount={invoice?.card_amount}
                      className="text-lg font-bold"
                      iconSize={20}
                    />
                  </p>

                  <p className="text-muted-foreground">{t("remaining")}</p>
                  <p className="font-semibold text-end">
                    <CurrencyFormate
                      amount={invoice?.remaining}
                      className="text-lg font-bold"
                      iconSize={20}
                    />
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            type="button"
            size={"lg"}
            className="w-full h-14 rounded-xl text-base [&_svg]:size-6"
            onClick={() => {
              reactToPrintFn();
              setTimeout(() => {
                setIsOpen(false);
                resetForm();
              }, 500);
            }}
          >
            {t("print")} <PrinterIcon />
          </Button>

          <div style={{ display: "none" }}>
            {user?.permissions?.includes(POS_PERMISSIONS.A4_INVOICE) ? (
              <A4Invoice order={invoice} invoiceRef={invoiceRef} />
            ) : (
              <PrintInvoice invoiceRef={invoiceRef} order={invoice} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessBooking;
