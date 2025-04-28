import { RootState } from "@/store";
import { useAddInvoicesMutation } from "@/store/server/invoicesApi";
import { useFormik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProductsMutation } from "@/store/server/productsApi";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

import SelectItem from "@/components/common/SelectItem";
import LoadingPage from "@/components/common/LoadingPage";
import ConfirmOrderBtn from "./components/ConfirmOrderBtn";
import CurrencyFormate from "@/components/common/CurrencyFormate";
import CartCounter from "../../components/common/CartCounter";
import EmptyTable from "@/components/common/EmptyTable";
import SelectWithSearch from "@/components/common/SelectItemSearch";
import QuickAddProducts from "../products/quickAdd";
import useScanDetection from "use-scan-detection";
import SuccessBooking from "./components/SuccessBooking";
import PriceInput from "@/components/common/PriceInput";
import SelectCustomer from "../customers/SelectCustomer";
import { POS_PERMISSIONS } from "@/constant";
import AddCustomer from "../customers/add";

const BarcodePOS = () => {
  const [addOrderAction] = useAddInvoicesMutation();
  const [getProducts, { isLoading }] = useGetAllProductsMutation();

  const [invoice, setInvoice] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const [barcodeReader, setBarcodeReader] = useState<String>("");

  const { user } = useSelector((state: RootState) => state.user);

  const store_id = user?.active_branch || "";
  const storedProducts = localStorage.getItem("@stored_products") || "[]";

  const { values, setFieldValue, handleSubmit, isSubmitting, resetForm } =
    useFormik({
      initialValues: {
        store_id,
        payment_method: "CASH",
        payment_type: "pay_now",
        products: [],
        extra_discount_type: "percentage",
        cash_amount: 0,
        remaining: 0,
        customer: undefined,
      } as any,
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

  useScanDetection({
    onComplete: (code) => {
      const product = products?.find(
        (item: any) => (item?.barcode || item?.item_code)?.toString() === code
      );

      if (product) {
        setFieldValue(`products`, [
          {
            qty: 1,
            weight: 1,
            id: product?.id,
            product,
          },
          ...values?.products,
        ]);
        setBarcodeReader("");
      } else {
        setIsOpenAddProduct(true);
        setBarcodeReader(code);
      }
    },
    minLength: 5,
  });

  const getProductsHandler = async () => {
    const { data } = await getProducts({
      params: {
        is_active: 1,
        store_id,
      },
    });

    setProducts(data?.result?.products || []);
    localStorage.setItem(
      "@stored_products",
      JSON.stringify(data?.result?.products || [])
    );
  };

  useEffect(() => {
    if (!storedProducts || !JSON?.parse(storedProducts)?.length) {
      getProductsHandler();
    } else {
      setProducts(JSON.parse(storedProducts));
    }
  }, [storedProducts]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 max-w-80">
            <SelectWithSearch
              items={products || []}
              setValue={(val: any) => {
                setFieldValue(`products`, [
                  {
                    qty: 1,
                    weight: 1,
                    id: val?.id,
                    product: val,
                  },
                  ...values?.products,
                ]);
              }}
              value={null}
              className="h-14 px-6 rounded-xl"
            />
          </div>

          {user?.permissions?.includes(POS_PERMISSIONS.SHOW_CUSTOMERS) && (
            <div className="flex-1 flex">
              <div className="flex-1">
                <SelectCustomer
                  setFieldValue={setFieldValue}
                  value={values?.customer}
                  className="rounded-e-none border-e-0"
                />
              </div>
              <AddCustomer className="!h-14 rounded-s-none rounded-e-xl" />
            </div>
          )}

          <div className="flex-1 max-w-80">
            <ConfirmOrderBtn
              values={values}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              confirmIsOpen={confirmIsOpen}
              setConfirmIsOpen={setConfirmIsOpen}
            />
          </div>

          <QuickAddProducts
            setProduct={(product) => {
              setFieldValue(`products`, [
                {
                  qty: 1,
                  weight: 1,
                  id: product?.id,
                  product,
                },
                ...values?.products,
              ]);
              setBarcodeReader("");
              setIsOpenAddProduct(false);
            }}
            className="hidden"
            store_id={store_id}
            is_unlisted_product
            isOpen={isOpenAddProduct}
            initialValue={{
              item_code: barcodeReader,
            }}
          />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>{t("barcode")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("price")}</TableHead>
                <TableHead>{t("cost")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("total")}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {values?.products?.length === 0 && <EmptyTable />}

              {values?.products?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    {item?.is_custom ? (
                      <div className="border h-11 w-full rounded-full py-3 px-4">
                        {item?.item_code}
                      </div>
                    ) : (
                      <SelectItem
                        items={
                          products?.map((vv: any) => ({
                            ...vv,
                            optionName: vv?.barcode || vv?.item_code,
                            isChecked: values?.products?.some(
                              (iv: any) => iv?.product?.id === vv?.id
                            ),
                          })) || []
                        }
                        setValue={(val: any) => {
                          setFieldValue(`products[${index}]`, {
                            qty: 1,
                            weight: 1,
                            id: val?.id,
                            product: val,
                          });
                        }}
                        value={{
                          ...(item?.product || {}),
                          optionName:
                            item?.product?.barcode || item?.product?.item_code,
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    {item?.is_custom ? (
                      <div className="border h-11 w-full rounded-full py-3 px-4">
                        {item?.name}
                      </div>
                    ) : (
                      <SelectItem
                        items={
                          products?.map((vv: any) => ({
                            ...vv,
                            isChecked: values?.products?.some(
                              (iv: any) => iv?.product?.id === vv?.id
                            ),
                          })) || []
                        }
                        setValue={(val: any) => {
                          setFieldValue(`products[${index}]`, {
                            qty: 1,
                            weight: 1,
                            id: val?.id,
                            product: val,
                          });
                        }}
                        value={{
                          ...(item?.product || {}),
                          optionName:
                            item?.product?.name || item?.product?.alt_name,
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <PriceInput
                      value={item?.product?.price}
                      onChange={(val) => {
                        setFieldValue(`products.${index}`, {
                          ...item,
                          product: {
                            ...item?.product,
                            price: val,
                          },
                        });
                      }}
                      className="max-w-48"
                    />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate
                      amount={item?.product?.cost || item?.cost}
                    />
                  </TableCell>

                  <TableCell>
                    <CartCounter
                      product={item}
                      formValues={values}
                      setFieldValue={setFieldValue}
                      valIdx={index}
                    />
                  </TableCell>

                  <TableCell>
                    <CurrencyFormate
                      amount={
                        Number(item?.product?.price || item?.price) * item?.qty
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"destructive"}
                      onClick={() => {
                        setFieldValue(
                          "products",
                          values?.products?.filter(
                            (_: any, idx: number) => idx !== index
                          )
                        );
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <SuccessBooking
        invoice={{
          ...values,
          ...invoice,
        }}
        isOpen={isReceiptOpen}
        setIsOpen={setIsReceiptOpen}
        resetForm={resetForm}
      />
    </div>
  );
};

export default BarcodePOS;
