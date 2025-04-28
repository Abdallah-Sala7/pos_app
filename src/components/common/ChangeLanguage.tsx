import { Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

const ChangeLanguage = ({ hasTxt }: { hasTxt?: boolean }) => {
  const activeLang = localStorage.getItem("@lang") || "ar";

  const languages = [
    {
      name: "العربية",
      value: "ar",
    },
    {
      name: "English",
      value: "en",
    },
    {
      name: "Türk",
      value: "tr",
    },
    {
      name: "اردو",
      value: "ur",
    },
  ];

  const onlanguagechange = (lang: string) => {
    if (lang === activeLang) {
      return;
    }

    localStorage.setItem("@lang", lang);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={hasTxt ? "default" : "icon"}>
          <Languages />

          {hasTxt && (
            <span>
              {languages.find((lang) => lang.value === activeLang)?.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32 bg-background">
        {languages.map((lang, index) => (
          <DropdownMenuCheckboxItem
            checked={activeLang === lang.value}
            onCheckedChange={() => onlanguagechange(lang.value)}
            key={index}
            className="cursor-pointer"
          >
            <span className="font-semibold">{lang.name}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLanguage;
