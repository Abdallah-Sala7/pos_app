import Form from "./Form";
import moment from "moment";
import ActionHeader from "@/layouts/ActionHeader";
import ProductCard from "@/components/common/ProductCard";
import LoadingPage from "@/components/common/LoadingPage";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import Image from "@/components/common/Image";
import CartCounter from "@/components/common/CartCounter";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddOrderMutation } from "@/store/server/ordersApi";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetProductsQuery } from "@/store/server/productsApi";
import { useSearchParams } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import PagePagination from "@/components/common/Pagination";

const AddPurchases = () => {
  const [errors, setErrors] = useState<any>({});
  const [mutation, { isLoading: isSubmitting }] = useAddOrderMutation();
  const { user } = useSelector((state: RootState) => state.user);

  const [params] = useSearchParams({
    store_id: user?.active_branch?.toString() || "",
    page: "1",
  });

  const { data, isLoading } = useGetProductsQuery({
    params: params.toString() || "",
  });

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      store_id: user?.active_branch || "",
      total: "",
      notes: "",
      order_date: moment(),
      products: [],
      step: 1,
    },
    onSubmit: async function (values) {
      setErrors({});

      if (values?.step === 1) {
        setFieldValue("step", 2);
        setFieldValue(
          "total",
          values?.products?.reduce(
            (a, b: any) => a + Number(b?.price) * b?.qty,
            0
          )
        );
        return;
      }

      await mutation(values)
        .unwrap()
        .then((res) => {
          toast.success(res.message || t("success-msg"));
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          setErrors(error?.data?.message);
        });
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <ActionHeader
          action={
            <div className="flex items-center gap-2">
              {values?.step === 1 ? (
                <>
                  <Button type="submit">
                    {values?.products?.length < 1 ? t("skip") : t("next")}
                  </Button>

                  <OrdersCart values={values} setFieldValue={setFieldValue} />
                </>
              ) : (
                <>
                  <Button type="submit" disabled={isSubmitting}>
                    {t("confirm-order")}
                  </Button>

                  <Button
                    type="button"
                    className="relative"
                    variant={"secondary"}
                    onClick={() => setFieldValue("step", 1)}
                  >
                    {t("back")}
                  </Button>
                </>
              )}
            </div>
          }
          title={t("add-purchases")}
        />

        <div className="container py-8 space-y-6">
          {values?.step === 1 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data?.result?.products?.data?.map((product: any) => (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    setFieldValue={setFieldValue}
                    formValues={values}
                  />
                ))}
              </div>

              <PagePagination pagination={data?.result?.products?.pagination} />
            </>
          ) : (
            <Form
              values={values}
              errors={errors}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default AddPurchases;

const OrdersCart = ({
  values,
  setFieldValue,
}: {
  values: any;
  setFieldValue: any;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="relative" variant={"secondary"}>
          <span>{t("cart")}</span>

          <ShoppingCartIcon />

          {values?.products?.length > 0 && (
            <span className="text-xs absolute top-0 right-0 bg-primary text-primary-foreground w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {values?.products?.length}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cart")}</DialogTitle>
        </DialogHeader>
        <div className="divide-y">
          {values?.products?.map((product: any, index: number) => (
            <div className="py-4 flex gap-4" key={product?.id}>
              <Image
                src={product?.image}
                alt={product?.name_en}
                title={product?.name_en}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <h2 className="font-semibold">
                    {product?.[t("_tr_name")] || product?.name_en}
                  </h2>

                  <CartCounter
                    formValues={values}
                    product={product}
                    setFieldValue={setFieldValue}
                    valIdx={index}
                  />
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">{t("item-price")}</h2>

                    <p className="font-semibold text-end text-sm">
                      <CurrencyFormate
                        className="justify-end"
                        amount={product?.price}
                      />
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {product?.unit_type === "weight"
                        ? t("weight")
                        : t("quantity")}
                    </h2>

                    <p className="font-semibold text-end text-sm">
                      {product?.qty || product?.weight}
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <h2 className="text-muted-foreground">
                      {t("total-price")}
                    </h2>

                    <p className="font-semibold text-end text-sm">
                      <CurrencyFormate
                        className="justify-end"
                        amount={product?.price * product?.qty}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
