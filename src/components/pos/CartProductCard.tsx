import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import CurrencyFormate from "../common/CurrencyFormate";

const CartProductCard = ({
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
    <div className="space-y-3 py-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">
          {product?.product?.main_product?.["_tr_name"] ||
            product?.product?.main_product?.name_en}
        </h2>

        <p className="text-xs font-semibold text-muted-foreground">
          <CurrencyFormate
            iconSize={14}
            amount={product?.product?.main_product?.price}
          />
        </p>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Button
            size={"icon"}
            className="w-7 h-7 [&_svg]:w-3 [&_svg]:h-3"
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

          <div className="text-xs font-semibold normal-nums w-3 text-center">
            {product?.qty}
          </div>

          <Button
            size={"icon"}
            className="w-7 h-7 [&_svg]:w-3 [&_svg]:h-3"
            variant={"outline"}
            onClick={() => {
              product?.qty <= 1
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

        <CurrencyFormate
          amount={String(product?.product?.main_product?.price * product?.qty)}
        />
      </div>
    </div>
  );
};

export default CartProductCard;
