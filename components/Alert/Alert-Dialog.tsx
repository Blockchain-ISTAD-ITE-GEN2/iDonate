import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as React from "react";

type AlertDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  cancelText: string;
  onAction: () => void;
};

export function AlertComfirmDialog({
  trigger,
  title,
  description,
  actionText,
  cancelText,
  onAction,
}: AlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  // Handle Key Down Event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      onAction();
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent Escape key
        onKeyDown={handleKeyDown} // Listen for Enter key
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-iDonate-error">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // Prevent default navigation behavior
              setOpen(false);
            }}
            className="border-[2px] border-iDonate-navy-accent"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
             onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // Prevent default form submission
              onAction();
              setOpen(false);
            }}
            className="border-[2px] border-iDonate-error bg-transparent hover:bg-red-50 text-iDonate-error"
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
