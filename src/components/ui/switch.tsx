import { motion } from "motion/react";
import { useState, type ChangeEvent, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export function Switch(props: ComponentPropsWithoutRef<"input">) {
  const [checked, setChecked] = useState(props.checked ?? false);
  const { className, name, onChange, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setChecked(e.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} className={cn("sr-only peer", className)} name={name} onChange={handleChange} {...rest} />
      <div className="p-1 w-13 h-6 rounded-full cursor-pointer bg-blue-950 flex items-center">
        <motion.div className="w-4 h-4 rounded-full bg-white" animate={{ x: checked ? 0 : 28 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
      </div>
    </label>
  );
}
