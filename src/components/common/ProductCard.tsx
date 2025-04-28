import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { t } from "i18next";

import PriceInput from "./PriceInput";
import CurrencyFormate from "./CurrencyFormate";

const ProductCard = ({
  product,
  formValues,
  setFieldValue,
}: {
  product: any;
  formValues: any;
  setFieldValue: any;
}) => {
  const valIdx = formValues?.products?.findIndex(
    (item: any) => item?.id === product?.id
  );

  return (
    <Card>
      {/* <div>
        <Image
          src={product.image}
          alt={product?.["_tr_name"] || product?.name_en}
          title={product?.["_tr_name"] || product?.name_en}
          className="w-full h-auto aspect-[4/2.5] object-contain max-h-36 bg-gray-100"
        />
      </div> */}

      <CardContent className="p-3 space-y-4">
        <div>
          <h2 className="text-base font-semibold">
            {product?.["_tr_name"] || product?.name_en}
          </h2>

          <p className="text-sm font-semibold text-muted-foreground">
            <CurrencyFormate amount={product?.price} />
          </p>
        </div>

        {valIdx >= 0 ? (
          <PriceInput
            value={formValues?.products[valIdx]?.price}
            onChange={(val) => {
              setFieldValue(`products.${valIdx}.price`, val);
            }}
          />
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              setFieldValue("products", [
                ...(formValues?.products || []),
                {
                  ...product,
                  qty: 1,
                  weight: 1,
                },
              ]);
            }}
          >
            <span>{t("add")}</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
