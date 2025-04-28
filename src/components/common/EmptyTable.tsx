import Image from "./Image";

import { TableCell, TableRow } from "../ui/table";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const EmptyTable = ({
  isLoading,
  className,
}: {
  isLoading?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <TableRow className="border-0">
      <TableCell className={cn("py-10", className)} colSpan={100}>
        <div className="w-full gap-4 flex flex-col justify-center items-center">
          <div className="w-32 h-32 flex justify-center items-center bg-muted rounded-full">
            {isLoading ? (
              <LoaderIcon className="text-muted-foreground" size={50} />
            ) : (
              <Image
                src={"/images/no-results.png"}
                alt={t("no-data")}
                title={t("no-data")}
                width="80"
                height="80"
                className="w-16 h-16 animate-bounce-slow"
              />
            )}
          </div>

          <p className="text-muted-foreground shrink-0 text-sm text-center">
            {t("no-data")}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTable;
