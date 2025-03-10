import CartProductCard from "@/components/pos/CartProductCard";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import ProductCard from "@/components/pos/ProductCard";
import POSHeader from "@/layouts/POSHeader";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useGetCategoriesQuery } from "@/store/server/categoriesApi";
import { useAddOrderMutation } from "@/store/server/ordersApi";
import { useFormik } from "formik";
import { t } from "i18next";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const POSPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.app);

  const [params, setParams] = useSearchParams({
    page: "1",
    store_id: user?.active_branch?.toString() || "",
  });

  const { data: categories } = useGetCategoriesQuery({
    params: {
      is_active: 1,
    },
  });

  const [addOrderAction] = useAddOrderMutation();

  const { values, setFieldValue, resetForm, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        store_id: user?.active_branch?.toString() || "",
        client_name: "",
        client_mobile: "",
        payment_option: "cash",
        products: [],
      },
      onSubmit: async () => {
        await addOrderAction(values)
          .unwrap()
          .then((res) => {
            toast.success(res.message || t("success-msg"));
            resetForm();
          })
          .catch((error) => {
            toast.error(error?.data?.message);
          });
      },
    });

  return (
    <section className="bg-background">
      <POSHeader />

      <div className="pb-6 container-fluid">
        <div className="flex items-start gap-6">
          <POSForm
            values={values}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />

          <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center gap-2 flex-wrap">
              {categories?.result?.categories?.map((category: any) => (
                <Button
                  key={category?.id}
                  size={"sm"}
                  variant={
                    params.get("category_id") == category?.id
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setParams((params) => {
                      params.set("page", "1");
                      params.set("category_id", category?.id);
                      return params;
                    });
                  }}
                >
                  {category?.[t("_tr_name")] || category?.name_ar}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
              {products?.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  formValues={values}
                  setFieldValue={setFieldValue}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default POSPage;

const POSForm = ({
  values,
  setFieldValue,
  isSubmitting,
  handleSubmit,
}: {
  values: any;
  setFieldValue: any;
  isSubmitting: any;
  handleSubmit: any;
}) => {
  // const total = values?.products?.reduce(
  //   (acc: any, item: any) =>
  //     acc + item?.product?.main_product?.price * item?.quantity,
  //   0
  // );

  const total = useMemo(() => {
    return values?.products?.reduce(
      (acc: any, item: any) =>
        acc + item?.product?.main_product?.price * item?.qty,
      0
    );
  }, [values?.products]);

  return (
    <div className="flex-1 max-w-80 max-h-[calc(100vh-75px)] h-screen pe-6 border-e sticky top-[75px] pt-6 space-y-3 overflow-y-auto flex flex-col">
      {/* <div className="space-y-3 pb-3 border-b">
        <h2 className="font-semibold">{t("customer-details")}</h2>

        <div className="space-y-2">
          <div className="form-group">
            <MobileInput
              type="text"
              autoComplete="off"
              placeholder={t("client-mobile")}
              name="client_mobile"
              value={values.client_mobile}
              required
              onChange={handleChange}
              className="h-10"
            />
            {errors?.client_mobile && (
              <span className="form-error">{errors?.client_mobile}</span>
            )}
          </div>

          <div className="form-group">
            <Input
              type="text"
              autoComplete="off"
              placeholder={`${t("client-name")} (${t("optional")})`}
              name="client_name"
              value={values.client_name}
              required
              onChange={handleChange}
              className="h-10"
            />
            {errors?.client_name && (
              <span className="form-error">{errors?.client_name}</span>
            )}
          </div>

          <div className="form-group">
            <Input
              type="text"
              autoComplete="off"
              placeholder={`${t("discount-code")} (${t("optional")})`}
              name="code"
              value={values.code}
              required
              onChange={handleChange}
              className="h-10"
            />
            {errors?.code && <span className="form-error">{errors?.code}</span>}
          </div>
        </div>
      </div> */}

      <div className="space-y-3 pb-3 flex-1">
        <h2 className="font-semibold">{t("order-details")}</h2>

        <div className="divide-y">
          {values?.products?.map((product: any) => (
            <CartProductCard
              key={product.id}
              product={product}
              formValues={values}
              setFieldValue={setFieldValue}
            />
          ))}
        </div>
      </div>

      <div className="py-3 space-y-4 bg-background sticky bottom-0 border-t">
        <div className="flex justify-between gap-2 text-sm">
          <p className="font-semibold text-muted-foreground">{t("discount")}</p>

          <p className="font-semibold">
            <CurrencyFormate amount={values?.discount} />
          </p>
        </div>

        <Button
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
          className="w-full h-12"
          size={"lg"}
        >
          <CurrencyFormate className="text-lg font-bold" amount={total} />
        </Button>
      </div>
    </div>
  );
};
