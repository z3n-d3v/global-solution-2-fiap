import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./utils";

export function Dialog({ children, ...props }) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

Dialog.Trigger = DialogPrimitive.Trigger;

Dialog.Close = DialogPrimitive.Close;

Dialog.Content = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal>
    {/* Overlay */}
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
    />

    {/* Content */}
    <DialogPrimitive.Content
      className={cn(
        "fixed z-[1000] top-[50%] left-[50%] w-full max-w-lg",
        "translate-x-[-50%] translate-y-[-50%]",
        "bg-card border border-border shadow-xl rounded-xl p-6",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close className="absolute top-4 right-4 opacity-70 hover:opacity-100">
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);