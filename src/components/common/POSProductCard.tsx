import CurrencyFormate from "./CurrencyFormate";
import { cn } from "@/lib/utils";
import Image from "./Image";

const POSProductCard = ({
  product,
  formValues,
  setFieldValue,
  showProductImage,
}: {
  product: any;
  formValues: any;
  setFieldValue: any;
  showProductImage?: boolean;
}) => {
  const isAdded = formValues?.products?.some(
    (item: any) => item?.id === product?.id
  );

  return (
    <button
      className={cn(
        "h-auto text-start flex flex-col justify-between border rounded-lg",
        isAdded && "border-primary"
      )}
      onClick={() => {
        if (!isAdded) {
          setFieldValue("products", [
            ...formValues?.products,
            {
              qty: 1,
              weight: 1,
              id: product?.id,
              product,
            },
          ]);
        }
      }}
    >
      {showProductImage && (
        <Image
          src={product.image}
          alt={
            product?.main_product?.["_tr_name"] ||
            product?.main_product?.name_en
          }
          className="w-full h-40 object-cover"
        />
      )}
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold">
          {product?.["_tr_name"] || product?.name_ar || product?.name_en}
        </h2>

        <p className="font-semibold text-muted-foreground">
          <CurrencyFormate amount={product?.price} />
        </p>
      </div>
    </button>

    // <Card>
    //  <div>

    //   </div>

    //   <CardContent className="p-3 space-y-4">
    //     <div>
    //       <h2 className="text-base font-semibold">
    //         {product?.main_product?.["_tr_name"] ||
    //           product?.main_product?.name_en}
    //       </h2>

    //       <p className="text-sm font-semibold text-muted-foreground">
    //         <CurrencyFormate amount={product?.main_product?.price} />
    //       </p>
    //     </div>

    //     {valIdx >= 0 ? (
    //       <div className="flex items-center justify-between gap-4">
    //         <div className="flex items-center justify-between gap-3 bg-muted p-1 rounded-full">
    //           <Button
    //             size={"icon"}
    //             className="w-8 h-8"
    //             onClick={() => {
    //               setFieldValue("products", [
    //                 ...formValues?.products.slice(0, valIdx),
    //                 {
    //                   ...formValues?.products[valIdx],
    //                   qty: formValues?.products[valIdx]?.qty + 1,
    //                   weight: formValues?.products[valIdx]?.weight + 1,
    //                 },
    //                 ...formValues?.products.slice(valIdx + 1),
    //               ]);
    //             }}
    //           >
    //             <PlusIcon />
    //           </Button>

    //           <div className="text-sm font-semibold normal-nums w-10 text-center">
    //             {itemQty}
    //           </div>

    //           <Button
    //             size={"icon"}
    //             className="w-8 h-8"
    //             variant={"outline"}
    //             onClick={() => {
    //               itemQty <= 1
    //                 ? setFieldValue(
    //                     "products",
    //                     formValues?.products?.filter(
    //                       (item: any) => item?.id !== product?.id
    //                     )
    //                   )
    //                 : setFieldValue("products", [
    //                     ...formValues?.products.slice(0, valIdx),
    //                     {
    //                       ...formValues?.products[valIdx],
    //                       qty: formValues?.products[valIdx]?.qty - 1,
    //                       weight: formValues?.products[valIdx]?.weight - 1,
    //                     },
    //                     ...formValues?.products.slice(valIdx + 1),
    //                   ]);
    //             }}
    //           >
    //             <MinusIcon />
    //           </Button>
    //         </div>

    //         <Button
    //           size={"icon"}
    //           variant={"destructive"}
    //           onClick={() => {
    //             setFieldValue(
    //               "products",
    //               formValues?.products?.filter(
    //                 (item: any) => item?.id !== product?.id
    //               )
    //             );
    //           }}
    //         >
    //           <Trash2Icon />
    //         </Button>
    //       </div>
    //     ) : (
    //       <Button
    //         className="w-full"
    //         onClick={() => {
    //           setFieldValue("products", [
    //             ...formValues?.products,
    //             {
    //               qty: 1,
    //               weight: 1,
    //               id: product?.id,
    //               product,
    //             },
    //           ]);
    //         }}
    //       >
    //         <span>Buy Now</span>
    //       </Button>
    //     )}
    //   </CardContent>
    // </Card>
  );
};

export default POSProductCard;
