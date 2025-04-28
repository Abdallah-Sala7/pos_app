import LoadingPage from "@/components/common/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionHeader from "@/layouts/ActionHeader";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import Image from "@/components/common/Image";
import { useGetInvoiceByIdQuery } from "@/store/server/invoicesApi";
import DateFormate from "@/components/common/DateFormate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ExportOptions from "@/components/common/ExportOptions";
import { MenuIcon, Trash2Icon } from "lucide-react";
import RefundProduct from "@/components/invoices/RefundProduct";

const InvoicesDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetInvoiceByIdQuery(id);

  if (isLoading) return <LoadingPage />;

  const invoice = data?.result?.invoice;

  return (
    <section>
      <ActionHeader
        title={`#${invoice?.id}`}
        action={<InvoicesActions invoice={invoice} />}
      />

      <div className="container py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-base">
                  {t("invoice-details")}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("total-product")}
                    </h2>

                    <p className="font-semibold">{invoice?.products?.length}</p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("subtotal")}</h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.sub_total} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("vat")}</h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.vat} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("discount")}</h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.discount} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("extra-discount")}
                    </h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.extra_discount} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("total")}</h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.total} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("card-amount")}
                    </h2>
                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.card_amount} />
                    </p>{" "}
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("cash-amount")}
                    </h2>

                    <p className="font-semibold">
                      <CurrencyFormate amount={invoice?.cash_amount} />
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("invoice-date")}
                    </h2>

                    <p className="font-semibold">
                      <DateFormate date={invoice?.invoice_date} />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-base">
                  {t("customer-details")}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("name")}</h2>

                    <p className="font-semibold">
                      {invoice?.customer_name || "-"}
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("mobile")}</h2>

                    <p className="font-semibold">
                      {invoice?.customer_mobile || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-fit col-span-2 grid grid-cols-2 gap-6">
            <Card>
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-base">
                  {t("store-details")}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("name")}</h2>

                    <p className="font-semibold">
                      {invoice?.store?.[t("_tr_name")] ||
                        invoice?.store?.name_en}
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("address")}</h2>

                    <p className="font-semibold">{invoice?.address || "-"}</p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("store")}</h2>

                    <p className="font-semibold">
                      {invoice?.store?.module?.[t("_tr_name")] ||
                        invoice?.store?.module?.name_en}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-base">
                  {t("cashier-details")}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("name")}</h2>

                    <p className="font-semibold">{invoice?.user?.name}</p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("mobile")}</h2>

                    <p className="font-semibold">
                      {invoice?.user?.mobile || "-"}
                    </p>
                  </div>

                  <div className="py-3 px-4 grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("email")}</h2>

                    <p className="font-semibold">
                      {invoice?.user?.email || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="col-span-full space-y-6">
              <h2 className="text-lg font-semibold">{t("products")}</h2>

              {invoice?.products?.map((product: any) => (
                <Card key={product?.id} className="p-4">
                  <div className="flex gap-4">
                    <Image
                      src={product?.image}
                      alt={product?.name_en}
                      className="w-20 h-20 rounded-full object-cover"
                    />

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-semibold">
                          {product?.[t("_tr_name")] || product?.name_en}
                        </h2>

                        {!!product?.full_refund && (
                          <p className="px-4 py-1.5 text-sm rounded-full bg-destructive text-destructive-foreground">
                            {t("refunded")}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="grid grid-cols-2">
                          <h2 className="text-muted-foreground">
                            {t("item-price")}
                          </h2>

                          <p className="font-semibold text-end">
                            <CurrencyFormate
                              className="justify-end"
                              amount={product?.price}
                            />
                          </p>
                        </div>

                        {product?.unit_type === "weight" ? (
                          <div className="grid grid-cols-2">
                            <h2 className="text-muted-foreground">
                              {t("weight")}
                            </h2>

                            <p className="font-semibold text-end">
                              {product?.weight} KG
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2">
                            <h2 className="text-muted-foreground">
                              {t("quantity")}
                            </h2>

                            <p className="font-semibold text-end">
                              {product?.qty}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2">
                          <h2 className="text-muted-foreground">
                            {t("total-price")}
                          </h2>

                          <p className="font-semibold text-end">
                            <CurrencyFormate
                              className="justify-end"
                              amount={product?.total}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoicesDetails;

const InvoicesActions = ({ invoice }: { invoice: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant={"outline"} size={"icon"}>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 ms-3 bg-background divide-y">
        <DropdownMenuItem asChild className="cursor-pointer px-0 py-0">
          <RefundProduct
            products={invoice?.products}
            invoice_id={invoice?.id}
          />
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer px-0 py-0">
          <ExportOptions
            filePathname={`invoices/download/${invoice?.id}`}
            className="w-full border-0 justify-start rounded-none"
          />
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer px-0 py-0">
          <Button
            variant={"outline"}
            className="w-full border-0 justify-start rounded-none"
          >
            <Trash2Icon />

            <span>{t("delete-invoice")}</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
