import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export function Button(props: ComponentPropsWithoutRef<"button">) {
  const { className, onClick, disabled, ...rest } = props;

  return (
    <button
      className={cn(
        "bg-blue-950 p-4 px-8 rounded-lg text-white cursor-pointer hover:bg-blue-900 transition-colors data-[variant='ghost']:bg-transparent data-[variant='ghost']:text-blue-950 data-[variant='ghost']:hover:bg-slate-100 disabled:opacity-50",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {props.children}
    </button>
  );
}
