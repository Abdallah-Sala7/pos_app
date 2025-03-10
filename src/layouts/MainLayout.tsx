import useAuth from "@/hooks/useAuth";
import LoadingPage from "@/components/common/LoadingPage";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { i18n } = useTranslation();

  const isLoading = useAuth();

  useEffect(() => {
    document
      .querySelector("html")
      ?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    document.querySelector("html")?.setAttribute("lang", i18n.language);
  }, [i18n]);

  if (isLoading) return <LoadingPage />;

  return <Outlet />;
};

export default MainLayout;
