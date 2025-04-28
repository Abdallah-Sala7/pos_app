import SelectItem from "@/components/common/SelectItem";
import { cn } from "@/lib/utils";
import { useGetCustomersQuery } from "@/store/server/customersApi";
import { t } from "i18next";
import { useState } from "react";

const SelectCustomer = ({
  setFieldValue,
  value,
  error,
  className,
}: {
  setFieldValue: any;
  value?: any;
  error?: string;
  className?: string;
}) => {
  const [params, setParams] = useState({
    page: "1",
    is_active: "1",
    search_key: "",
  });

  const { data: customers } = useGetCustomersQuery({
    params,
  });

  return (
    <div className="form-group">
      {/* <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-semibold">{t("customer")}</label>

        <AddCustomer isBtn={false} />
      </div> */}

      <div>
        <SelectItem
          items={customers?.result?.customers?.data || []}
          setValue={(val: any) => {
            setFieldValue("customer_id", val.id);
            setFieldValue("customer", val);
          }}
          value={value}
          className={cn("h-14 rounded-xl", className)}
          placeholder={t("select-customer")}
          onSearchChange={(val) =>
            setParams((prev) => ({
              ...prev,
              search_key: val,
            }))
          }
        />
      </div>

      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default SelectCustomer;
