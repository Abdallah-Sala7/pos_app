import Form from "./Form";
import ActionHeader from "@/layouts/ActionHeader";


import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  useGetProductByIdQuery,
  useUpdateProductsMutation,
} from "@/store/server/productsApi";
import LoadingPage from "@/components/common/LoadingPage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoaderIcon } from "lucide-react";

const UpdateProduct = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <LoadingPage />;

  return (
    <section>
      <ProductForm
        initialValues={{
          ...(data?.result?.product || {}),
          category_id: data?.result?.product?.category?.id,
          store_ids: [user?.active_branch],
        }}
      />
    </section>
  );
};

export default UpdateProduct;

const ProductForm = ({ initialValues }: { initialValues: any }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<any>({});

  const [updateProductAction, { isLoading }] = useUpdateProductsMutation();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async function (values) {
      setErrors({});

      await updateProductAction(
        serialize(values, { nullsAsUndefineds: true, indices: true })
      )
        .unwrap()
        .then((res) => {
          navigate("/products");
          toast.success(res.message || t("success-msg"));
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          setErrors(error?.data?.message);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <ActionHeader
        action={
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <span>{t("submit")}</span>
            )}
          </Button>
        }
        title={t("update-product")}
      />

      <div className="container py-6">
        <Form
          values={values}
          errors={errors}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </div>
    </form>
  );
};
