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
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import ChangeStatus from "@/components/common/ChangeStatus";
import { useGetUsersQuery } from "@/store/server/usersApi";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { PackageOpenIcon, PenLine } from "lucide-react";

const Suppliers = ({ inPOS }: { inPOS?: boolean }) => {
  const [params] = useSearchParams({
    page: "1",
    user_type: "supplier",
  });

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetUsersQuery({
    params: params.toString() || "page=1",
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput isLoading={isLoading || isFetching} />

        <div className="flex items-center gap-3">
          {inPOS && (
            <Link to={"/purchases"}>
              <Button variant={"outline"}>
                <PackageOpenIcon />

                <span>{t("purchases")}</span>
              </Button>
            </Link>
          )}

          <Link to={"add"}>
            <Button>{t("add-supplier")}</Button>
          </Link>
        </div>
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("mobile")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!users?.result?.users?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              users?.result?.users?.data?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="space-y-0.5">
                        <p>{item?.name}</p>

                        {item?.user_type === "cashier" && (
                          <p className="text-xs bg-muted px-2 py-1 text-muted-foreground rounded-sm w-fit">
                            {item?.pos_device?.code}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item?.mobile || "-"}</TableCell>
                  <TableCell>{item?.email || "-"}</TableCell>

                  <TableCell>
                    <ChangeStatus
                      url={`/users/update_is_active/${item?.id}`}
                      status={Number(item?.is_active)}
                    />
                  </TableCell>

                  <TableCell>
                    <Link to={`/suppliers/${item.id}/update`}>
                      <Button variant={"outlinePrimary"} size={"icon"}>
                        <PenLine />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={users?.result?.users?.pagination} />
    </div>
  );
};

export default Suppliers;
