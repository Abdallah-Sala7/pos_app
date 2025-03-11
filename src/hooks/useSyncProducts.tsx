import { RootState } from "@/store";
import { setProducts } from "@/store/reducer/appSlice";
import { useGetAllProductsMutation } from "@/store/server/productsApi";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function useSyncProducts() {
  const dispatch = useDispatch();

  const [getAllProducts, { isLoading: productsSyncIsLoading }] =
    useGetAllProductsMutation();

  const { user, token } = useSelector((state: RootState) => state.user);

  const handleSync = useCallback(async function () {
    await getAllProducts({
      params: {
        store_id: user?.store?.id,
      },
      token,
    })
      .unwrap()
      .then((res) => {
        localStorage.setItem(
          "@products",
          JSON.stringify(res?.result?.products)
        );

        dispatch(setProducts(res?.result?.products));

        toast.success("Products Synced Successfully");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  }, []);

  return { handleSync, productsSyncIsLoading };
}

export default useSyncProducts;
