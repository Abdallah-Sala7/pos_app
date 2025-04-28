import CurrencyFormate from "@/components/common/CurrencyFormate";
import EmptyTable from "@/components/common/EmptyTable";
import SARIcon from "@/components/common/SARIcon";
import moment from "moment";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { MiniDashboardSingleCard } from "@/components/common/MiniDashboardSingleCard";
import { useGetInvoicesProductsQuery } from "@/store/server/invoicesApi";
import { BadgePercentIcon, BanknoteIcon, ReceiptTextIcon } from "lucide-react";

const POSTodaySales = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [params] = useSearchParams({
    page: "1",
    from: moment().subtract(1, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
    store_id: user?.active_branch?.toString() || "",
  });

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetInvoicesProductsQuery({
    params: params.toString() || "page=1",
  });

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MiniDashboardSingleCard
          item={{
            value: products?.result?.summary?.total || 0,
            icon: <SARIcon height={24} width={24} />,
            title: t("total"),
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: products?.result?.summary?.cash_total || 0,
            icon: <SARIcon height={24} width={24} />,
            title: t("cash-total"),
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: products?.result?.summary?.card_total || 0,
            icon: <BanknoteIcon height={24} width={24} />,
            title: t("card-total"),
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: products?.result?.summary?.vat || 0,
            icon: <BadgePercentIcon height={24} width={24} />,
            title: t("vat"),
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: products?.result?.summary?.invoices_count || 0,
            icon: <ReceiptTextIcon height={24} width={24} />,
            title: t("invoices-count"),
          }}
        />
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product")}</TableHead>
              <TableHead>
                {t("total-qty")} / {t("total-weight")}
              </TableHead>
              <TableHead>{t("price")}</TableHead>
              <TableHead>{t("total")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!products?.result?.products?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              products?.result?.products?.data?.map(
                (item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item?.product?.[t("_tr_name")] || item?.product?.name_ar}
                    </TableCell>

                    <TableCell>
                      {item?.product?.unit_type === "weight"
                        ? item?.total_weight + " KG"
                        : item?.total_qty}
                    </TableCell>

                    <TableCell>
                      <CurrencyFormate amount={item?.price} />
                    </TableCell>

                    <TableCell>
                      <CurrencyFormate amount={item?.total_price} />
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default POSTodaySales;
