import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { t } from "i18next";

export function ConfirmModal({
  className = "",
  mutationFunction,
  hasDesc = true,
  hasTextarea = false,
  setTextValue,
}: {
  className?: string;
  mutationFunction?: any;
  hasDesc?: boolean;
  hasTextarea?: boolean;
  setTextValue?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await mutationFunction({} as any)
      .unwrap()
      .then((payload: any) => {
        toast.success(payload?.message || "Proses done successfully");
        setIsOpen(false);
      })
      .catch((error: any) => toast.error(error.data.message));

    setIsLoading(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outlineDestructive"}
          className={className}
          size={"icon"}
        >
          <Trash2Icon width={20} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("are-you-sure-delete")}</AlertDialogTitle>
          {hasDesc && (
            <AlertDialogDescription>
              {t("are-you-sure-delete-desc")}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {hasTextarea && (
          <div className="form-group">
            <label className="form-label" htmlFor="reason">
              Reason
            </label>

            <Textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2"
              placeholder="Type here..."
              id="reason"
              name="reason"
              required
              onChange={(e) => setTextValue?.(e.target.value)}
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <LoaderIcon className="animate-spin" /> : <>Confirm</>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;

/**
 * 
  
<Button
        variant={variant || "destructive"}
        className={className}
        size={size || "sm"}
        onClick={() => setIsOpen(true)}
      >
        {title || t("common.delete")}
      </Button>
      
      <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-center items-center mb-4">
                <Icon icon="bx:error" className="text-red-400 w-24 h-24" />
              </div>

              <p className="text-lg font-bold text-center">
                {t("common.are-you-sure")}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {desc || t("common.do-process")}
              </p>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <Button
                type="button"
                variant={"destructive"}
                size={"sm"}
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? (
                  <Icon icon="svg-spinners:3-dots-fade" width={20} />
                ) : (
                  <>
                    {hasIcon && <Icon icon="akar-icons:trash" width={20} />}
                    {t("common.confirm")}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                size={"sm"}
                onClick={handleClose}
              >
                {t("common.cancel")}
              </Button>
            </div>
          </div>
 */
