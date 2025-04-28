import { Outlet, useLocation, useNavigate } from "react-router-dom";
import POSHeader from "./POSHeader";
import useAuth from "@/hooks/useAuth";
import LoadingPage from "@/components/common/LoadingPage";
import { useEffect, useMemo } from "react";

const POSLayout = () => {
  const isLoading = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fullScreen = useMemo(() => {
    const names = [
      "/expenses/+",
      "/journal-entries/+",
      "/invoices/+",
      "/chart-accounts/+",
      "/stores/+",
      "/products/+",
      "/suppliers/+",
      "/purchases/+",
    ];

    const regex = new RegExp("^(" + names.join("|") + ")", "gm");

    return regex.test(pathname);
  }, [pathname]);

  useEffect(() => {
    if (pathname.endsWith("/")) {
      const newPathname = pathname.slice(0, -1);

      navigate(newPathname, { replace: true });
    }
  }, [pathname]);

  if (isLoading) return <LoadingPage />;
  return (
    <section className="bg-background h-full">
      {fullScreen ? (
        <Outlet />
      ) : (
        <>
          <POSHeader />

          <div className="pb-6 container 2xl:max-w-[1700px]">
            <Outlet />
          </div>
        </>
      )}
    </section>
  );
};

export default POSLayout;
