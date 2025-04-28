import PriceInput from "@/components/common/PriceInput";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const AddCustomProduct = ({
  values,
  setFieldValue,
  className,
}: {
  values: any;
  setFieldValue: any;
  className?: string;
}) => {
  const [product, setProduct] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size={"sm"} className={className}>
          <span>{t("add-product")}</span>

          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add-custom-product")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">{t("price")}</label>
            <PriceInput
              value={product?.price}
              onChange={(price) => setProduct({ ...product, price })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t("name")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={product?.name}
              onChange={(e: any) =>
                setProduct({ ...product, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t("item-code")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={product?.item_code}
              onChange={(e: any) =>
                setProduct({ ...product, item_code: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => {
                setFieldValue("products", [
                  ...values?.products,
                  {
                    ...product,
                    qty: 1,
                    is_custom: 1,
                  },
                ]);
                setOpen(false);
                setProduct(null);
              }}
            >
              {t("save")}
            </Button>

            <DialogClose asChild>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setOpen(false);
                  setProduct(null);
                }}
              >
                {t("cancel")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomProduct;
