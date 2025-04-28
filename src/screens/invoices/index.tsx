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
import EmptyTable from "@/components/common/EmptyTable";
import DateFormate from "@/components/common/DateFormate";
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import { useGetInvoicesQuery } from "@/store/server/invoicesApi";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import { Button } from "@/components/ui/button";
import { PrinterIcon, Users2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PrintInvoice from "@/components/invoices/PrintInvoice";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { POS_PERMISSIONS } from "@/constant";
import A4Invoice from "@/components/invoices/A4Invoice";
import ViewReceipt from "@/components/invoices/ViewReceipt";
import { MiniDashboardSingleCard } from "@/components/common/MiniDashboardSingleCard";
import RefundProduct from "@/components/invoices/RefundProduct";
import SARIcon from "@/components/common/SARIcon";

const InvoicesPage = () => {
  const invoiceRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: invoiceRef });
  const [invoice, setInvoice] = useState<any>({});
  const { user } = useSelector((state: RootState) => state.user);

  const [params] = useSearchParams({
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.zatca?.issued || 0,
            title: t("issued-invoices"),
            key: "issued",
          }}
          filter_key="zatca_filter"
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.zatca?.pending || 0,
            title: t("pending-invoices"),
            key: "pending",
          }}
          filter_key="zatca_filter"
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.zatca?.rejected || 0,
            title: t("rejected-invoices"),
            key: "rejected",
          }}
          filter_key="zatca_filter"
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.zatca?.resent || 0,
            title: t("resended-invoices"),
            key: "resent",
          }}
          filter_key="zatca_filter"
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.card_amount || 0,
            title: t("card-amount"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.cash_amount || 0,
            title: t("cash-amount"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.discount || 0,
            title: t("discount"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.extra_discount || 0,
            title: t("extra-discount"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.vat || 0,
            title: t("vat"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />

        <MiniDashboardSingleCard
          item={{
            value: invoices?.result?.summary?.total_amount || 0,
            title: t("total"),
            icon: <SARIcon height={22} width={22} />,
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput isLoading={isLoading || isFetching} />

        <div className="flex items-center gap-3">
          {user?.permissions?.includes(POS_PERMISSIONS.SHOW_CUSTOMERS) && (
            <Link to={"/customers"}>
              <Button variant={"outline"}>
                <Users2Icon />

                <span>{t("customers")}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>{t("user")}</TableHead>
              <TableHead>{t("vat")}</TableHead>
              <TableHead>{t("cash-amount")}</TableHead>
              <TableHead>{t("card-amount")}</TableHead>
              <TableHead>{t("total")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("invoice-date")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!invoices?.result?.invoices?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              invoices?.result?.invoices?.data?.map((item: any) => (
                <TableRow key={item?.id}>
                  <TableCell>#{item?.id}</TableCell>

                  <TableCell>
                    <p>{item?.user?.name}</p>
                    <p>{item?.user?.mobile}</p>
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.vat} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.cash_amount} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.card_amount} />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.total} />
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
                    <DateFormate date={item?.invoice_date} hasTime />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ViewReceipt invoice={item} />

                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => {
                          setInvoice(item);
                          setTimeout(() => {
                            reactToPrintFn();
                          }, 500);
                        }}
                      >
                        <PrinterIcon />
                      </Button>

                      {user?.permissions?.includes(POS_PERMISSIONS.REFUND) && (
                        <RefundProduct
                          invoice_id={item?.id}
                          products={item?.products}
                        />
                      )}

                      {/*  {!inPOS && (
                        <>
                         <Link to={"/invoices/" + item?.id}>
                            <Button size={"icon"} variant={"outlinePrimary"}>
                              <EyeIcon />
                            </Button>
                          </Link> 

                          <ExportOptions
                            filePathname={`/invoices/download/${item?.id}`}
                            method="post"
                          />
                        </>
                      )}*/}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={invoices?.result?.invoices?.pagination} />

      <div style={{ display: "none" }}>
        {user?.permissions?.includes(POS_PERMISSIONS.A4_INVOICE) ? (
          <A4Invoice order={invoice} invoiceRef={invoiceRef} />
        ) : (
          <PrintInvoice invoiceRef={invoiceRef} order={invoice} />
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
