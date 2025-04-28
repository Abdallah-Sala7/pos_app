import Form from "./Form";
import ActionHeader from "@/layouts/ActionHeader";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductsMutation } from "@/store/server/productsApi";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoaderIcon } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<any>({});

  const { user } = useSelector((state: RootState) => state.user);
  const [addProductAction, { isLoading }] = useAddProductsMutation();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      product_type: "simple",
      name: undefined,
      description: undefined,
      price: undefined,
      images: undefined,
      options: [],
      sub_products: [],
      included_options: [{}],
      excluded_options: [{}],
      store_id: "",
      is_sellable: 1,
      is_purchasable: 1,
    },
    onSubmit: async function (values) {
      setErrors({});

      await addProductAction(
        serialize(values, { nullsAsUndefineds: true, indices: true })
      )
        .unwrap()
        .then((res) => {
          toast.success(res.message || t("success-msg"));
          navigate("/products");
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          setErrors(error?.data?.message);
        });
    },
  });

  useEffect(() => {
    if (user?.active_branch) {
      setFieldValue("store_ids.0", user?.active_branch);
    }
  }, [user?.active_branch]);

  return (
    <section>
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
          title={t("add-products")}
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
    </section>
  );
};

export default AddProduct;
