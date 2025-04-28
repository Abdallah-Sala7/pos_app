import Form from "./Form";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCostCenterMutation } from "@/store/server/costCenterApi";
import { PenBoxIcon } from "lucide-react";

const UpdateCenterCost = ({ initialValues }: { initialValues: any }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<any>({});
  const [mutation, { isLoading }] = useUpdateCostCenterMutation();
  const [open, setOpen] = useState(false);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      ...initialValues,
      cost_centers: initialValues?.cost_centers?.length
        ? initialValues?.cost_centers
        : [
            {
              name: "",
              alt_name: "",
            },
          ],
    },
    onSubmit: async function (values) {
      setErrors({});

      await mutation(values)
        .unwrap()
        .then((res) => {
          toast.success(res.message || t("success-msg"));
          setOpen(false);
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          setErrors(error?.data?.message);
        });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outlinePrimary"}>
          <PenBoxIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add-cost-center")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Form
              values={values}
              errors={errors}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isLoading}>
                {t("save")}
              </Button>

              <DialogClose asChild>
                <Button type="button" variant={"outline"} disabled={isLoading}>
                  {t("cancel")}
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCenterCost;
