import NumberInput from "./NumberInput";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

const CartCounter = ({
  product,
  formValues,
  setFieldValue,
  valIdx,
}: {
  product: any;
  formValues: any;
  setFieldValue: any;
  valIdx: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        size={"icon"}
        type="button"
        className="w-7 h-7 [&_svg]:w-3 [&_svg]:h-3"
        onClick={() => {
          setFieldValue(`products.${valIdx}`, {
            ...product,
            qty: product?.qty + 1,
          });
        }}
      >
        <PlusIcon />
      </Button>

      <NumberInput
        value={product?.qty}
        className="px-0 py-0 border-none text-xs font-semibold normal-nums w-14 text-center"
        onChange={(qty) => {
          setFieldValue(`products.${valIdx}`, {
            ...product,
            qty: Number(qty) > 0 ? qty : 1,
          });
        }}
      />

      <Button
        size={"icon"}
        type="button"
        className="w-7 h-7 [&_svg]:w-3 [&_svg]:h-3"
        variant={"outline"}
        onClick={() => {
          product?.qty <= 1
            ? setFieldValue(
                "products",
                formValues?.products?.filter(
                  (_: any, index: number) => index !== valIdx
                )
              )
            : setFieldValue(`products.${valIdx}`, {
                ...product,
                qty: product?.qty + 1,
              });
        }}
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default CartCounter;
