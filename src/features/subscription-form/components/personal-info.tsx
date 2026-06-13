import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import z from "zod";

import { personalInfoValidator } from "../utils/validator.utils";

import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useMSFContext } from "./multi-step-form";
import { parseValidationError } from "../../../utils/form.utils";
import { useSubsFormStore } from "../stores/subs-form-store";
import { useShallow } from "zustand/shallow";

export default function PersonalInfo() {
  const { formValues, setFormValues } = useSubsFormStore(
    useShallow((s) => ({
      formValues: s.formValues,
      setFormValues: s.setFormValues,
    })),
  );

  const { switchView, changeDirection, changeActiveIndex } = useMSFContext();
  const [formError, setFormError] = useState<{ path: string; message: string }[]>([]);

  const handleSubmit = (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      personalInfoValidator.parse(formValues);

      switchView("select-plan");
      changeDirection(1);
      changeActiveIndex(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const parsedError = parseValidationError(error);
        setFormError(parsedError as { path: string; message: string }[]);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormError([]);

    const { name, value } = e.target;

    const payload = {
      ...formValues,
      [name]: value,
    };
    setFormValues(payload);
  };

  const formReadyForSubmit = () => {
    const { name, email, phoneNumber } = formValues;
    if (name.length && email.length && phoneNumber.length) return true;
    return false;
  };

  const isFormValid = formReadyForSubmit();

  return (
    <div className="flex flex-col pt-10 pb-4 justify-between flex-1">
      <div className="space-y-8">
        <div>
          <h4 className="text-3xl font-bold text-blue-950">Personal info</h4>
          <p className="text-gray-500">Please provide your name, email address, and phone number.</p>
        </div>

        <form onSubmit={handleSubmit} id="form-personal-info">
          <FieldGroup>
            <Field fieldName="name" validatorError={formError}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" name="name" placeholder="e.g. Stephen King" onChange={handleChange} value={formValues["name"]} />
              <FieldError />
            </Field>

            <Field fieldName="email" validatorError={formError}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input id="email" name="email" placeholder="e.g. stephenking@lorem.com" onChange={handleChange} value={formValues["email"]} />
              <FieldError />
            </Field>

            <Field fieldName="phoneNumber" validatorError={formError}>
              <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
              <Input id="phone-number" name="phoneNumber" placeholder="e.g. +1 234 567 890" onChange={handleChange} value={formValues["phoneNumber"]} />
              <FieldError />
            </Field>
          </FieldGroup>
        </form>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isFormValid} type="submit" form="form-personal-info">
          Next Step
        </Button>
      </div>
    </div>
  );
}
