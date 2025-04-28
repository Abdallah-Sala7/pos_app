import { Popover, PopoverContent, PopoverTrigger } from "../ui/popoverDialog";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TItem = {
  id: string;
  name: string;
  alt_name?: string;
  name_ar?: string;
  name_en?: string;
  optionName?: string;
  isChecked?: boolean;
  [key: string]: any;
};

export default function SelectWithSearch({
  items,
  value,
  setValue,
  disabled,
  placeholder = t("select-option"),
  className,
}: {
  items: TItem[];
  value: TItem | null;
  setValue: (value: TItem | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<TItem[]>([]);

  const handleSelect = (item: TItem) => {
    setValue(item);
    setOpen(false);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={(e) => e.preventDefault()}>
          <Input
            id="search"
            type="text"
            placeholder={placeholder}
            className={className}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();

              setFilteredItems(
                items.filter(
                  (item) =>
                    item?.barcode?.toLowerCase().includes(value) ||
                    item?.item_code?.toLowerCase().includes(value) ||
                    item?.[t("_tr_name")]?.toLowerCase().includes(value) ||
                    item?.[t("__name")]?.toLowerCase().includes(value) ||
                    item.alt_name?.toLowerCase().includes(value) ||
                    item.name_ar?.toLowerCase().includes(value) ||
                    item.name_en?.toLowerCase().includes(value) ||
                    item.name?.toLowerCase().includes(value)
                )
              );
            }}
            autoComplete="off"
            onFocus={() => setOpen(true)}
            disabled={disabled}
          />
        </PopoverTrigger>

        <PopoverContent
          className="p-0 !mt-0 w-[--radix-popover-trigger-width]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="">
            <ScrollArea className="max-h-48 overflow-auto">
              {/* <CommandEmpty>No option found.</CommandEmpty> */}

              <div className="flex flex-col gap-2 p-1">
                {filteredItems.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      handleSelect(option);
                    }}
                    className="w-full px-2 py-1 flex items-center justify-start text-start text-sm gap-2 rounded-md hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={disabled}
                    data-state={value?.id === option.id ? "checked" : ""}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === option.id || option?.isChecked
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    <div className="flex-1">
                      <p>
                        {option?.[t("_tr_name")] ||
                          option?.[t("__name")] ||
                          option.alt_name ||
                          option.name_ar ||
                          option.name_en ||
                          option.name}
                      </p>

                      <p className="text-muted-foreground">
                        {option.barcode ||
                          option.item_code ||
                          option.code ||
                          "-"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
