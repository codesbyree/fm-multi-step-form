import { motion, type HTMLMotionProps } from "motion/react";
import { createContext, useContext, useEffect, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn.utils";
import { getValidationError } from "../../utils/form.utils";

interface Context {
  errorMessage: string;
}

const FieldContext = createContext<Context | undefined>(undefined);

const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (context === undefined) {
    throw new Error("This component must be used within <Field /> parent.");
  }

  return context;
};

export function FieldGroup(props: ComponentPropsWithoutRef<"div">) {
  const { className, ...rest } = props;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...rest}>
      {props.children}
    </div>
  );
}

interface FieldProps extends HTMLMotionProps<"div"> {
  fieldName: string;
  validatorError: { path: string; message: string }[];
}

export function Field(props: FieldProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const { className, fieldName, validatorError, ...rest } = props;

  useEffect(() => {
    const checkForError = () => {
      const validatorMessage = getValidationError(fieldName, validatorError);
      setErrorMessage(validatorMessage);
    };

    checkForError();
  }, [validatorError, fieldName]);

  const hasError = Boolean(errorMessage.length);

  return (
    <FieldContext value={{ errorMessage }}>
      <motion.div
        animate={{ x: hasError ? [0, 10, -10, 0, 6, -6, 2, -2, 0] : [0] }}
        transition={{ duration: 0.2 }}
        data-error={hasError}
        className={cn("flex flex-col gap-2 relative group", className)}
        {...rest}
      >
        {props.children}
      </motion.div>
    </FieldContext>
  );
}

export function FieldLabel(props: ComponentPropsWithoutRef<"label">) {
  const { className, htmlFor, ...rest } = props;

  return (
    <label
      className={cn("text-blue-950 text-sm group-data-[disabled='true']:pointer-events-none group-data-[disabled='true']:opacity-60 group-data-[disabled='true']:cursor-not-allowed", className)}
      htmlFor={htmlFor}
      {...rest}
    >
      {props.children}
    </label>
  );
}

export function FieldError(props: ComponentPropsWithoutRef<"span">) {
  const { errorMessage } = useFieldContext();

  const { className, ...rest } = props;

  return (
    <span className={cn("hidden group-data-[error='true']:block absolute top-0 right-0 text-sm font-medium text-red-500", className)} {...rest}>
      {errorMessage}
    </span>
  );
}
