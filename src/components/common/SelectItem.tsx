"use client";

import { useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverDialog";
import { ScrollArea } from "../ui/scroll-area";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

type TItem = {
  id: string;
  name: string;
  alt_name?: string;
  name_ar?: string;
  name_en?: string;
  optionName?: string;
  isChecked?: boolean;
};

export default function SelectItem({
  items,
  value,
  setValue,
  onSearchChange,
  searchValue,
  disabled,
  placeholder = t("select-option"),
  className,
}: {
  items: TItem[];
  value: TItem | null;
  setValue: (value: TItem | null) => void;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const widthRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        onSearchChange && onSearchChange("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between rounded-full h-11",
            value?.id ? "text-foreground" : "text-muted-foreground",
            className
          )}
          ref={widthRef}
          disabled={disabled}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {value
            ? value.optionName
              ? value.optionName
              : i18n.language === "ar"
              ? value.alt_name || value.name_ar || value.name || value.name_en
              : value.name || value.name_en || value.alt_name || value.name_ar
            : placeholder}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-full p-0 !min-w-[250px]"
        align="start"
        style={{
          width: widthRef?.current?.clientWidth,
        }}
      >
        <Command key={JSON.stringify(items)}>
          <CommandInput
            placeholder="Search option..."
            value={searchValue}
            onValueChange={(e) => {
              if (onSearchChange) onSearchChange(e);
            }}
            className="px-2"
            autoFocus
          />

          <CommandList>
            <ScrollArea className="max-h-48 overflow-auto">
              <CommandEmpty>{t("no-option-found")}</CommandEmpty>

              <CommandGroup>
                {items.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={() => {
                      setValue(option);
                      setOpen(false);
                    }}
                    disabled={option?.isChecked}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === option.id || option?.isChecked
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {option.optionName
                      ? option.optionName
                      : i18n.language === "ar"
                      ? option.alt_name ||
                        option.name_ar ||
                        option.name ||
                        option.name_en
                      : option.name ||
                        option.name_en ||
                        option.alt_name ||
                        option.name_ar}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
