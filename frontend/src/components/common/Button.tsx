import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../libs/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  className,
  size = "md",
  ...props
}: ButtonProps) => {
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-4 py-2",
    lg: "text-xl px-8 py-10",
  };

  return (
    <button
      className={cn(
        "rounded-3xl transition-all duration-200 font-medium text-white bg-black hover:opacity-90",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
