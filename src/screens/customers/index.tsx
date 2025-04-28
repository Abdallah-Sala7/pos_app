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
import { useGetCustomersQuery } from "@/store/server/customersApi";

import EmptyTable from "@/components/common/EmptyTable";
import DateFormate from "@/components/common/DateFormate";
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import AddCustomer from "./add";
import ChangeStatus from "@/components/common/ChangeStatus";
import UpdateCustomer from "./update";
import { Button } from "@/components/ui/button";
import { ReceiptTextIcon } from "lucide-react";

const Customers = ({ inPOS }: { inPOS?: boolean }) => {
  const [params] = useSearchParams({
    page: "1",
  });

  const {
    data: customers,
    isLoading,
    isFetching,
  } = useGetCustomersQuery({
    params: params.toString() || "page=1",
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput isLoading={isLoading || isFetching} />

        <div className="flex items-center gap-3">
          {inPOS && (
            <Link to={"/invoices"}>
              <Button variant={"outline"}>
                <ReceiptTextIcon />

                <span>{t("invoices")}</span>
              </Button>
            </Link>
          )}

          <AddCustomer />
        </div>
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("customer")}</TableHead>
              <TableHead>{t("gender")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("last-update")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!customers?.result?.customers?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              customers?.result?.customers?.data?.map((item: any) => (
                <TableRow key={item?.id}>
                  <TableCell>
                    <p>{item?.name}</p>
                    <p>{item?.mobile}</p>
                    <p>{item?.email}</p>
                  </TableCell>

                  <TableCell>{t(item?.gender)}</TableCell>

                  <TableCell>
                    <ChangeStatus
                      url={`/customers/update_is_active/${item?.id}`}
                      status={Number(item?.is_active)}
                    />
                  </TableCell>

                  <TableCell>
                    <DateFormate date={item?.updated_at} hasTime />
                  </TableCell>

                  <TableCell>
                    <UpdateCustomer initialValues={item} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={customers?.result?.customers?.pagination} />
    </div>
  );
};

export default Customers;
