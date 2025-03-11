import { Card, CardContent } from "../ui/card";
import CurrencyFormate from "../common/CurrencyFormate";
import { cn } from "@/lib/utils";

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
    <button
      className={"text-start cursor-pointer h-auto"}
      onClick={() => {
        if (valIdx !== -1) return;
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
      <Card className={cn("p-0 shadow-sm h-full", valIdx !== -1 && "bg-primary/5")}>
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
        </CardContent>
      </Card>
    </button>
  );
};

export default ProductCard;
