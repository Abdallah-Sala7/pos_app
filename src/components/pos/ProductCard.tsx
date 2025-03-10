import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import CurrencyFormate from "../common/CurrencyFormate";

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

  const itemQty = formValues?.products[valIdx]?.qty;

  return (
    <Card className="p-0">
      <CardContent className="p-3 space-y-4">
        <div>
          <h2 className="text-base font-semibold">
            {product?.main_product?.["_tr_name"] ||
              product?.main_product?.name_en}
          </h2>

          <p className="text-sm font-semibold text-muted-foreground">
            <CurrencyFormate amount={product?.main_product?.price} />
          </p>
        </div>

        {valIdx >= 0 ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-between gap-3 bg-muted p-1 rounded-full">
              <Button
                size={"icon"}
                className="w-8 h-8"
                onClick={() => {
                  setFieldValue("products", [
                    ...formValues?.products.slice(0, valIdx),
                    {
                      ...formValues?.products[valIdx],
                      qty: formValues?.products[valIdx]?.qty + 1,
                    },
                    ...formValues?.products.slice(valIdx + 1),
                  ]);
                }}
              >
                <PlusIcon />
              </Button>

              <div className="text-sm font-semibold normal-nums w-10 text-center">
                {itemQty}
              </div>

              <Button
                size={"icon"}
                className="w-8 h-8"
                variant={"outline"}
                onClick={() => {
                  itemQty <= 1
                    ? setFieldValue(
                        "products",
                        formValues?.products?.filter(
                          (item: any) => item?.id !== product?.id
                        )
                      )
                    : setFieldValue("products", [
                        ...formValues?.products.slice(0, valIdx),
                        {
                          ...formValues?.products[valIdx],
                          qty: formValues?.products[valIdx]?.qty - 1,
                        },
                        ...formValues?.products.slice(valIdx + 1),
                      ]);
                }}
              >
                <MinusIcon />
              </Button>
            </div>

            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                setFieldValue(
                  "products",
                  formValues?.products?.filter(
                    (item: any) => item?.id !== product?.id
                  )
                );
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              setFieldValue("products", [
                ...formValues?.products,
                {
                  qty: 1,
                  id: product?.id,
                  product,
                },
              ]);
            }}
          >
            <span>Buy Now</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
