import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { POS_PERMISSIONS } from "@/constant";

import ProductPOS from "./ProductPOS";
import BarcodePOS from "./BarcodePOS";

const POSPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user?.pos_device?.permissions?.includes(POS_PERMISSIONS.QR_CODE)) {
    return <BarcodePOS />;
  } else {
    return <ProductPOS />;
  }
};

export default POSPage;
