import React, { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/className";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: "error" | "success" | "default";
  message?: string;
}

const inputVariants = {
  status: {
    default: "",
    error: "border-red-700",
    success: "border-green-700",
  },
  message: {
    default: "",
    error: "text-red-700",
    success: "text-green-700",
  },
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, status, message, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          inputVariants.status[status || "default"],
        )}
        ref={ref}
        {...props}
      />
      {message && <p className={cn("text-sm", inputVariants.message[status || "default"])}>{message}</p>}
    </div>
  );
});
Input.displayName = "Input";

export { Input, inputVariants };
