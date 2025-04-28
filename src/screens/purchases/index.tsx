import EmptyTable from "@/components/common/EmptyTable";
import DateFormate from "@/components/common/DateFormate";
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import CurrencyFormate from "@/components/common/CurrencyFormate";

import { Link, useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { t } from "i18next";
import { useGetOrdersQuery } from "@/store/server/ordersApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Users2Icon } from "lucide-react";
import { POS_PERMISSIONS } from "@/constant";

const Purchases = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [params] = useSearchParams({
    page: "1",
    store_id: user?.active_branch?.toString() || "",
  });

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetOrdersQuery({
    params: params.toString() || "page=1",
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput isLoading={isLoading || isFetching} />

        <div className="flex items-center gap-3">
          {user?.permissions?.includes(POS_PERMISSIONS.SHOW_SUPPLIERS) && (
            <Link to={"/suppliers"}>
              <Button variant={"outline"}>
                <Users2Icon />

                <span>{t("suppliers")}</span>
              </Button>
            </Link>
          )}

          <Link to="/purchases/add">
            <Button>{t("add-purchases")}</Button>
          </Link>
        </div>
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("store")}</TableHead>
              <TableHead>{t("supplier")}</TableHead>
              <TableHead>{t("subtotal")}</TableHead>
              <TableHead>{t("vat")}</TableHead>
              <TableHead>{t("total")}</TableHead>
              <TableHead>{t("notes")}</TableHead>
              <TableHead>{t("date")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!orders?.result?.orders?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              orders?.result?.orders?.data?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    {item?.store?.[t("_tr_name")] || item?.store?.name_ar}
                  </TableCell>

                  <TableCell>{item?.supplier?.name || "-"}</TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.sub_total} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.vat} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.total} />
                  </TableCell>

                  <TableCell>
                    <p className="max-w-56 text-muted-foreground">
                      {item?.notes || "-"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <DateFormate date={item?.created_at} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={orders?.result?.orders?.pagination} />
    </div>
  );
};

export default Purchases;
