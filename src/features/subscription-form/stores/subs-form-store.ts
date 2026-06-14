import { create } from "zustand";
import type { SubsFormSchema } from "../utils/validator.utils";

interface Store {
  formValues: SubsFormSchema;
  setFormValues: (formValue: SubsFormSchema) => void;
  clearForm: () => void;
}

export const useSubsFormStore = create<Store>((set) => ({
  formValues: {
    name: "",
    addOns: [],
    billing: "monthly",
    email: "",
    phoneNumber: "",
    type: {
      name: "Arcade",
      price: 9,
    },
  },
  setFormValues: (formValues: SubsFormSchema) => set({ formValues }),
  clearForm: () =>
    set({
      formValues: {
        name: "",
        addOns: [],
        billing: "monthly",
        email: "",
        phoneNumber: "",
        type: {
          name: "Arcade",
          price: 9,
        },
      },
    }),
}));
