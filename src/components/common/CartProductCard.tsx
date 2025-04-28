import CurrencyFormate from "./CurrencyFormate";
import CartCounter from "@/components/common/CartCounter";

const CartProductCard = ({
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
    <div className="flex gap-3">
      {/* <Image
        src={product?.product?.main_product?.image}
        alt={
          product?.product?.main_product?.["_tr_name"] ||
          product?.product?.main_product?.name_en
        }
        className="w-24 h-auto object-cover rounded-md"
      /> */}

      <div className="flex-1 space-y-4 py-1.5">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            {product?.product?.main_product?.["_tr_name"] ||
              product?.product?.main_product?.name_en ||
              product?.name}
          </h2>

          <p className="text-xs font-semibold text-muted-foreground">
            <CurrencyFormate
              iconSize={14}
              amount={product?.product?.price || product?.price}
            />
          </p>
        </div>

        <div className="flex items-center justify-between gap-6">
          <CartCounter
            product={product}
            formValues={formValues}
            setFieldValue={setFieldValue}
            valIdx={valIdx}
          />

          <CurrencyFormate
            amount={String(
              (product?.product?.price || product?.price || 0) * product?.qty
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
