import MobileInput from "@/components/common/MobileInput";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const Form = ({
  setFieldValue,
  handleChange,
  values,
  errors,
}: {
  setFieldValue: any;
  handleChange: any;
  values: any;
  errors: any;
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">{t("personal-info")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {/* <div className="flex flex-col gap-3 col-span-full">
            <label className="form-label">{t("image")}</label>
            <InputImage
              defValue={values.image}
              onChange={(img) => setFieldValue("image", img)}
              className="w-full h-auto max-w-60 aspect-[5/4]"
            />
            <p className="form-error">{errors?.image}</p>
          </div> */}

          <div className="form-group">
            <label className="form-label">{t("commercial-name")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.name}
              name="name"
              required
              onChange={handleChange}
            />
            {errors?.name && <span className="form-error">{errors?.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">{t("vat-num")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.vat_num}
              name="vat_num"
              onChange={handleChange}
            />
            {errors?.vat_num && (
              <span className="form-error">{errors?.vat_num}</span>
            )}
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
            {errors?.email && (
              <span className="form-error">{errors?.email}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("mobile")}</label>
            <MobileInput
              type="text"
              autoComplete="off"
              name="mobile"
              value={values.mobile}
              onChange={(e) =>
                setFieldValue("mobile", e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            {errors?.mobile && (
              <span className="form-error">{errors?.mobile}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("address")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.address}
              name="address"
              required
              onChange={handleChange}
            />
            {errors?.address && (
              <span className="form-error">{errors?.address}</span>
            )}
          </div>
        </div>
      </Card>

      {/* <Card>
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">{t("contacts")}</h3>

          <Button
            type="button"
            onClick={() =>
              setFieldValue("contacts", [
                ...values.contacts,
                {
                  name: "",
                  mobile: "",
                  email: "",
                  position: "",
                },
              ])
            }
          >
            <UserPlus2Icon />
            <span>{t("add-new")}</span>
          </Button>
        </div>

        <div className="p-5 space-y-6">
          {values?.contacts?.map((item: any, index: number) => (
            <Card
              className="py-0 px-0 !overflow-visible rounded-xl"
              key={index}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap px-4 py-4 bg-muted rounded-t-xl">
                <p className="text-muted-foreground text-base font-bold">
                  {t("contact")} ({index + 1})
                </p>

                <Button
                  type="button"
                  variant="default"
                  size={"icon"}
                  onClick={() => {
                    setFieldValue(
                      "contacts",
                      values.contacts.filter(
                        (_: any, index2: number) => index2 !== index
                      )
                    );
                  }}
                >
                  <Trash2Icon />
                </Button>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="form-group">
                  <label className="form-label">{t("name")}</label>

                  <Input
                    type="text"
                    name={`contacts.${index}.name`}
                    required
                    id={`contacts.${index}.name`}
                    value={item?.name || ""}
                    onChange={handleChange}
                  />

                  {errors?.[`contacts.${index}.name`] ? (
                    <span className="form-error">
                      {errors?.[`contacts.${index}.name`]}
                    </span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className="form-label">{t("job-title")}</label>

                  <Input
                    type="text"
                    name={`contacts.${index}.position`}
                    required
                    id={`contacts.${index}.position`}
                    value={item?.position}
                    onChange={handleChange}
                  />

                  {errors?.[`contacts.${index}.position`] ? (
                    <span className="form-error">
                      {errors?.[`contacts.${index}.position`]}
                    </span>
                  ) : null}
                </div>

                <div className="form-group">
                  <p className="form-label">{t("mobile")}</p>
                  <MobileInput
                    required
                    value={item?.mobile}
                    name={`contacts.${index}.mobile`}
                    onChange={handleChange}
                  />

                  {errors?.[`contacts.${index}.mobile`] ? (
                    <span className="form-error">
                      {errors?.[`contacts.${index}.mobile`]}
                    </span>
                  ) : null}
                </div>

                <div className="form-group">
                  <p className="form-label">{t("email")}</p>
                  <Input
                    type="email"
                    required
                    value={item?.email}
                    name={`contacts.${index}.email`}
                    onChange={handleChange}
                    placeholder="example@example.com"
                  />
                  <p className="form-error">
                    {errors?.[`contacts.${index}.email`]}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card> */}
    </div>
  );
};

export default Form;
