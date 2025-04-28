import CurrencyFormate from "@/components/common/CurrencyFormate";

import { t } from "i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRefundInvoiceMutation } from "@/store/server/invoicesApi";
import { useFormik } from "formik";
import { Redo2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RefundProduct = ({
  products,
  invoice_id,
}: {
  products: any;
  invoice_id: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [refundInvoice, { isLoading }] = useRefundInvoiceMutation();

  const { setFieldValue, values, handleSubmit, resetForm } = useFormik({
    initialValues: {
      invoice_id,
      products: [],
    },
    onSubmit: async () => {
      await refundInvoice(values)
        .unwrap()
        .then((res) => {
          resetForm();
          setOpen(false);
          toast.success(res.message || t("success-msg"));
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Redo2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("refund-products")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="divide-y">
              {products?.map((product: any) => (
                <div className="flex items-center gap-6 py-4" key={product?.id}>
                  <Checkbox
                    id={product?.id}
                    className="w-6 h-6 shrink-0"
                    disabled={!!product?.full_refund}
                    defaultChecked={
                      !!product?.full_refund ||
                      values?.products?.some(
                        (item: any) => item?.id === product?.id
                      )
                    }
                    onCheckedChange={(e) => {
                      if (e) {
                        setFieldValue("products", [
                          ...values?.products,
                          product,
                        ]);
                      } else {
                        const filtered = values?.products?.filter(
                          (item: any) => item?.id !== product?.id
                        );

                        setFieldValue("products", filtered);
                      }
                    }}
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-semibold">
                        {product?.[t("_tr_name")] || product?.name_en}
                      </h2>

                      {!!product?.full_refund && (
                        <p className="px-4 py-1.5 text-sm rounded-full bg-destructive text-destructive-foreground">
                          {t("refunded")}
                        </p>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="grid grid-cols-2">
                        <h2 className="text-muted-foreground">
                          {t("item-price")}
                        </h2>

                        <p className="font-semibold text-end">
                          <CurrencyFormate
                            className="justify-end"
                            amount={product?.price}
                          />
                        </p>
                      </div>

                      {product?.unit_type === "weight" ? (
                        <div className="grid grid-cols-2">
                          <h2 className="text-muted-foreground">
                            {t("weight")}
                          </h2>

                          <p className="font-semibold text-end">
                            {product?.weight} KG
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2">
                          <h2 className="text-muted-foreground">
                            {t("quantity")}
                          </h2>

                          <p className="font-semibold text-end">
                            {product?.qty}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-2">
                        <h2 className="text-muted-foreground">
                          {t("total-price")}
                        </h2>

                        <p className="font-semibold text-end">
                          <CurrencyFormate
                            className="justify-end"
                            amount={product?.total}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isLoading}>
                {t("refund")}
              </Button>

              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  {t("cancel")}
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RefundProduct;
