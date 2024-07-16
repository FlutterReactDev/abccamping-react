import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { createRoot } from "react-dom/client";
import { Separator } from "@/components/ui/separator";
interface UsePromptProps {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  verificationText?: string;
  verificationInstruction?: string;
}

const DeleteDialog: FC<
  UsePromptProps & {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }
> = (props) => {
  const {
    cancelText = "Отмена",
    confirmText = "Да",
    description,
    title,
    verificationInstruction,
    verificationText,
    onConfirm,
    onCancel,
    open,
  } = props;
  const [confirmTextInput, setConfirmText] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {verificationText && (
          <>
            <Separator />
            {verificationInstruction && (
              <span className="text-grey-50 mt-1">
                {verificationInstruction}
              </span>
            )}
            <span className="text-grey-50 mt-1">
              Для подтверждения введите{" "}
              <span className="font-semibold">{verificationText}</span> в поле
              ниже.
            </span>
            <Input
              value={confirmTextInput}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={verificationText}
            />
            <Separator />
          </>
        )}
        <DialogFooter>
          <Button variant={"outline"} onClick={onCancel}>
            {cancelText}
          </Button>

          <Button
            {...(verificationText && {
              disabled: confirmTextInput.trim() !== verificationText.trim(),
            })}
            variant={"destructive"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export const usePrompt = () => {
  return (props?: UsePromptProps): Promise<boolean> => {
    return new Promise((resolve) => {
      const mountRoot = createRoot(document.createElement("div"));
      let open = true;

      const onConfirm = () => {
        open = false;
        resolve(true);
        // trigger a rerender to close the dialog
        render();
      };

      const onCancel = () => {
        open = false;
        resolve(false);
        // trigger a rerender to close the dialog
        render();
      };

      // attach the dialog in the mount node
      const render = () => {
        mountRoot.render(
          <DeleteDialog
            onCancel={onCancel}
            onConfirm={onConfirm}
            open={open}
            cancelText={props?.cancelText}
            confirmText={props?.confirmText}
            description={props?.description}
            title={props?.title}
            verificationInstruction={props?.verificationInstruction}
            verificationText={props?.verificationText}
          />
        );
      };

      render();
    });
  };
};
