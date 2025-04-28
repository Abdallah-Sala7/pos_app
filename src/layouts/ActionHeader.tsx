import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ActionHeader = ({
  action,
  className,
  title,
  hasBack = true,
}: {
  action?: ReactNode;
  className?: string;
  title?: string;
  hasBack?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      if (location.search) {
        // Skip the search query and navigate back further
        navigate(-2); // or navigate(-1) multiple times as needed
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.search, navigate]);

  return (
    <header className="w-full bg-background sticky top-0 z-40 border-b border-b-gray-200">
      <div
        className={cn(
          "flex items-center justify-between gap-4 py-4 container",
          className
        )}
      >
        <div className="flex-1 flex justify-start">{title}</div>

        <div className="flex-1 flex justify-end gap-2">
          {action && <>{action}</>}

          {hasBack && (
            <Button
              type="button"
              variant={"outline"}
              onClick={() => navigate(-1)}
              size={"icon"}
            >
              <X width="20" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ActionHeader;
