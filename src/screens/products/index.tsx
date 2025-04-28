import { t } from "i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/store/server/productsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import QuickAddProducts from "./quickAdd";
import EmptyTable from "@/components/common/EmptyTable";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import DateFormate from "@/components/common/DateFormate";
import SearchInput from "@/components/common/SearchInput";
import PagePagination from "@/components/common/Pagination";
import Image from "@/components/common/Image";
import ChangeStatus from "@/components/common/ChangeStatus";
import ConfirmModal from "@/components/common/ConfirmModal";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PenBoxIcon } from "lucide-react";

const ProductsPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [params] = useSearchParams({
    page: "1",
    store_id: user?.active_branch?.toString() || "",
  });

  const { data, isLoading, isFetching } = useGetProductsQuery({
    params: params.toString() || "page=1",
  });

  const [deleteProduct] = useDeleteProductMutation();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <SearchInput isLoading={isLoading || isFetching} />

        <div className="flex items-center gap-3">
          <QuickAddProducts store_id={user?.active_branch} />

          <Link to="/products/add">
            <Button>{t("add-products")}</Button>
          </Link>
        </div>
      </div>

      <Card className="shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product")}</TableHead>
              <TableHead>{t("price")}</TableHead>
              {/* <TableHead>{t("category")}</TableHead>
              <TableHead>{t("sellable")}</TableHead>
              <TableHead>{t("purchasable")}</TableHead> */}
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("last-update")}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!data?.result?.products?.data?.length ? (
              <EmptyTable isLoading={isLoading || isFetching} />
            ) : (
              data?.result?.products?.data?.map((item: any) => (
                <TableRow key={item?.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item?.image}
                        alt={item?.name_ar}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="space-y-0.5">
                        <p>
                          {item?.["_tr_name"] || item?.name_ar || item?.name_en}
                        </p>
                        <p>{item?.item_code || item?.barcode}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate amount={item?.price} />
                  </TableCell>

                  {/* <TableCell>
                    {item?.category?.[t("_tr_name")] ||
                      item?.category?.name_ar ||
                      "-"}
                  </TableCell>

                  <TableCell>{item?.is_sellable ? "Yes" : "No"}</TableCell>
                  <TableCell>{item?.is_purchasable ? "Yes" : "No"}</TableCell> */}

                  <TableCell>
                    <ChangeStatus
                      url={`/products/update_is_active/${item?.id}`}
                      status={Number(item?.is_active)}
                    />
                  </TableCell>

                  <TableCell>
                    <DateFormate date={item?.updated_at} hasTime />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/products/${item?.main_product?.id || item?.id}`}
                      >
                        <Button size={"icon"} variant={"outlinePrimary"}>
                          <PenBoxIcon />
                        </Button>
                      </Link>

                      <ConfirmModal
                        mutationFunction={() => deleteProduct(item?.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PagePagination pagination={data?.result?.products?.pagination} />
    </div>
  );
};

export default ProductsPage;
