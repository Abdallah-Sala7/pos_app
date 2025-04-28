import i18n from "@/i18n";
import CurrencyFormate from "../common/CurrencyFormate";

import { t } from "i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const A4Invoice = ({ invoiceRef, order }: { invoiceRef?: any; order: any }) => {
  return (
    <div
      className={
        "w-[21cm] h-auto mx-auto space-y-4 print:relative z-50 print:bottom-auto print:my-4"
      }
      ref={invoiceRef}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="p-4 space-y-4">
        <div className="flex justify-between gap-4">
          <div className="space-y-3">
            <p className="font-semibold text-lg">
              {order?.store?.commercial_name || order?.store?.name_ar}
            </p>

            <div className="space-y-1.5">
              <p className="text-sm">
                {t("commercial-name")} : {order?.store?.vendor?.vat_name}
              </p>
              <p className="text-sm">
                {t("mobile")} : {order?.store?.vendor?.mobile}
              </p>
              <p className="text-sm">
                {t("email")} : {order?.store?.vendor?.email}
              </p>
              <p className="text-sm">
                {t("vat-num")} : {order?.store?.vendor?.vat_num}
              </p>
            </div>
          </div>

          <div
            className="w-52 h-52 [&>svg]:w-48 [&>svg]:h-48 [&>svg]:shrink-0"
            dangerouslySetInnerHTML={{ __html: order?.qr }}
          ></div>
        </div>

        <Table className="w-full border border-black">
          <TableBody>
            <TableRow className="border-black">
              <TableCell
                colSpan={10}
                className="font-semibold text-center p-3 text-sm border-x border-black"
              >
                {t("simple-vat-invoice")}
              </TableCell>
            </TableRow>

            <TableRow className="border-black">
              <TableCell className="font-semibold p-3 text-sm border-x border-black">
                {t("invoice-no")}
              </TableCell>

              <TableCell className="font-semibold p-3 text-sm border-x border-black">
                {t("invoice-date")}
              </TableCell>

              <TableCell className="font-semibold p-3 text-sm border-x border-black">
                {t("customer-name")}
              </TableCell>

              <TableCell className="font-semibold p-3 text-sm border-x border-black">
                {t("customer-mobile")}
              </TableCell>

              <TableCell className="font-semibold p-3 text-sm border-x border-black">
                {t("customer-vat-num")}
              </TableCell>
            </TableRow>

            <TableRow className="border-black">
              <TableCell className="p-3 text-sm border-x border-black">
                {order?.invoice_no}
              </TableCell>

              <TableCell className="p-3 text-sm border-x border-black">
                {order?.invoice_date}
              </TableCell>

              <TableCell className="p-3 text-sm border-x border-black">
                {order?.customer_name || "-"}
              </TableCell>

              <TableCell className="p-3 text-sm border-x border-black">
                {order?.customer_mobile || "-"}
              </TableCell>

              <TableCell className="p-3 text-sm border-x border-black">
                {order?.customer_vat_num || "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="w-full border border-black">
          <TableHeader>
            <TableRow className="border-black">
              <TableHead className="p-3 text-sm bg-white border-x border-black">
                #
              </TableHead>
              <TableHead className="p-3 text-sm bg-white border-x border-black">
                {t("name")}
              </TableHead>
              <TableHead className="p-3 text-sm bg-white border-x border-black">
                {t("price")}
              </TableHead>
              <TableHead className="p-3 text-sm bg-white border-x border-black">
                {t("quantity")}
              </TableHead>
              <TableHead className="p-3 text-sm bg-white border-x border-black">
                {t("total")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.products?.map((item: any, index: number) => (
              <TableRow key={index} className="border-black">
                <TableCell className="p-3 text-sm border-x border-black">
                  {item?.product_id}
                </TableCell>

                <TableCell className="p-3 text-sm border-x border-black">
                  {item?.[t("_tr_name")] || item?.name_ar}
                </TableCell>

                <TableCell className="p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={item.price} />
                </TableCell>

                <TableCell className="p-3 text-sm border-x border-black">
                  {item.qty || item.weight}
                </TableCell>

                <TableCell className="p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={item.total} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="grid grid-cols-2">
          <Table className="w-full border border-black">
            <TableBody>
              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("sub-total")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={order.sub_total} />
                </TableCell>
              </TableRow>

              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("vat")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={order.vat} />
                </TableCell>
              </TableRow>

              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("discount")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate
                    iconSize={14}
                    amount={order.discount || order.extra_discount}
                  />
                </TableCell>
              </TableRow>

              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("cash-amount")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={order.cash_amount} />
                </TableCell>
              </TableRow>

              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("card-amount")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={order.card_amount} />
                </TableCell>
              </TableRow>

              <TableRow className="border-black">
                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  {t("total")}
                </TableCell>

                <TableCell className="font-semibold p-3 text-sm border-x border-black">
                  <CurrencyFormate iconSize={14} amount={order.total} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="border border-black p-3 border-s-0">
            <p className="text-sm">
              <span className="text-gray-950">{t("notes")}</span> :
              <span>{order?.notes || "-"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 mt-auto">
        <p className="text-xs text-center">Powered by Souq POS</p>
      </div>
    </div>
  );
};

export default A4Invoice;
