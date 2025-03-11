import CartProductCard from "@/components/pos/CartProductCard";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import ProductCard from "@/components/pos/ProductCard";
import POSHeader from "@/layouts/POSHeader";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useGetCategoriesQuery } from "@/store/server/categoriesApi";
import { useFormik } from "formik";
import { t } from "i18next";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PrintInvoice from "@/components/common/PrintInvoice";
import { useReactToPrint } from "react-to-print";

const POSPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.app);

  const invoiceRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: invoiceRef });

  const [params, setParams] = useSearchParams({
    page: "1",
    store_id: user?.active_branch?.toString() || "",
  });

  const { data: categories } = useGetCategoriesQuery({
    params: {
      is_active: 1,
    },
  });

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
        const invoices = JSON.parse(localStorage.getItem("@invoices") || "[]");

        localStorage.setItem(
          "@invoices",
          JSON.stringify([
            ...invoices,
            {
              ...values,
              created_at: new Date().toISOString(),
            },
          ])
        );

        setTimeout(() => {
          reactToPrintFn(); // Trigger print
        }, 500);

        resetForm();
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

      <div style={{ display: "none" }}>
        <PrintInvoice invoiceRef={invoiceRef} order={values} />
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
    <div className="flex-1 max-w-80 max-h-[calc(100vh-75px)] h-screen pe-6 border-e sticky top-[75px] pt-3 space-y-3 overflow-y-auto flex flex-col">
      <div className="pb-3 flex-1">
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
        <Button
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
          className="w-full h-14"
          size={"lg"}
        >
          <CurrencyFormate className="text-lg font-bold" amount={total} />
        </Button>
      </div>
    </div>
  );
};
