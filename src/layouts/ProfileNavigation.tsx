import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/store";
import Image from "@/components/common/Image";
import useLogout from "@/hooks/useLogout";
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";

export default function ProfileNavigation() {
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { handleLogged } = useLogout();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex gap-4 items-center justify-start text-start cursor-pointer">
          <Image
            src={user?.image}
            className="shrink-0 w-10 h-10 rounded-full object-cover object-center border"
          />

          <div className="flex-1 hidden sm:block max-w-[8rem] text-end">
            <p className="text-sm font-bold line-clamp-1">
              {user?.name || "UNKNOWN"}
            </p>

            <p className="text-xs text-muted-foreground line-clamp-1 [direction:ltr]">
              {user?.email || "UNKNOWN"}
            </p>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className={`py-0.5 px-0 w-auto me-2`} align="start">
        <ul className="divide-y divide-gray-100">
          <li className="py-1.5 px-4 hover:bg-gray-50">
            <Link
              to="/profile"
              className="inline-flex items-center gap-3 text-sm"
            >
              <User2Icon width={24} height={24} className="text-gray-800" />
              <p className="truncate text-gray-600">{t("profile")}</p>
            </Link>
          </li>

          <li className="py-1.5 px-4 hover:bg-gray-50">
            <Link
              to="/settings"
              className="inline-flex items-center gap-3 text-sm"
            >
              <SettingsIcon width={24} height={24} className="text-gray-800" />
              <p className="truncate text-gray-600">{t("settings")}</p>
            </Link>
          </li>

          <li className="py-1.5 px-4 hover:bg-gray-50">
            <button type="button" onClick={handleLogged}>
              <div className="inline-flex items-center gap-3 text-sm">
                <LogOutIcon
                  width={24}
                  height={24}
                  className="text-destructive"
                />
                <p className="truncate text-destructive">{t("logout")}</p>
              </div>
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
