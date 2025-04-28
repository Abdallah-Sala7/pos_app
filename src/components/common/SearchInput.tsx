import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

interface IProps {
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

const SearchInput = ({
  placeholder,
  className = "",
  isLoading = false,
  ...props
}: IProps) => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();

  return (
    <div className={cn("relative max-w-80", className)}>
      <div className="w-11 h-full absolute top-0 start-0 flex items-center justify-center">
        <SearchIcon size={18} className="text-muted-foreground" />
      </div>

      <Input
        className={"ps-10"}
        placeholder={placeholder || t("search-placeholder")}
        value={params.get("search_key") || ""}
        onChange={(e: any) =>
          setParams((params) => {
            params.set("search_key", e.target.value);
            return params;
          })
        }
        {...props}
      />
    </div>
  );
};

export default SearchInput;
