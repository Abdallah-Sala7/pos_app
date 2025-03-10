import { saveUserInfo, storeToken } from "@/store/reducer/auth";
import { authenticationRoutes } from "@/helper/routes";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { setProducts } from "@/store/reducer/appSlice";

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const stored_token = localStorage.getItem("@token");
  const user = localStorage.getItem("@user");
  const products = localStorage.getItem("@products");

  useEffect(() => {
    const handleAuth = async () => {
      if (stored_token) {
        if (
          authenticationRoutes.some((route: RouteObject) =>
            [route.path].includes(pathname)
          )
        ) {
          return navigate("/", {
            replace: true,
          });
        }

        navigate(pathname, {
          replace: true,
        });
      } else {
        navigate("/login", {
          replace: true,
        });
      }

      dispatch(storeToken(stored_token));
      dispatch(saveUserInfo(user));
      dispatch(setProducts(JSON.parse(products || "[]")));
    };

    handleAuth();
  }, [stored_token]);

  return null;
}

export default useAuth;
