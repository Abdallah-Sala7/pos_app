import { DatePicker } from "@/components/common/DatePicker";
import PriceInput from "@/components/common/PriceInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { t } from "i18next";
import moment from "moment";
import SelectCustomer from "../customers/SelectCustomer";
import { POS_PERMISSIONS } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label">{t("date")}</label>

        <DatePicker
          onSelect={(val) => setFieldValue("invoice_date", val)}
          value={values.invoice_date}
          className="w-full"
          minDate={moment().subtract(1, "month").toDate()}
          maxDate={moment().toDate()}
        />

        {errors?.invoice_date && (
          <span className="form-error">{errors?.invoice_date}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          {t("total")}{" "}
          {values.vat_included ? (
            <span className="text-muted-foreground">
              ( {t("net-total")} : {values.total - (values.total * 15) / 100} )
            </span>
          ) : (
            <span className="text-muted-foreground">
              ( {t("gross-total")} : {values.total * 0.15 + values.total} )
            </span>
          )}
        </label>
        <PriceInput
          value={values.total}
          onChange={(val) => {
            setFieldValue("total", Number(val));
          }}
        />
        {errors?.total && <span className="form-error">{errors?.total}</span>}
      </div>

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

          <label className="form-label cursor-pointer" htmlFor="vat-included">
            {t("total-include-vat")}
          </label>
        </div>

        {errors?.vat_included && (
          <span className="form-error">{errors?.vat_included}</span>
        )}
      </div>

      {user?.permissions?.includes(POS_PERMISSIONS.SHOW_CUSTOMERS) && (
        <SelectCustomer
          setFieldValue={setFieldValue}
          value={values.customer_id}
          error={errors?.customer_id}
        />
      )}
      <div className="form-group">
        <label className="form-label">{t("notes")}</label>

        <Textarea
          autoComplete="off"
          placeholder="..."
          value={values.notes}
          name="notes"
          onChange={handleChange}
        />

        {errors?.notes && <span className="form-error">{errors?.notes}</span>}
      </div>
    </div>
  );
};

export default Form;
