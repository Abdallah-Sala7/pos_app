import moment from "moment";
import CurrencyFormate from "./CurrencyFormate";

import { Card } from "../ui/card";
import { useTranslation } from "react-i18next";

const PrintInvoice = ({ order, invoiceRef }: { order: any; invoiceRef: any }) => {
  const { i18n, t } = useTranslation();

  const format = "l hh:mmA";

  return (
    <div
      className="w-[8cm] h-auto mx-auto space-y-4 p-2 fixed print:relative bottom-[calc(200vh)] z-50 print:bottom-auto print:my-4"
      ref={invoiceRef}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="space-y-3 !pb-6 px-3">
        <div className="space-y-2">
          <DisplayTwoRow title={t("order-num")} value={"#" + order?.ref_no} />

          <DisplayTwoRow
            title={t("order-date")}
            value={moment(new Date(order?.created_at)).format(format)}
          />
        </div>

        <hr className="border-px border-dashed border-gray-600" />

        <p className="text-xs text-start font-semibold">{t("products")}</p>

        <hr className="border-px border-dashed border-gray-600" />

        <div className="space-y-2">
          {order.items?.map((product: any, index: number) => (
            <div key={index} className="flex items-center">
              <p className="flex-1 text-xs text-start text-gray-600">
                {product.name} ( {product.qty} )
                <br />
                {product.size || product.color ? (
                  <p className="text-xs text-gray-500">
                    {product.size} - {product.color}
                  </p>
                ) : null}
              </p>

              <p className="flex-1 text-xs text-end font-semibold text-black">
                <CurrencyFormate iconSize={14} amount={product.price} />
              </p>
            </div>
          ))}
        </div>

        <hr className="border-px border-dashed border-gray-600" />

        <div className="space-y-2">
          <DisplayTwoRow
            title={t("sub-total")}
            value={<CurrencyFormate iconSize={14} amount={order?.sub_total} />}
          />

          <DisplayTwoRow
            title={t("vat")}
            value={<CurrencyFormate iconSize={14} amount={order?.vat} />}
          />

          <DisplayTwoRow
            title={t("total")}
            value={<CurrencyFormate iconSize={14} amount={order?.total} />}
          />
        </div>

        <hr className="border-px border-dashed border-gray-600" />

        <div className="space-y-2">
          <DisplayTwoRow
            title={t("payment-option")}
            value={order?.payment_option || "-"}
          />
        </div>
      </Card>

      <div className="pt-2">
        <p className="text-xs text-center">Powered by Souq POS</p>
      </div>
    </div>
  );
};

export default PrintInvoice;

function DisplayTwoRow({
  title,
  value,
}: {
  title: string;
  value: string | any;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      <p className="flex-1 whitespace-nowrap text-xs text-start text-gray-600">
        {title}
      </p>
      <p className="flex-1 whitespace-nowrap text-xs text-end font-semibold text-black">
        {value}
      </p>
    </div>
  );
}
