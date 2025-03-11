import Image from "@/components/common/Image";

import { useLoginMutation } from "@/store/server/authApi";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import { saveUserInfo, storeToken } from "@/store/reducer/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loginAction] = useLoginMutation();

  const {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      user_type: "cashier",
      pos_device_code: "",
      pos_device_pin: "",
      user_pin: "",
    },

    onSubmit: async (values) => {
      await loginAction(values)
        .unwrap()
        .then(async (payload) => {
          const stored_token = payload?.result?.access_token;
          const user = payload?.result?.profile;

          localStorage.setItem("@token", stored_token);
          localStorage.setItem("@user", user);

          dispatch(storeToken(stored_token));
          dispatch(saveUserInfo(user));

          navigate("/", {
            replace: true,
          });
        })
        .catch((error) => toast.error(error?.data?.message));
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-20 px-8">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="website logo"
            className="w-48 h-auto mx-auto object-contain"
            width="128"
            height="63"
          />
        </div>

        <Card className="max-w-[500px] mx-auto space-y-4 px-6 py-8">
          <h1 className="font-bold mb-4 text-center text-2xl">
            {t("sign-in")}
          </h1>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <p className="form-label">{t("pos-device-code")}</p>
              <Input
                type="tel"
                name="pos_device_code"
                id="email"
                placeholder="XXXXXX"
                value={values.pos_device_code}
                onChange={handleChange}
                required
                className="rounded-xl h-12"
              />
              <p className="form-error">{errors?.["pos_device_code"]}</p>
            </div>

            <div className="form-group">
              <p className="form-label">{t("pos-device-pin")}</p>

              <InputOTP
                maxLength={4}
                value={values.pos_device_pin}
                disabled={isSubmitting}
                onChange={(value) => setFieldValue("pos_device_pin", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>

              <p className="form-error">{errors?.["pos_device_pin"]}</p>
            </div>

            <div className="form-group">
              <p className="form-label">{t("user-pin")}</p>

              <InputOTP
                maxLength={4}
                value={values.user_pin}
                disabled={isSubmitting}
                onChange={(value) => setFieldValue("user_pin", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>

              <p className="form-error">{errors?.["user_pin"]}</p>
            </div>

            <Button
              size={"lg"}
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl w-full h-12 cursor-pointer"
            >
              <span>{t("sign-in")}</span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
