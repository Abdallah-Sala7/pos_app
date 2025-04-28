import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PriceInput from "@/components/common/PriceInput";
import { Input } from "@/components/ui/input";
import { useAddProductsMutation } from "@/store/server/productsApi";
import { serialize } from "object-to-formdata";

const QuickAddProducts = ({
  store_id,
  className,
  setProduct,
  is_unlisted_product,
  isOpen = false,
  initialValue = {},
}: {
  store_id: string;
  className?: string;
  setProduct?: (product: any) => void;
  is_unlisted_product?: boolean;
  isOpen?: boolean;
  initialValue?: any;
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<any>({});
  const [open, setOpen] = useState(false);

  const [addProductAction, { isLoading }] = useAddProductsMutation();

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        product_type: "simple",
        store_ids: [store_id],
        name_ar: undefined,
        price: undefined,
        item_code: undefined,
        is_sellable: 1,
        is_purchasable: 1,
        is_unlisted_product: is_unlisted_product ? 1 : 0,
        ...initialValue,
      },

      onSubmit: async function (values) {
        setErrors({});

        await addProductAction(serialize(values))
          .unwrap()
          .then((res) => {
            toast.success(res.message || t("success-msg"));

            if (res?.result) {
              setProduct?.(res?.result?.product);
            }

            setOpen(false);
            resetForm();
          })
          .catch((error) => {
            toast.error(error?.data?.message);
            setErrors(error?.data?.message);
          });
      },
    });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size={"sm"} className={className}>
          <span>{t("quick-add")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add-product")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">{t("name")}</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="..."
                required
                name="name_ar"
                value={values?.name_ar}
                onChange={handleChange}
              />
              {errors?.name_ar && (
                <span className="form-error">{errors?.name_ar}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">{t("price")}</label>
              <PriceInput
                value={values?.price}
                required
                onChange={(val) => setFieldValue("price", val)}
              />

              {errors?.price && (
                <span className="form-error">{errors?.price}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">{t("item-code")}</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="..."
                name="barcode"
                value={values?.barcode}
                onChange={handleChange}
              />
              {errors?.barcode && (
                <span className="form-error">{errors?.barcode}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isLoading}>
                {t("save")}
              </Button>

              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
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

export default QuickAddProducts;
