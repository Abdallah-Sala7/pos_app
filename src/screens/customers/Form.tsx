import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const Form = ({
  handleChange,
  values,
  errors,
}: {
  handleChange: any;
  values: any;
  errors: any;
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label">{t("name")}</label>
        <Input
          type="text"
          autoComplete="off"
          placeholder="..."
          name="name"
          value={values.name}
          required
          onChange={handleChange}
        />
        {errors?.name && <span className="form-error">{errors?.name}</span>}
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
        {errors?.email && <span className="form-error">{errors?.email}</span>}
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
        {errors?.mobile && <span className="form-error">{errors?.mobile}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">{t("vat-num")}</label>
        <Input
          type="tel"
          autoComplete="off"
          placeholder="..."
          value={values.vat_num}
          name="vat_num"
          onChange={handleChange}
          minLength={15}
          maxLength={15}
        />
        {errors?.vat_num && (
          <span className="form-error">{errors?.vat_num}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">{t("address")}</label>
        <Input
          type="text"
          autoComplete="off"
          placeholder="..."
          name="address"
          value={values.address}
          required
          onChange={handleChange}
        />
        {errors?.address && (
          <span className="form-error">{errors?.address}</span>
        )}
      </div>

      {/* <div className="form-group">
        <label className="form-label">{t("gender")}</label>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              name="gender"
              value="male"
              onCheckedChange={() => setFieldValue("gender", "male")}
              checked={values.gender === "male"}
              className="w-5 h-5"
            />
            <label className="form-label">{t("male")}</label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              name="gender"
              value="female"
              onCheckedChange={() => setFieldValue("gender", "female")}
              checked={values.gender === "female"}
              className="w-5 h-5"
            />
            <label className="form-label">{t("female")}</label>
          </div>
        </div>
        {errors?.gender && <span className="form-error">{errors?.gender}</span>}
      </div> */}
    </div>
  );
};

export default Form;
