import Image from "@/components/common/Image";
import ChangeLanguage from "@/components/common/ChangeLanguage";

import { useLoginMutation } from "@/store/server/authApi";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const LoginCashier = () => {
  const { t } = useTranslation();
  const [loginAction] = useLoginMutation();
  const [users, setUsers] = useState<any>(null);
  const [store, setStore] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.user);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      user_type: "cashier",
      pos_device_code: "",
      pos_device_pin: "",
      user_pin: "",
      user_id: undefined,
      step: 1,
    },

    onSubmit: async (values) => {
      await loginAction(values)
        .unwrap()
        .then(async (payload) => {
          if (values?.step === 1) {
            setUsers(payload?.result?.pos_device?.users);
            setStore(payload?.result?.pos_device?.store);
            setFieldValue(
              "user_id",
              payload?.result?.pos_device?.users?.[0]?.id
            );
            setFieldValue("step", 2);
          } else {
            localStorage.setItem("@token", payload?.result?.access_token);
            window.location.replace("/");
          }
        })
        .catch((error) => toast.error(error?.data?.message));
    },
  });

  useEffect(() => {
    if (user?.pos_device && values?.step === 1) {
      setFieldValue("pos_device_code", user?.pos_device?.code);
      setFieldValue("pos_device_pin", user?.pos_device?.pin);
      setFieldValue("user_id", user?.pos_device?.users?.[0]?.id);
      setFieldValue("step", 2);
      setUsers(user?.pos_device?.users);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/logo.png"
        alt="website logo"
        className="w-56 h-auto object-contain"
        width="128"
        height="63"
      />

      <div className="py-8 px-8 w-full">
        <Card className="relative max-w-xl mx-auto space-y-4 px-6 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {store && values?.step === 2 && (
              <Image
                src={store?.logo}
                alt={store?.commercial_name}
                className="w-16 h-16 rounded-full"
              />
            )}

            <h1 className="font-bold text-center text-2xl">
              {store && values?.step === 2
                ? store?.commercial_name
                : t("sign-in")}
            </h1>
          </div>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            {values?.step === 1 ? (
              <>
                <div className="form-group">
                  <p className="form-label">{t("pos-device-code")}</p>
                  <Input
                    type="tel"
                    name="pos_device_code"
                    id="email"
                    placeholder="XXXXXXXXXX"
                    value={values.pos_device_code}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    minLength={10}
                    max={10}
                    min={10}
                  />
                  <p className="form-error">{errors?.["pos_device_code"]}</p>
                </div>

                <div className="form-group">
                  <p className="form-label">{t("pos-device-pin")}</p>
                  <Input
                    type="tel"
                    name="pos_device_pin"
                    id="email"
                    placeholder="XXXXXX"
                    value={values.pos_device_pin}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    minLength={6}
                    max={6}
                    min={6}
                  />
                  <p className="form-error">{errors?.["pos_device_pin"]}</p>
                </div>

                <Button
                  size={"lg"}
                  type="submit"
                  className="pt-2"
                  disabled={isSubmitting}
                >
                  <span>{t("sign-in")}</span>
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-4 items-center flex-wrap">
                  {users?.map((user: any) => (
                    <button
                      type="button"
                      key={user?.id}
                      className="flex flex-col justify-center items-center gap-1.5"
                      onClick={() => setFieldValue("user_id", user?.id)}
                    >
                      <Image
                        src={user?.image}
                        alt={user?.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <p
                        className={cn(
                          "text-center",
                          user?.id === values?.user_id && "text-primary"
                        )}
                      >
                        {user?.name}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 items-end">
                  <div className="form-group flex-1">
                    <p className="form-label">{t("user-pin")}</p>
                    <Input
                      type="tel"
                      name="user_pin"
                      id="email"
                      placeholder="XXXXXX"
                      value={values.user_pin}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      minLength={4}
                      max={6}
                      min={4}
                    />
                    <p className="form-error">{errors?.["user_pin"]}</p>
                  </div>

                  <Button size={"lg"} type="submit" disabled={isSubmitting}>
                    <span>{t("sign-in")}</span>
                  </Button>
                </div>

                <Button
                  size={"lg"}
                  type="button"
                  variant={"outlineDestructive"}
                  className="flex absolute top-0 start-2 border-0"
                  onClick={() => resetForm()}
                >
                  <span>{t("logout")}</span>
                </Button>
              </>
            )}
          </form>
        </Card>
      </div>

      <ChangeLanguage hasTxt />
    </div>
  );
};

export default LoginCashier;
