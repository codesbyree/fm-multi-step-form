import type { ChangeEvent, SyntheticEvent } from "react";
import { Button } from "../../../components/ui/button";
import { useMSFContext } from "./multi-step-form";

import iconCheckmark from "../../../assets/icon-checkmark.svg";

import { useSubsFormStore } from "../stores/subs-form-store";
import { useShallow } from "zustand/shallow";

import { FORM_STEPS } from "../config/form-steps";

const addons = [
  { name: "Online service", price: 1, description: "Access to multiplayer games" },
  { name: "Larger storage", price: 2, description: "Extra 1TB of cloud save" },
  { name: "Customizable Profile", price: 2, description: "Custom theme on your profile" },
];

export default function AddOns() {
  const { formValues, setFormValues } = useSubsFormStore(
    useShallow((s) => ({
      formValues: s.formValues,
      setFormValues: s.setFormValues,
    })),
  );

  const { switchView, changeDirection, changeActiveIndex } = useMSFContext();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    switchView(FORM_STEPS.summary);
    changeDirection(1);
    changeActiveIndex(4);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const state = formValues;
    if (checked) {
      state.addOns.push(addons.filter((item) => item.name === name)[0]);
      setFormValues({
        ...formValues,
        addOns: state.addOns,
      });
    } else {
      const newState = state.addOns.filter((item) => item.name !== name);
      setFormValues({
        ...formValues,
        addOns: newState,
      });
    }
  };

  const prevForm = () => {
    switchView(FORM_STEPS.plan);
    changeDirection(-1);
  };

  const isChecked = (name: string) => {
    return Boolean(formValues.addOns.filter((i) => i.name === name).length);
  };

  return (
    <div className="flex flex-col lg:pt-10 lg:pb-4 justify-between flex-1 bg-blue-100 lg:bg-transparent">
      <div className="space-y-8 p-6 lg:p-0 shadow-xl rounded-xl bg-white lg:shadow-none -mt-20 lg:m-0 mx-6">
        <div>
          <h4 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Pick add-ons</h4>
          <p className="text-gray-500">Add-ons help enhance your gaming experience.</p>
        </div>

        <form onSubmit={handleSubmit} id="form-addons" className="flex flex-col gap-4">
          {addons.map((item) => (
            <label key={item.name} className="group">
              <input type="checkbox" checked={isChecked(item.name)} name={item.name} className="sr-only peer" onChange={handleChange} />

              <div className="bg-white p-4 rounded-xl border border-grey-500/30 cursor-pointer hover:border-purple-600 transition-all peer-checked:bg-blue-100 group-data-[active='true']:border-purple-600 flex items-center gap-5">
                <div className="w-5 h-5 rounded-sm group-has-checked:bg-purple-600 border border-blue-200 group-has-checked:border-purple-600 transition-all grid place-items-center">
                  <img src={iconCheckmark} alt="" />
                </div>

                <div className="flex-1">
                  <p className="text-blue-950 font-medium text-sm lg:text-base">{item.name}</p>
                  <span className="text-grey-500 text-sm lg:text-base">{item.description}</span>
                </div>

                <p className="text-purple-600 font-medium text-sm lg:text-base">+${item.price}/mo</p>
              </div>
            </label>
          ))}
        </form>
      </div>

      <div className="flex justify-between bg-white p-4 lg:p-0 lg:bg-transparent">
        <Button data-variant="ghost" className="-ml-6" onClick={prevForm}>
          Go Back
        </Button>
        <Button type="submit" form="form-addons">
          Next Step
        </Button>
      </div>
    </div>
  );
}
