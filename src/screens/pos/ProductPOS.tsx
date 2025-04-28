import SuccessBooking from "./components/SuccessBooking";
import CartProductCard from "@/components/common/CartProductCard";
import LoadingPage from "@/components/common/LoadingPage";
import POSProductCard from "@/components/common/POSProductCard";
import ConfirmOrderBtn from "./components/ConfirmOrderBtn";
import AddCustomProduct from "./components/AddCustomProduct";
import SearchInput from "@/components/common/SearchInput";

import { t } from "i18next";
import { useFormik } from "formik";
import { RootState } from "@/store";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/store/server/categoriesApi";
import { useGetAllProductsMutation } from "@/store/server/productsApi";
import { RefreshCcwDotIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAddInvoicesMutation } from "@/store/server/invoicesApi";
import { POS_PERMISSIONS } from "@/constant";

const ProductPOS = () => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [getProducts, { isLoading }] = useGetAllProductsMutation();

  const { user } = useSelector((state: RootState) => state.user);
  const [invoice, setInvoice] = useState<any>({});
  const [params, setParams] = useSearchParams({
    store_id: user?.active_branch?.toString() || "",
  });

  const { data: categories } = useGetCategoriesQuery({
    params: {
      is_active: 1,
      store_id: user?.active_branch?.toString() || "",
    },
  });

  const [addOrderAction] = useAddInvoicesMutation();

  const storedProducts = localStorage.getItem("@stored_products") || "[]";

  const getProductsHandler = async () => {
    const { data } = await getProducts({
      params: {
        is_active: 1,
        store_id: user?.active_branch?.toString() || "",
      },
    });

    localStorage.setItem(
      "@stored_products",
      JSON.stringify(data?.result?.products || [])
    );

    return data?.result?.products || [];
  };

  const { values, setFieldValue, handleSubmit, isSubmitting, resetForm } =
    useFormik({
      initialValues: {
        store_id: user?.active_branch || "",
        payment_method: "CASH",
        products: [],
        extra_discount_type: "percentage",
        cash_amount: 0,
        remaining: 0,
      },
      onSubmit: async () => {
        await addOrderAction(values)
          .unwrap()
          .then((res) => {
            toast.success(res.message || t("success-msg"));
            setInvoice({
              ...res?.result?.invoice,
              ...values,
            });
            setIsReceiptOpen(true);
            setConfirmIsOpen(false);
          })
          .catch((error) => {
            toast.error(error?.data?.message);
          });
      },
    });

  useEffect(() => {
    if (user?.active_branch) {
      setFieldValue("store_id", user?.active_branch);
    }
  }, [user?.active_branch]);

  const products = useMemo(() => {
    let filteredProducts = [] as any;

    if (!storedProducts || !JSON?.parse(storedProducts)?.length) {
      filteredProducts = getProductsHandler();
    } else {
      filteredProducts = JSON.parse(storedProducts);
    }

    return params.get("category_id")
      ? filteredProducts?.filter(
          (product: any) => product?.category?.id == params.get("category_id")
        )
      : filteredProducts;
  }, [storedProducts, params.get("category_id")]);

  const showProductImage = user?.permissions?.includes(
    POS_PERMISSIONS.SHOW_PRODUCT_IMAGE
  );

  const showCategory = user?.permissions?.includes(
    POS_PERMISSIONS.SHOW_CATEGORIES
  );

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex items-start gap-6">
      <POSForm
        values={values}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        confirmIsOpen={confirmIsOpen}
        setConfirmIsOpen={setConfirmIsOpen}
      />

      <div className="flex-1 space-y-6 pt-6">
        {showCategory && categories?.result?.categories?.length > 1 ? (
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
                    params.set("category_id", category?.id);
                    params.set("page", "1");
                    return params;
                  });
                }}
              >
                {category?.[t("_tr_name")] || category?.name_ar}
              </Button>
            ))}
          </div>
        ) : (
          <div>
            <SearchInput />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {products?.map((product: any) => (
            <POSProductCard
              key={product?.id}
              product={product}
              formValues={values}
              setFieldValue={setFieldValue}
              showProductImage={showProductImage}
            />
          ))}
        </div>
      </div>

      <SuccessBooking
        invoice={invoice}
        isOpen={isReceiptOpen}
        setIsOpen={setIsReceiptOpen}
        resetForm={resetForm}
      />
    </div>
  );
};

export default ProductPOS;

const POSForm = ({
  values,
  setFieldValue,
  isSubmitting,
  handleSubmit,
  confirmIsOpen,
  setConfirmIsOpen,
}: {
  values: any;
  setFieldValue: any;
  isSubmitting: any;
  handleSubmit: any;
  confirmIsOpen: boolean;
  setConfirmIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="flex-1 max-w-80 max-h-[calc(100vh-75px)] h-screen pe-6 border-e sticky top-[75px] pt-6 space-y-3 overflow-y-auto flex flex-col">
      <div className="space-y-4 pb-3 flex-1">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            onClick={() => setFieldValue("products", [])}
          >
            <span>{t("refresh")}</span>

            <RefreshCcwDotIcon />
          </Button>

          <AddCustomProduct values={values} setFieldValue={setFieldValue} />
        </div>

        <div className="space-y-2">
          {values?.products?.map((product: any, index: number) => (
            <CartProductCard
              key={new Date().getTime() + index}
              product={product}
              formValues={values}
              setFieldValue={setFieldValue}
              valIdx={index}
            />
          ))}
        </div>
      </div>

      <div className="py-3 space-y-4 bg-background sticky bottom-0 border-t">
        {/* <div className="space-y-3">
          <p className="text-muted-foreground font-semibold">
            {t("payment-method")}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant={
                values?.payment_method === "CASH" ? "outlinePrimary" : "outline"
              }
              className="flex-1 rounded-md"
              onClick={() => setFieldValue("payment_method", "CASH")}
            >
              <span>{t("cash")}</span>
            </Button>

            <Button
              variant={
                values?.payment_method === "CARD" ? "outlinePrimary" : "outline"
              }
              className="flex-1 rounded-md"
              onClick={() => setFieldValue("payment_method", "CARD")}
            >
              <span>{t("card")}</span>
            </Button>

            <Button
              variant={
                values?.payment_method === "CARD&CASH"
                  ? "outlinePrimary"
                  : "outline"
              }
              className="flex-1 rounded-md"
              onClick={() => setFieldValue("payment_method", "CARD&CASH")}
            >
              <span>{t("cash-card")}</span>
            </Button>
          </div>
        </div> */}

        <ConfirmOrderBtn
          values={values}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
          confirmIsOpen={confirmIsOpen}
          setConfirmIsOpen={setConfirmIsOpen}
        />
      </div>
    </div>
  );
};
