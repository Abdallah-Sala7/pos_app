import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";

import {
  useGetUserInfoQuery,
  useUpdateProfileDataMutation,
} from "@/store/server/userApi";
import LoadingPage from "@/components/common/LoadingPage";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";
import { saveUserInfo } from "@/store/reducer/auth";
import { Input } from "@/components/ui/input";
import InputImage from "@/components/common/InputImage";
import { LoaderIcon } from "lucide-react";

export default function Profile({ inPOS }: { inPOS?: boolean }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetUserInfoQuery({});

  const [updateProfileAction, { error }] = useUpdateProfileDataMutation();

  if (isLoading) return <LoadingPage />;

  const { values, isSubmitting, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        ...data.result.profile,
      },
      onSubmit: async (values) => {
        if (typeof values?.image === "string") {
          values.image = null;
        }

        const formD = serialize(values);

        const res = await updateProfileAction(formD).unwrap();
        toast.success(res.message || t("success-updated"));
        dispatch(
          saveUserInfo({
            ...res?.result.profile,
            ...res?.result.permissions,
          })
        );
      },
    });

  const errors = error && "data" in error ? error.data?.message : {};

  return (
    <div className="p-6">
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              {t("image")}
            </label>
            <InputImage
              defValue={values.image}
              className="w-80 h-auto aspect-[5/3] object-cover"
              onChange={function (e: any): void {
                setFieldValue("image", e);
              }}
            />
            {errors?.image ? (
              <span className="form-error">{errors?.image}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">{t("name")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            {errors?.name ? (
              <span className="form-error">{errors?.name}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">{t("email")}</label>
            <Input
              type="email"
              autoComplete="off"
              placeholder="..."
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            {errors?.email ? (
              <span className="form-error">{errors?.email}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label className="form-label">{t("mobile")}</label>
            <Input
              type="tel"
              autoComplete="off"
              placeholder="..."
              value={values.mobile}
              name="mobile"
              onChange={handleChange}
            />
            {errors?.mobile ? (
              <span className="form-error">{errors?.mobile}</span>
            ) : null}
          </div>

          {!inPOS ? (
            <>
              <div className="form-group">
                <label className="form-label">{t("current-password")}</label>
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="..."
                  value={values.c_password}
                  name="c_password"
                  onChange={handleChange}
                />
                {errors?.c_password ? (
                  <span className="form-error">{errors?.c_password}</span>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">{t("new-password")}</label>
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="..."
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                />
                {errors?.password ? (
                  <span className="form-error">{errors?.password}</span>
                ) : null}
              </div>
            </>
          ) : (
            <Input
              type="tel"
              name={`pin`}
              id={`pin`}
              placeholder="XXXXXX"
              value={values?.pin}
              onChange={handleChange}
              required
              maxLength={6}
              minLength={6}
              max={6}
              min={6}
            />
          )}

          <div className="inline-flex gap-3 flex-wrap">
            <Button type="submit">
              {isSubmitting ? (
                <LoaderIcon className="animate-spin text-white" size={16} />
              ) : (
                <span>{t("save")}</span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
