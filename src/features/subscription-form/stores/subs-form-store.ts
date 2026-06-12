import { create } from "zustand";
import type { SubsFormSchema } from "../utils/validator.utils";

interface Store {
  activeIndex: number;
  setActiveIndex: (v: number) => void;
  formValues: SubsFormSchema;
  setFormValues: (formValue: SubsFormSchema) => void;
}

export const useSubsFormStore = create<Store>((set) => ({
  activeIndex: 0,
  setActiveIndex: (activeIndex: number) => set({ activeIndex }),
  formValues: {
    name: "",
    addOns: [],
    billing: "monthly",
    email: "",
    phoneNumber: "",
    type: "pro",
  },
  setFormValues: (formValues: SubsFormSchema) => set({ formValues }),
}));
