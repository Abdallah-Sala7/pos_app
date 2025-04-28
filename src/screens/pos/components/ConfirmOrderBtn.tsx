import CurrencyFormate from "@/components/common/CurrencyFormate";
import PriceInput from "@/components/common/PriceInput";
import POSKeyboard from "@/components/common/POSKeyboard";
import SARIcon from "@/components/common/SARIcon";

import { t } from "i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PercentIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS, POS_PERMISSIONS } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import NumberInput from "@/components/common/NumberInput";

const ConfirmOrderBtn = ({
  values,
  setFieldValue,
  handleSubmit,
  isSubmitting,
  confirmIsOpen,
  setConfirmIsOpen,
}: {
  values: any;
  setFieldValue: any;
  handleSubmit: any;
  isSubmitting: any;
  confirmIsOpen: boolean;
  setConfirmIsOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [focusedInput, setFocusedInput] = useState<
    | "cash_amount"
    | "extra_discount_percentage"
    | "extra_discount_value"
    | "transfer_num"
    | "table_no"
  >("cash_amount");

  const handleKeyPress = (button: string) => {
    if (!focusedInput) return;

    let currentValue = values[focusedInput];

    if (button === "{bksp}") {
      currentValue = String(currentValue)?.slice(0, -1);
    } else if (button === "." && String(currentValue)?.includes(".")) {
      return;
    } else if (!currentValue) {
      currentValue = button;
    } else {
      currentValue += button;
    }

    if (focusedInput === "cash_amount") {
      setFieldValue("cash_amount", currentValue);
    } else {
      discountValueHandler(currentValue);
    }
  };

  const discountValueHandler = (val: string) => {
    if (values?.extra_discount_type === "percentage") {
      if (Number(val || 0) > 100) {
        setFieldValue("extra_discount_percentage", 100);
      } else {
        setFieldValue("extra_discount_percentage", Number(val || 0));
      }
    } else {
      if (Number(val || 0) >= values?.total) {
        setFieldValue("extra_discount_value", values?.total);
      } else {
        setFieldValue("extra_discount_value", Number(val || 0));
      }
    }
  };

  useEffect(() => {
    const card_amount =
      values?.cash_amount >= values?.subtotal
        ? 0
        : values?.subtotal - values?.cash_amount;

    const remaining =
      values?.cash_amount <= values?.subtotal
        ? 0
        : values?.cash_amount - values?.subtotal;

    setFieldValue("card_amount", card_amount);
    setFieldValue("remaining", remaining);
  }, [values?.cash_amount, values?.subtotal]);

  useEffect(() => {
    const total = values?.products?.reduce(
      (acc: any, item: any) =>
        acc + (item?.product?.price || item?.price || 0) * item?.qty,
      0
    );

    const subtotal =
      total -
      ((values?.extra_discount_type === "percentage"
        ? (values?.extra_discount_percentage * total) / 100
        : values?.extra_discount_value) || 0);

    setFieldValue("total", total);
    setFieldValue("subtotal", subtotal);
  }, [
    values?.products,
    values?.extra_discount_type,
    values?.extra_discount_value,
    values?.extra_discount_percentage,
  ]);

  return (
    <Dialog open={confirmIsOpen} onOpenChange={setConfirmIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isSubmitting || !values?.products?.length}
          className="w-full h-14 rounded-xl"
          size={"lg"}
          onClick={() => setFieldValue("card_amount", values?.total)}
        >
          <CurrencyFormate
            amount={values?.total}
            className="text-lg font-bold"
            iconSize={20}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("confirm-order")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {user?.permissions?.includes(POS_PERMISSIONS.DINE_IN) && (
            <div className="space-y-2">
              <p className="text-sm font-semibold">{t("order-type")}</p>

              <div className="flex items-center gap-2">
                <Button
                  variant={
                    values?.order_type === "dine_in" ? "default" : "outline"
                  }
                  onClick={() => setFieldValue("order_type", "dine_in")}
                >
                  {t("dine-in")}
                </Button>

                <Button
                  variant={
                    values?.order_type === "dine_out" ? "default" : "outline"
                  }
                  onClick={() => setFieldValue("order_type", "dine_out")}
                >
                  {t("dine-out")}
                </Button>
              </div>
            </div>
          )}

          {values?.order_type === "dine_in" && (
            <div className="form-group col-span-full">
              <label className="text-sm font-semibold">{t("table-num")}</label>

              <NumberInput
                value={values?.table_no}
                onChange={(val) => setFieldValue("table_no", val)}
                onFocus={() => setFocusedInput("table_no")}
                className={cn(
                  "h-14",
                  focusedInput === "table_no" && "border-primary"
                )}
              />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-semibold">{t("payment-method")}</p>

            <div className="flex items-center gap-2">
              {user?.pos_device?.payment_methods?.map((method: any) => (
                <Button
                  key={method}
                  variant={
                    values?.payment_method === method ? "default" : "outline"
                  }
                  onClick={() => {
                    setFieldValue("payment_method", method);

                    if (method === PAYMENT_METHODS.CASH) {
                      setFocusedInput("cash_amount");
                      setFieldValue("cash_amount", values?.total);
                    } else if (method === PAYMENT_METHODS.CARD) {
                      setFieldValue("card_amount", values?.total);
                    } else if (method === PAYMENT_METHODS.CARD_CASH) {
                      setFieldValue("card_amount", values?.total);
                      setFocusedInput("cash_amount");
                    }
                  }}
                >
                  {t(method)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(values?.payment_method === PAYMENT_METHODS.CASH ||
              values?.payment_method === PAYMENT_METHODS.CARD_CASH) && (
              <div className="form-group">
                <label className="text-sm font-semibold">
                  {t("cash-amount")}
                </label>
                <PriceInput
                  value={values?.cash_amount}
                  onChange={(val) => setFieldValue("cash_amount", val)}
                  onFocus={() => setFocusedInput("cash_amount")}
                  className={cn(
                    "h-14",
                    focusedInput === "cash_amount" && "border-primary"
                  )}
                />
              </div>
            )}

            {(values?.payment_method === PAYMENT_METHODS.CARD ||
              values?.payment_method === PAYMENT_METHODS.CARD_CASH) && (
              <div className="form-group">
                <label className="text-sm font-semibold">
                  {t("card-amount")}
                </label>
                <PriceInput
                  value={values?.card_amount}
                  disabled
                  className="!opacity-80 h-14"
                />
              </div>
            )}

            {/* {values?.payment_method === PAYMENT_METHODS.BankTransfer && (
              <div className="form-group col-span-full">
                <label className="text-sm font-semibold">
                  {t("transfer-num")}
                </label>

                <NumberInput
                  value={values?.transfer_num}
                  onChange={(val) => setFieldValue("transfer_num", val)}
                  onFocus={() => setFocusedInput("transfer_num")}
                  className={cn(
                    "h-14",
                    focusedInput === "transfer_num" && "border-primary"
                  )}
                />
              </div>
            )} */}

            {user?.permissions?.includes(POS_PERMISSIONS.DISCOUNT) && (
              <div className="form-group col-span-full">
                <label className="block text-sm font-semibold">
                  {t("extra-discount")}{" "}
                  <span className="text-muted-foreground">
                    (
                    {values?.extra_discount_type === "percentage" ? (
                      <CurrencyFormate
                        amount={values?.total - values?.subtotal}
                        iconSize={14}
                      />
                    ) : ((values?.extra_discount_value / values?.total) * 100) %
                        1 ===
                      0 ? (
                      (values?.extra_discount_value / values?.total) * 100 + "%"
                    ) : (
                      (
                        (values?.extra_discount_value / values?.total) *
                        100
                      ).toFixed(2) + "%"
                    )}
                    )
                  </span>
                </label>

                <div className="relative">
                  <Input
                    type="text"
                    max={"100"}
                    value={
                      values?.extra_discount_type === "percentage"
                        ? values?.extra_discount_percentage
                        : values?.extra_discount_value
                    }
                    onFocus={() =>
                      setFocusedInput(
                        values?.extra_discount_type === "percentage"
                          ? "extra_discount_percentage"
                          : "extra_discount_value"
                      )
                    }
                    onChange={(e) => discountValueHandler(e.target.value)}
                    className={cn(
                      "h-14 z-10 text-start",
                      (focusedInput === "extra_discount_percentage" ||
                        focusedInput === "extra_discount_value") &&
                        "border-primary"
                    )}
                  />

                  <div className="absolute top-1/2 -translate-y-1/2 end-0 flex h-full p-0.5">
                    <button
                      onClick={() => {
                        setFieldValue("extra_discount_type", "percentage");
                        setFieldValue("extra_discount_value", 0);
                        setFieldValue("extra_discount_percentage", 0);
                      }}
                      className={cn(
                        "w-10 h-full flex items-center justify-center text-muted-foreground",
                        values.extra_discount_type === "percentage" &&
                          "bg-muted"
                      )}
                    >
                      <PercentIcon size={20} />
                    </button>

                    <button
                      onClick={() => {
                        setFieldValue("extra_discount_type", "fixed");
                        setFieldValue("extra_discount_value", 0);
                        setFieldValue("extra_discount_percentage", 0);
                      }}
                      className={cn(
                        "w-10 h-full flex items-center justify-center text-muted-foreground rounded-e-full",
                        values.extra_discount_type === "fixed" && "bg-muted"
                      )}
                    >
                      <SARIcon width={18} height={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <p className="text-base font-semibold">{t("total-amount")}</p>

              <p className="text-base font-semibold text-muted-foreground">
                <CurrencyFormate amount={values?.total} iconSize={16} />
              </p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-base font-semibold">
                {t("total-with-discount")}
              </p>

              <p className="text-base font-semibold text-muted-foreground">
                <CurrencyFormate amount={values?.subtotal} iconSize={16} />
              </p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-base font-semibold">{t("remaining")}</p>

              <p className="text-base font-semibold text-muted-foreground">
                <CurrencyFormate amount={values?.remaining} iconSize={16} />
              </p>
            </div>
          </div>

          <div>
            <POSKeyboard onKeyPress={(button) => handleKeyPress(button)} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size={"lg"}
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="w-full h-14 rounded-xl"
            >
              {t("pay")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOrderBtn;
