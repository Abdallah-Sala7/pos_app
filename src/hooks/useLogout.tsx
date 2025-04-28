import { useCallback } from "react";

export default function useLogout() {
  const handleLogged = useCallback(async function () {
    localStorage.removeItem("@token");
    localStorage.removeItem("@stored_products");
    window.location.href = "/login";
  }, []);

  return { handleLogged };
}
