import { useTranslation } from "react-i18next";
import PackageSizeInput from "./PackageSizeInput";
import { useGetCategoriesQuery } from "@/store/server/categoriesApi";
import { Card } from "@/components/ui/card";
import InputImage from "@/components/common/InputImage";
import SelectItem from "@/components/common/SelectItem";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PriceInput from "@/components/common/PriceInput";
import { Checkbox } from "@/components/ui/checkbox";

const ProductForm = ({
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

  const { data: categories } = useGetCategoriesQuery({
    params: {
      is_active: 1,
    },
  });

  // const { data: options } = useGetOptionsQuery({
  //   params: {
  //     is_active: 1,
  //   },
  // });

  return (
    <div className="space-y-6">
      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">{t("product-details")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="unit_type"
                name="unit_type"
                checked={values.unit_type === "weight"}
                className="w-5 h-5"
                onCheckedChange={(val) =>
                  setFieldValue("unit_type", val ? "weight" : "normal")
                }
                disabled={values?.id}
              />

              <label
                htmlFor="unit_type"
                className="flex flex-col cursor-pointer"
              >
                <span className="font-semibold">{t("is-weight")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("is-weight-desc")}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="is_purchasable"
                name="is_purchasable"
                checked={values.is_purchasable === 1}
                className="w-5 h-5"
                onCheckedChange={(val) =>
                  setFieldValue("is_purchasable", val ? 1 : 0)
                }
                disabled={values?.id}
              />

              <label
                htmlFor="is_purchasable"
                className="flex flex-col cursor-pointer"
              >
                <span className="font-semibold">{t("purchasable")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("is-purchasable-desc")}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="is_sellable"
                name="is_sellable"
                checked={values.is_sellable === 1}
                className="w-5 h-5"
                onCheckedChange={(val) =>
                  setFieldValue("is_sellable", val ? 1 : 0)
                }
                disabled={values?.id}
              />

              <label
                htmlFor="is_sellable"
                className="flex flex-col cursor-pointer"
              >
                <span className="font-semibold">{t("sellable")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("is-sellable-desc")}
                </span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t("ar-name")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              value={values.name_ar}
              name="name_ar"
              onChange={handleChange}
              required
            />
            {errors?.name_ar && (
              <span className="form-error">{errors?.name_ar}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("en-name")}</label>
            <Input
              type="text"
              autoComplete="off"
              placeholder="..."
              name="name_en"
              value={values.name_en}
              onChange={handleChange}
            />
            {errors?.name_en && (
              <span className="form-error">{errors?.name_en}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("price")}</label>

            <PriceInput
              value={values.sale_price}
              required
              onChange={(val) => {
                setFieldValue(`sale_price`, val);
              }}
            />

            {errors?.sale_price && (
              <span className="form-error">{errors?.sale_price}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">{t("cost")}</label>

            <PriceInput
              value={values.cost}
              onChange={(val) => {
                setFieldValue(`cost`, val);
              }}
            />

            {errors?.cost && <span className="form-error">{errors?.cost}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">{t("category")}</label>

            <SelectItem
              items={categories?.result?.categories || []}
              setValue={(val: any) => {
                setFieldValue("category_id", val.id);
                setFieldValue("category", val);
              }}
              value={values.category}
            />

            {errors?.category_id && (
              <span className="form-error">{errors?.category_id}</span>
            )}
          </div>

          {values.unit_type === "weight" ? (
            <div className="form-group">
              <label className="form-label">{t("item-code")}</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="..."
                name={"item_code"}
                value={values.item_code}
                onChange={handleChange}
              />

              {errors?.item_code && (
                <span className="form-error">{errors?.item_code}</span>
              )}
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">{t("barcode")}</label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="..."
                name={"barcode"}
                value={values.barcode}
                onChange={handleChange}
              />

              {errors?.barcode && (
                <span className="form-error">{errors?.barcode}</span>
              )}
            </div>
          )}

          {/* <div className="form-group col-span-full">
            <label className="form-label">{t("branches")}</label>

            <SelectMulti
              items={
                stores?.result?.stores?.map((v: any) => ({
                  id: v.id,
                  name: v.name_en,
                  alt_name: v.name_ar,
                })) || []
              }
              setValue={(val) => {
                setFieldValue("stores", val);
                setFieldValue(
                  "store_ids",
                  val.map((v: any) => v.id)
                );
              }}
              values={values?.stores || []}
            />

            {errors?.store_ids && (
              <span className="form-error">{errors?.store_ids}</span>
            )}
          </div> */}
        </div>
      </Card>

      {/* <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">{t("options")}</h3>

          <Button
            type="button"
            onClick={() => {
              setFieldValue("options", [
                ...(values?.options || []),
                { name_ar: "", name_en: "", values: [] },
              ]);
            }}
          >
            {t("add-option")}
          </Button>
        </div>

        <div className="p-5 space-y-4">
          {values?.options?.map((item: any, index: number) => (
            <div className="bg-gray-50 space-y-5 rounded-md p-5" key={index}>
              <div className="flex justify-between items-center gap-4 pb-4 border-b">
                <h3 className="font-semibold">
                  {t("option")} ({index + 1})
                </h3>

                <Button
                  type="button"
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() =>
                    setFieldValue(
                      "options",
                      values.options.filter((_: any, i: number) => i !== index)
                    )
                  }
                >
                  <Icon icon={"material-symbols:delete-outline"} width={20} />
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="form-group flex-1">
                  <label htmlFor="form-label">
                    {t("ar-name")} ({index + 1})
                  </label>

                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="..."
                    name={"options." + index + ".name_ar"}
                    value={item.name_ar}
                    onChange={handleChange}
                  />
                  {errors?.options?.[index]?.name_ar && (
                    <span className="form-error">
                      {errors?.options?.[index]?.name_ar}
                    </span>
                  )}
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="form-label">
                    {t("en-name")} ({index + 1})
                  </label>

                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="..."
                    name={"options." + index + ".name_en"}
                    value={item.name_en}
                    onChange={handleChange}
                  />
                  {errors?.options?.[index]?.name_en && (
                    <span className="form-error">
                      {errors?.options?.[index]?.name_en}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 rounded-md">
                <div className="flex justify-between items-center gap-4 p-4 border-b">
                  <h3 className="font-semibold">
                    {t("values")} {t("option")} ({index + 1})
                  </h3>

                  <Button
                    type="button"
                    onClick={() => {
                      let subItemVal = {
                        ...values,
                      };

                      delete subItemVal?.sub_products;

                      setFieldValue(`options.${index}.values`, [
                        ...item?.values,
                        { name_ar: "", name_en: "" },
                      ]);

                      setFieldValue(`sub_products.${values?.sub_products?.length}`, {
                        ...subItemVal,
                        name_ar: `${subItemVal?.name_ar} ${item?.name_ar}`,
                        name_en: `${subItemVal?.name_en} ${item?.name_en}`,
                        optionId: `id_${index}_${item?.values?.length}`,
                        item_type: "product",
                        package_size: 1,
                        type: "package",
                      });
                    }}
                  >
                    {t("add-value")}
                  </Button>
                </div>

                <div className="p-4 space-y-4">
                  {!item?.values?.length ? (
                    <div className="max-w-sm mx-auto p-4">
                      <p className="text-center text-gray-500 text-sm">
                        {t("no-values-found")}
                      </p>
                    </div>
                  ) : (
                    item?.values?.map((value: any, valIdx: number) => {
                      const productOptionIdx = values?.sub_products?.findIndex(
                        (item: any) =>
                          item?.optionId === `id_${index}_${valIdx}`
                      );

                      return (
                        <div key={valIdx} className="flex gap-4">
                          <div className="form-group flex-1">
                            <label htmlFor="form-label">
                              {t("ar-name")} ({valIdx + 1})
                            </label>
                            <Input
                              type="text"
                              autoComplete="off"
                              placeholder="..."
                              name={
                                "options." +
                                index +
                                ".values." +
                                valIdx +
                                ".name_ar"
                              }
                              value={value.name_ar}
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue(
                                  `sub_products.${productOptionIdx}.name_ar`,
                                  `${values.name_en} ${values?.options?.[index]?.name_ar} ${e.target.value}`
                                );
                              }}
                            />
                            {errors?.options?.[index]?.values?.[valIdx]
                              ?.name_ar && (
                              <span className="form-error">
                                {
                                  errors?.options?.[index]?.values?.[valIdx]
                                    ?.name_ar
                                }
                              </span>
                            )}
                          </div>

                          <div className="form-group flex-1">
                            <label htmlFor="form-label">
                              {t("en-name")} ({valIdx + 1})
                            </label>
                            <Input
                              type="text"
                              autoComplete="off"
                              placeholder="..."
                              name={
                                "options." +
                                index +
                                ".values." +
                                valIdx +
                                ".name_en"
                              }
                              value={value.name_en}
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue(
                                  `sub_products.${productOptionIdx}.name_en`,
                                  `${values.name_en} ${values?.options?.[index]?.name_en} ${e.target.value}`
                                );
                              }}
                            />
                            {errors?.options?.[index]?.values?.[valIdx]
                              ?.name_en && (
                              <span className="form-error">
                                {
                                  errors?.options?.[index]?.values?.[valIdx]
                                    ?.name_en
                                }
                              </span>
                            )}
                          </div>

                          <div className="flex-1 max-w-[44px] flex items-end">
                            <Button
                              type="button"
                              size={"icon"}
                              variant={"destructive"}
                              onClick={() => {
                                setFieldValue(
                                  `options.${index}.values`,
                                  values?.options?.[index]?.values?.filter(
                                    (_: any, i: number) => i !== index
                                  )
                                );

                                setFieldValue(
                                  `sub_products`,
                                  values?.sub_products?.filter(
                                    (item: any) =>
                                      item?.optionId !== `id_${index}_${valIdx}`
                                  )
                                );
                              }}
                            >
                              <Icon
                                icon={"material-symbols:delete-outline"}
                                width={22}
                              />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ))}

          {!values?.options?.length && (
            <div className="max-w-sm mx-auto p-4">
              <p className="text-center text-gray-500 text-sm">
                {t("no-options")}
              </p>
            </div>
          )}
        </div>
      </Card> */}

      {/* <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">
            {t("included-options")}{" "}
            <span className="text-muted-foreground text-base">
              ({t("optional")})
            </span>
          </h3>
        </div>

        <div className="p-5 space-y-4">
          {values?.included_options?.map((_: any, i: number) => (
            <div
              className="col-span-full flex items-end gap-2"
              key={i + "_" + values?.included_options?.length}
            >
              <div className="form-group flex-1">
                <label className="form-label">
                  {t("options")} ({i + 1})
                </label>

                <SelectItem
                  items={options?.result?.options || []}
                  setValue={(val: any) => {
                    setFieldValue(`included_options[${i}].id`, val.id);
                    setFieldValue(`included_options[${i}].option`, val);
                  }}
                  value={values.included_options[i].option}
                />

                {errors?.[`included_options[${i}].id`] && (
                  <span className="form-error">
                    {errors?.[`included_options[${i}].id`]}
                  </span>
                )}
              </div>

              <div className="form-group flex-1">
                <label className="form-label">{t("price")}</label>

                <PriceInput
                  value={values?.included_options[i]?.price}
                  className="!min-w-[250px]"
                  onChange={(val) => {
                    setFieldValue(`included_options[${i}].price`, val);
                  }}
                />

                {errors?.[`included_options[${i}].price`] && (
                  <span className="form-error">
                    {errors?.[`included_options[${i}].price`]}
                  </span>
                )}
              </div>

              <div className="shrink-0">
                {i < values?.included_options?.length - 1 ? (
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => {
                      const options = values?.included_options || [];
                      options.splice(i, 1);
                      setFieldValue("included_options", options);
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      setFieldValue("included_options", [
                        ...(values?.included_options || []),
                        {
                          id: undefined,
                          option: undefined,
                          price: undefined,
                        },
                      ]);
                    }}
                  >
                    <PlusIcon />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {!values?.included_options?.length && (
            <div className="max-w-sm mx-auto p-4">
              <p className="text-center text-gray-500 text-sm">
                {t("no-options")}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">
            {t("excluded-options")}{" "}
            <span className="text-muted-foreground text-base">
              ({t("optional")})
            </span>
          </h3>
        </div>

        <div className="p-5 space-y-4">
          {values?.excluded_options?.map((_: any, i: number) => (
            <div
              className="col-span-full flex items-end gap-2"
              key={i + "_" + values?.excluded_options?.length}
            >
              <div className="form-group flex-1">
                <label className="form-label">
                  {t("options")} ({i + 1})
                </label>

                <SelectItem
                  items={options?.result?.options || []}
                  setValue={(val: any) => {
                    setFieldValue(`excluded_options[${i}].id`, val.id);
                    setFieldValue(`excluded_options[${i}].option`, val);
                  }}
                  value={values.excluded_options[i].option}
                />

                {errors?.[`excluded_options[${i}].id`] && (
                  <span className="form-error">
                    {errors?.[`excluded_options[${i}].id`]}
                  </span>
                )}
              </div>

              <div className="shrink-0">
                {i < values?.excluded_options?.length - 1 ? (
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => {
                      const options = values?.excluded_options || [];
                      options.splice(i, 1);
                      setFieldValue("excluded_options", options);
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      setFieldValue("excluded_options", [
                        ...(values?.excluded_options || []),
                        {
                          id: undefined,
                          option: undefined,
                          price: undefined,
                        },
                      ]);
                    }}
                  >
                    <PlusIcon />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {!values?.included_options?.length && (
            <div className="max-w-sm mx-auto p-4">
              <p className="text-center text-gray-500 text-sm">
                {t("no-options")}
              </p>
            </div>
          )}
        </div>
      </Card> */}

      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">
            {t("sub-products")}{" "}
            <span className="text-muted-foreground text-base">
              ({t("optional")})
            </span>
          </h3>
        </div>

        <div className="p-5">
          {/* <h4 className="mb-1 text-base font-semibold">{t("package-sizes")}</h4>
          <p className="mb-4 text-sm text-gray-500">
            {t("package-sizes-desc")}
          </p> */}

          <PackageSizeInput
            onChange={(e: any) => {
              let subItemVal = { ...values };
              delete subItemVal?.sub_products;

              let optionsValues = [];

              for (const option of values?.options || []) {
                for (const value of option?.values) {
                  optionsValues.push({ option, value });
                }
              }

              if (optionsValues?.length) {
                setFieldValue("sub_products", [
                  ...(values?.sub_products || []),
                  ...(optionsValues || [])?.map((val: any) => {
                    return {
                      ...subItemVal,
                      item_type: "product",
                      type: "package",
                      tag: e[e.length - 1],
                      package_size: isNaN(e[e.length - 1])
                        ? 1
                        : e[e.length - 1],

                      name: `${values.name_ar} ${val?.option?.name_ar} ${
                        val?.value?.name_ar
                      } ${e[e.length - 1]}`,
                    };
                  }),
                ]);
              } else {
                setFieldValue("sub_products", [
                  ...(values?.sub_products || []),
                  {
                    ...subItemVal,

                    type: "package",
                    tag: e[e.length - 1],
                    item_type: "product",
                    package_size: isNaN(e[e.length - 1]) ? 1 : e[e.length - 1],

                    name_ar: `${values?.name_ar || ""} ${e[e.length - 1]}`,
                    name_en: `${values?.name_en || ""} ${e[e.length - 1]}`,
                  },
                ]);
              }
            }}
            values={
              values?.sub_products?.map((item: any) => item.name_ar) || []
            }
            onRemove={(tag: string) => {
              setFieldValue(
                "sub_products",
                values?.sub_products?.filter(
                  (item: any) => (item.tag || item.name_ar) !== tag
                )
              );
            }}
          />
        </div>

        <div className="p-5 pt-0">
          <Card className="shadow-none">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("ar-name")}</TableHead>
                  <TableHead>{t("en-name")}</TableHead>
                  <TableHead>{t("price")}</TableHead>
                  <TableHead>
                    {values.unit_type === "weight"
                      ? t("item-code")
                      : t("barcode")}
                  </TableHead>
                  <TableHead>{t("cost")}</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {values?.sub_products?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="!px-2">
                      <div className="form-group">
                        <Input
                          type="text"
                          autoComplete="off"
                          placeholder="..."
                          className="!min-w-[250px]"
                          name={"sub_products." + index + ".name_ar"}
                          value={item.name_ar}
                          onChange={handleChange}
                          required
                        />

                        {errors?.[`sub_products.${index}.name_ar`] && (
                          <span className="form-error">
                            {errors?.[`sub_products.${index}.name_ar`]}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="!px-2">
                      <div className="form-group">
                        <Input
                          type="text"
                          autoComplete="off"
                          placeholder="..."
                          className="!min-w-[250px]"
                          name={"sub_products." + index + ".name_en"}
                          value={item.name_en}
                          onChange={handleChange}
                          required
                        />

                        {errors?.[`sub_products.${index}.name_en`] && (
                          <span className="form-error">
                            {errors?.[`sub_products.${index}.name_en`]}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="!px-2">
                      <div className="form-group">
                        <PriceInput
                          value={item.sale_price}
                          className="!min-w-[250px]"
                          onChange={(val) => {
                            setFieldValue(
                              `sub_products.${index}.sale_price`,
                              val
                            );
                          }}
                        />

                        {errors?.[`sub_products.${index}.sale_price`] && (
                          <span className="form-error">
                            {errors?.[`sub_products.${index}.sale_price`]}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="!px-2">
                      {values.unit_type === "weight" ? (
                        <div className="form-group">
                          <Input
                            type="text"
                            autoComplete="off"
                            placeholder="..."
                            className="!min-w-[250px]"
                            name={"sub_products." + index + ".item_code"}
                            value={item.item_code}
                            onChange={handleChange}
                          />
                          {errors?.[`sub_products.${index}.item_code`] && (
                            <span className="form-error">
                              {errors?.[`sub_products.${index}.item_code`]}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="form-group">
                          <Input
                            type="text"
                            autoComplete="off"
                            placeholder="..."
                            className="!min-w-[250px]"
                            name={"sub_products." + index + ".barcode"}
                            value={item.barcode}
                            onChange={handleChange}
                          />

                          {errors?.[`sub_products.${index}.barcode`] && (
                            <span className="form-error">
                              {errors?.[`sub_products.${index}.barcode`]}
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="!px-2">
                      <div className="form-group">
                        <PriceInput
                          value={item.sale_cost}
                          className="!min-w-[250px]"
                          onChange={(val) => {
                            setFieldValue(
                              `sub_products.${index}.sale_cost`,
                              val
                            );
                          }}
                        />

                        {errors?.[`sub_products.${index}.sale_cost`] && (
                          <span className="form-error">
                            {errors?.[`sub_products.${index}.sale_cost`]}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {!values?.sub_products?.length ? (
                  <TableRow>
                    <TableCell colSpan={100}>
                      <div className="max-w-sm mx-auto p-4">
                        <p className="text-center text-gray-500 whitespace-normal text-sm">
                          {t("no-sub-products")}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Card>

      <Card className="!p-0">
        <div className="flex justify-between items-center gap-4 p-5 border-b">
          <h3 className="text-lg font-semibold">
            {t("attachments")}{" "}
            <span className="text-muted-foreground text-base">
              ({t("optional")})
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="form-group col-span-full">
            <label className="form-label">{t("product-image")}</label>

            <InputImage
              defValue={values.image}
              onChange={(value) => setFieldValue("image", value)}
              className="w-full max-w-64 aspect-[5/3] h-auto"
            />

            {errors?.image && (
              <span className="form-error">{errors?.image}</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductForm;
