import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BoxesIcon,
  CalendarRangeIcon,
  LogOutIcon,
  PackageOpenIcon,
  ReceiptTextIcon,
  ScanQrCodeIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Image from "@/components/common/Image";
import ChangeLanguage from "@/components/common/ChangeLanguage";

const POSHeader = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("@token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-background sticky top-0 z-40 border-b">
      <div className="flex items-center justify-between gap-8 py-4 container 2xl:max-w-[1700px]">
        <div className="shrink-0 flex items-center justify-start">
          <Image
            src="/logo.png"
            alt="website logo"
            className="w-full max-w-28 h-auto object-contain"
            width="128"
            height="63"
          />

          <div className="w-[2px] h-10 bg-border mx-2"></div>

          <h2 className="font-bold text-primary">
            {user?.pos_device?.store?.name_ar}
          </h2>
        </div>

        <div className="shrink-0 flex justify-center gap-4">
          <NavLink className={"group"} to={"/"} end>
            <Button
              variant={"outline"}
              className="group-[.active]:bg-primary group-[.active]:border-primary group-[.active]:text-primary-foreground"
            >
              <ScanQrCodeIcon />

              <span>{t("pos")}</span>
            </Button>
          </NavLink>

          <NavLink className={"group"} to={"/today-sales"}>
            <Button
              variant={"outline"}
              className="group-[.active]:bg-primary group-[.active]:border-primary group-[.active]:text-primary-foreground"
            >
              <CalendarRangeIcon />

              <span>{t("today-summary")}</span>
            </Button>
          </NavLink>

          <NavLink className={"group"} to={"/invoices"}>
            <Button
              variant={"outline"}
              className="group-[.active]:bg-primary group-[.active]:border-primary group-[.active]:text-primary-foreground"
            >
              <ReceiptTextIcon />

              <span>{t("invoices-management")}</span>
            </Button>
          </NavLink>

          <NavLink className={"group"} to={"/products"}>
            <Button
              variant={"outline"}
              className="group-[.active]:bg-primary group-[.active]:border-primary group-[.active]:text-primary-foreground"
            >
              <BoxesIcon />

              <span>{t("inventory")}</span>
            </Button>
          </NavLink>

          <NavLink className={"group"} to={"/purchases"}>
            <Button
              variant={"outline"}
              className="group-[.active]:bg-primary group-[.active]:border-primary group-[.active]:text-primary-foreground"
            >
              <PackageOpenIcon />

              <span>{t("purchases")}</span>
            </Button>
          </NavLink>
        </div>

        <div className="shrink-0 flex justify-end gap-2">
          <ChangeLanguage />

          <Link to="/profile">
            <div className="flex gap-4 items-center justify-start text-start">
              <Image
                src={user?.image}
                className="shrink-0 w-10 h-10 rounded-full object-cover object-center border"
              />
            </div>
          </Link>

          {user?.user_type === "cashier" ? (
            <Button
              type="button"
              variant={"outlineDestructive"}
              size={"icon"}
              onClick={handleLogout}
            >
              <LogOutIcon className="rtl:rotate-180" />
            </Button>
          ) : (
            <Link to={"/"} className="shrink-0">
              <Button type="button" variant={"outline"} size={"icon"}>
                <XIcon />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default POSHeader;
