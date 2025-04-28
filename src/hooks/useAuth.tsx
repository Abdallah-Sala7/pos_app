import { saveUserInfo, storeToken } from "@/store/reducer/auth";
import { useGetUserInfoQuery } from "@/store/server/userApi";
import { authenticationRoutes } from "@/helper/routes";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";

function useAuth(): boolean {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const stored_token = localStorage.getItem("@token");
  const { data, isError, isLoading, isSuccess } =
    useGetUserInfoQuery(undefined);

  const active_branch = localStorage.getItem("@active_branch");

  const handleAuth = async () => {
    if (isSuccess) {
      if (data?.result.profile?.user_type === "cashier") {
        localStorage.setItem(
          "@active_branch",
          data?.result.profile?.pos_device?.store?.id
        );

        dispatch(
          saveUserInfo({
            ...data?.result.profile,
            ...data?.result,
            permissions: data?.result.profile?.pos_device?.permissions,
            active_branch: data?.result.profile?.pos_device?.store?.id,
          })
        );
      } else {
        dispatch(
          saveUserInfo({
            ...data?.result.profile,
            ...data?.result,
            active_branch,
          })
        );
      }

      if (
        authenticationRoutes.some((route: RouteObject) =>
          [route.path].includes(pathname)
        )
      ) {
        navigate("/", {
          replace: true,
        });
        return;
      }

      navigate(pathname, {
        replace: true,
      });
    } else if (isError) {
      localStorage.removeItem("@token");
      localStorage.removeItem("@active_branch");
      if (
        !authenticationRoutes.some((route: RouteObject) =>
          [route.path].includes(pathname)
        )
      ) {
        navigate("/login", {
          replace: true,
        });
      }
    }

    dispatch(storeToken(stored_token));
  };

  useEffect(() => {
    handleAuth();
  }, [isSuccess, isError, data]);

  return isLoading;
}

export default useAuth;
