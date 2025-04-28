import Form from "./Form";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ActionHeader from "@/layouts/ActionHeader";
import { useAddUsersMutation } from "@/store/server/usersApi";
import { LoaderIcon } from "lucide-react";

const AddSuppliers = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<any>({});
  const [mutation, { isLoading }] = useAddUsersMutation();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      user_type: "supplier",
      contacts: [],
    },
    onSubmit: async function (values) {
      setErrors({});

      await mutation(serialize(values, { indices: true }))
        .unwrap()
        .then((res) => {
          toast.success(res.message || t("success-msg"));
          navigate("/suppliers");
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          setErrors(error?.data?.message);
        });
    },
  });

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
          title={t("add-supplier")}
        />

        <div className="container py-8">
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

export default AddSuppliers;
