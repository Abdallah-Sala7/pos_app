import moment from "moment";

import { Card } from "../ui/card";
import { useTranslation } from "react-i18next";
import CurrencyFormate from "../common/CurrencyFormate";

const PrintInvoice = ({
  order,
  invoiceRef,
}: {
  order: any;
  invoiceRef?: any;
}) => {
  const { i18n, t } = useTranslation();
  const format = "l hh:mmA";

  const isVatInvoice = order?.store?.vendor?.vat_num;

  return (
    <div
      className="w-[10cm] h-auto mx-auto space-y-4 p-2"
      ref={invoiceRef}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="space-y-2 !py-6 px-3">
        <div className="flex flex-col items-center justify-center text-center gap-0.5">
          <p className="text-sm font-semibold">
            {isVatInvoice ? t("simple-vat-invoice") : t("order-details")}
          </p>

          <p className="text-sm font-semibold">
            {t("order-num")}: {"#" + order?.invoice_no}
          </p>

          <p className="text-sm font-semibold">
            {order?.store?.[t("_tr_name")] || order?.store?.name}
          </p>

          <p className="text-sm font-semibold">
            {order?.store?.vendor?.mobile}
          </p>
        </div>

        <div className="space-y-1.5">
          <DisplayTwoRow
            title={t("order-date")}
            value={moment(new Date(order?.updated_at)).format(format)}
          />

          {isVatInvoice && (
            <DisplayTwoRow
              title={t("vat-num")}
              value={order?.store?.vendor?.vat_num}
            />
          )}
        </div>

        <hr className="border-px border-dashed border-gray-800" />

        <p className="text-xs text-start font-semibold">{t("customer")}</p>

        <div className="space-y-1.5">
          <DisplayTwoRow title={t("name")} value={order?.customer_name} />
          <DisplayTwoRow title={t("mobile")} value={order?.customer_mobile} />
        </div>

        <div className="flex border-y border-dashed border-gray-800 py-2">
          <p className="flex-1 text-xs text-start font-semibold">
            {t("products")}
          </p>
          <p className="flex-1 max-w-12 text-xs text-center font-semibold">
            {t("qty")}
          </p>
          <p className="flex-1 max-w-12 text-xs text-center font-semibold">
            {t("price")}
          </p>
        </div>

        <div className="space-y-1.5">
          {order.products?.map((product: any, index: number) => (
            <div key={index} className="flex items-center">
              <p className="flex-1 text-xs text-start text-gray-950">
                {product?.[t("_tr_name")] || product?.name}
              </p>

              <p className="flex-1 max-w-12 text-xs text-center font-semibold text-black">
                {product.qty}
              </p>
              <p className="flex-1 max-w-12 text-xs text-center font-semibold text-black">
                <CurrencyFormate iconSize={14} amount={product.price} />
              </p>
            </div>
          ))}
        </div>

        <hr className="border-px border-dashed border-gray-800" />

        <div className="space-y-1.5">
          {!!(order.discount || order.extra_discount) && (
            <DisplayTwoRow
              title={t("discount")}
              value={
                <CurrencyFormate
                  iconSize={14}
                  amount={order.discount || order.extra_discount}
                />
              }
            />
          )}

          <DisplayTwoRow
            title={t("total")}
            value={<CurrencyFormate iconSize={14} amount={order?.total} />}
          />

          {isVatInvoice && (
            <DisplayTwoRow
              title={t("include-vat-15")}
              value={
                <CurrencyFormate iconSize={15} amount={order?.total * 0.15} />
              }
            />
          )}

          <DisplayTwoRow
            title={t("payment-method")}
            value={order?.payment_method || "-"}
          />
        </div>

        {order?.qr && (
          <div
            className="pt-6 flex justify-center items-center [&>svg]:w-48 [&>svg]:h-48 [&>svg]:shrink-0"
            dangerouslySetInnerHTML={{ __html: order?.qr }}
          ></div>
        )}
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
      <p className="flex-1 whitespace-nowrap text-xs text-start text-gray-950">
        {title}
      </p>
      <p className="flex-1 flex justify-end whitespace-nowrap text-xs text-end font-semibold text-black">
        {value}
      </p>
    </div>
  );
}
