import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export function Input(props: ComponentPropsWithoutRef<"input">) {
  const { className, value, onChange, autoComplete = "off", ...rest } = props;

  return (
    <input
      className={cn(
        "rounded-lg border-none outline-1 outline-grey-500/60 p-4 focus:outline-purple-600 text-blue-950 font-medium group-data-[error='true']:outline-red-500 group-data-[disabled='true']:pointer-events-none group-data-[disabled='true']:opacity-60 group-data-[disabled='true']:cursor-not-allowed",
        className,
      )}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      {...rest}
    />
  );
}
