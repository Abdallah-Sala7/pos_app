import CurrencyFormate from "@/components/common/CurrencyFormate";
import { DatePicker } from "@/components/common/DatePicker";
import Image from "@/components/common/Image";
import PriceInput from "@/components/common/PriceInput";
import SelectItem from "@/components/common/SelectItem";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetUsersQuery } from "@/store/server/usersApi";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Form = ({
  setFieldValue,
  handleChange,
  values,
  errors,
}: {
  handleChange: any;
  setFieldValue: any;
  values: any;
  errors: any;
}) => {
  const { t } = useTranslation();
  const { data: suppliers } = useGetUsersQuery({
    params: {
      is_active: 1,
      user_type: "supplier",
    },
  });

  return (
    <div className="space-y-6">
      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">{t("product-details")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="space-y-2">
            <div className="form-group">
              <label className="form-label">{t("total")}</label>
              <PriceInput
                value={values.total}
                onChange={(val) => {
                  setFieldValue("total", val);
                }}
                required
                disabled={!!values?.products?.length}
              />
              {errors?.total && (
                <span className="form-error">{errors?.total}</span>
              )}
            </div>

            {!values?.products?.length && (
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="w-5 h-5"
                    checked={!!values.vat_included}
                    onCheckedChange={(val) => {
                      setFieldValue("vat_included", val ? 1 : 0);
                    }}
                    id="vat-included"
                  />

                  <label
                    className="form-label cursor-pointer"
                    htmlFor="vat-included"
                  >
                    {t("total-include-vat")}
                  </label>
                </div>

                {errors?.vat_included && (
                  <span className="form-error">{errors?.vat_included}</span>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">{t("date")}</label>

            <DatePicker
              onSelect={(val) => setFieldValue("order_date", val)}
              value={values.order_date}
              className="w-full"
              minDate={moment().subtract(1, "month").toDate()}
              maxDate={moment().toDate()}
            />

            {errors?.order_date && (
              <span className="form-error">{errors?.order_date}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">{t("supplier")}</label>

            <SelectItem
              items={suppliers?.result?.users || []}
              setValue={(val: any) => {
                setFieldValue("supplier_id", val.id);
                setFieldValue("supplier", val);
              }}
              value={values.supplier}
            />

            {errors?.supplier_id && (
              <span className="form-error">{errors?.supplier_id}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("ref-no")}</label>

            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.ref_no}
              name="ref_no"
              required
              onChange={handleChange}
            />

            {errors?.ref_no && (
              <span className="form-error">{errors?.ref_no}</span>
            )}
          </div>

          <div className="form-group col-span-full">
            <label className="form-label">{t("notes")}</label>

            <Textarea
              autoComplete="off"
              placeholder="..."
              value={values.notes}
              name="notes"
              onChange={handleChange}
            />

            {errors?.notes && (
              <span className="form-error">{errors?.notes}</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">
            {t("products")} ({values?.products?.length || 0})
          </h3>
        </div>

        <div className="divide-y">
          {values?.products?.map((product: any) => (
            <div className="p-4 flex gap-4" key={product?.id}>
              <Image
                src={product?.image}
                alt={product?.name_en}
                title={product?.name_en}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1 space-y-3">
                <h2 className="font-semibold">
                  {product?.[t("_tr_name")] || product?.name_en}
                </h2>

                <div className="space-y-1">
                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("item-price")}</h2>

                    <p className="font-semibold text-end text-sm">
                      <CurrencyFormate
                        className="justify-end"
                        amount={product?.price}
                      />
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {product?.unit_type === "weight"
                        ? t("weight")
                        : t("quantity")}
                    </h2>

                    <p className="font-semibold text-end text-sm">
                      {product?.qty || product?.weight}
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("total-price")}
                    </h2>

                    <p className="font-semibold text-end text-sm">
                      <CurrencyFormate
                        className="justify-end"
                        amount={product?.price * product?.qty}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Form;
