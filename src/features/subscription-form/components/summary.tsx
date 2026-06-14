import { FORM_STEPS } from "../config/form-steps";
import { useSubsFormStore } from "../stores/subs-form-store";

import { Button } from "../../../components/ui/button";
import { useMSFContext } from "./multi-step-form";
import { getTotal } from "../utils/utils";
import { cn } from "../../../utils/cn.utils";
import { useShallow } from "zustand/shallow";

export default function Summary() {
  const { formValues, clearForm } = useSubsFormStore(
    useShallow((s) => ({
      formValues: s.formValues,
      clearForm: s.clearForm,
    })),
  );

  const { switchView, changeDirection, changeActiveIndex } = useMSFContext();

  const prevForm = () => {
    switchView(FORM_STEPS.addons);
    changeDirection(-1);
  };

  const backToPlanView = () => {
    switchView(FORM_STEPS.plan);
    changeDirection(-1);
  };

  const handleClearForm = () => {
    clearForm();
    changeActiveIndex(5);
    changeDirection(1);
    switchView(FORM_STEPS.thanks);
  };

  return (
    <div className="flex flex-col lg:pt-10 lg:pb-4 justify-between flex-1 bg-blue-100 lg:bg-transparent">
      <div className="space-y-8 p-6 lg:p-0 shadow-xl rounded-xl bg-white lg:shadow-none -mt-20 lg:m-0 mx-6">
        <div>
          <h4 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Finishing up</h4>
          <p className="text-gray-500">Double-check everything looks OK before confirming.</p>
        </div>

        <div className="p-6 rounded-xl bg-blue-100 flex flex-col gap-6">
          <div className="flex item-center gap-6 justify-between">
            <div>
              <h4 className="capitalize font-medium font-blue-950">
                {formValues.type.name} ({formValues.billing})
              </h4>
              <button
                onClick={backToPlanView}
                className="text-purple-600 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-transparent hover:after:bg-purple-600 after:left-0 after:transition-all"
              >
                Change
              </button>
            </div>

            <p className="font-semibold text-blue-950">
              ${formValues.billing === "monthly" ? formValues.type.price : formValues.type.price * 12}/{formValues.billing === "monthly" ? "mo" : "yr"}
            </p>
          </div>

          <span className={cn("w-full bg-grey-500/20 h-px hidden", formValues.addOns.length && "block")} />

          <ul className="flex flex-col gap-4 text-medium empty:hidden">
            {formValues.addOns.map((item) => (
              <li key={item.name} className="flex items-cemter justify-between">
                <p className="text-grey-500">{item.name}</p>
                <p className="text-gray-800">
                  +{formValues.billing === "monthly" ? item.price : item.price * 12}/{formValues.billing === "monthly" ? "mo" : "yr"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6 justify-between px-6">
          <p className="font-medium text-grey-500">{formValues.billing === "monthly" ? "Total (per month)" : "Total (per year)"}</p>
          <p className="text-blue-600 font-semibold text-xl">
            +{getTotal(formValues.billing, formValues.type, formValues.addOns)}/{formValues.billing === "monthly" ? "mo" : "yr"}
          </p>
        </div>
      </div>

      <div className="flex justify-between bg-white p-4 lg:p-0 lg:bg-transparent">
        <Button data-variant="ghost" className="-ml-6" onClick={prevForm}>
          Go Back
        </Button>
        <Button onClick={handleClearForm}>Confirm</Button>
      </div>
    </div>
  );
}
