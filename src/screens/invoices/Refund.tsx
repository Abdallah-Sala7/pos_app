import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInvoicesQuery } from "@/store/server/invoicesApi";
import { DatePicker } from "@/components/common/DatePicker";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { t } from "i18next";

import RefundProduct from "@/components/invoices/RefundProduct";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import EmptyTable from "@/components/common/EmptyTable";
import DateFormate from "@/components/common/DateFormate";
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import moment from "moment";

const RefundInvoicesPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [params, setSearchParams] = useSearchParams({
    page: "1",
    store_id: user?.active_branch?.toString() || "",
  });

  const {
    data: invoices,
    isLoading,
    isFetching,
  } = useGetInvoicesQuery({
    params: params.toString() || "page=1",
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput
          isLoading={isLoading || isFetching}
          placeholder={t("search-by-invoice-num")}
        />

        <DatePicker
          onSelect={(date: any) => {
            setSearchParams({
              page: "1",
              store_id: user?.active_branch?.toString() || "",
              from: moment(date).format("YYYY-MM-DD"),
              to: moment(date).format("YYYY-MM-DD"),
            });
          }}
          maxDate={new Date(Date.now())}
        />
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>{t("user")}</TableHead>
              <TableHead>{t("vat")}</TableHead>
              <TableHead>{t("total")}</TableHead>
              <TableHead>{t("invoice-date")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!invoices?.result?.invoices?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              invoices?.result?.invoices?.data?.map((item: any) => (
                <TableRow key={item?.id}>
                  <TableCell>{item?.id}</TableCell>

                  <TableCell>
                    <p>{item?.user?.name}</p>
                    <p>{item?.user?.mobile}</p>
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.vat} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.total} />
                  </TableCell>

                  <TableCell>
                    <DateFormate date={item?.invoice_date} hasTime />
                  </TableCell>

                  <TableCell>
                    {item?.status === "full_refund" ? (
                      <p className="w-fit px-4 py-1.5 text-sm rounded-full bg-destructive text-destructive-foreground">
                        {t("full-refunded")}
                      </p>
                    ) : item?.status === "partial_refund" ? (
                      <p className="w-fit px-4 py-1.5 text-sm rounded-full bg-orange-500 text-orange-50">
                        {t("partial-refunded")}
                      </p>
                    ) : (
                      <p className="w-fit px-4 py-1.5 text-sm rounded-full bg-primary text-primary-foreground">
                        {t("completed")}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <RefundProduct
                      invoice_id={item?.id}
                      products={item?.products}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={invoices?.result?.invoices?.pagination} />
    </div>
  );
};

export default RefundInvoicesPage;
