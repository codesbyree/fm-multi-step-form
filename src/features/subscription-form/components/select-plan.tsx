import type { ChangeEvent, SyntheticEvent } from "react";
import { Button } from "../../../components/ui/button";
import { useMSFContext } from "./multi-step-form";

import IconArcade from "../../../assets/icon-arcade.svg";
import IconAdvanced from "../../../assets/icon-advanced.svg";
import IconPro from "../../../assets/icon-pro.svg";
import { useSubsFormStore } from "../stores/subs-form-store";
import { useShallow } from "zustand/shallow";
import { Switch } from "../../../components/ui/switch";
import { cn } from "../../../utils/cn.utils";
import { FORM_STEPS } from "../config/form-steps";

const plans = [
  { name: "Arcade", price: 9, icon: <img src={IconArcade} alt="" /> },
  { name: "Advanced", price: 12, icon: <img src={IconAdvanced} alt="" /> },
  { name: "Pro", price: 15, icon: <img src={IconPro} alt="" /> },
];

export default function SelectPlan() {
  const { formValues, setFormValues } = useSubsFormStore(
    useShallow((s) => ({
      formValues: s.formValues,
      setFormValues: s.setFormValues,
    })),
  );

  const { switchView, changeDirection, changeActiveIndex } = useMSFContext();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    switchView(FORM_STEPS.addons);
    changeDirection(1);
    changeActiveIndex(3);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormValues({
        ...formValues,
        billing: checked ? "yearly" : "monthly",
      });

      return;
    }

    setFormValues({
      ...formValues,
      [name]: plans
        .map((p) => {
          if (p.name === value) {
            return { name: p.name, price: p.price };
          }
        })
        .filter((x) => x)[0],
    });
  };

  const prevForm = () => {
    switchView(FORM_STEPS.info);
    changeDirection(-1);
  };

  const getFixedPrice = (base: number) => {
    if (formValues.billing === "monthly") return base;
    return base * 12;
  };

  return (
    <div className="flex flex-col lg:pt-10 lg:pb-4 lg:x-0 justify-between flex-1 bg-blue-100 lg:bg-transparent">
      <div className="space-y-8 p-6 lg:p-0 shadow-xl rounded-xl bg-white lg:shadow-none -mt-20 lg:m-0 mx-6">
        <div>
          <h4 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Select your plan</h4>
          <p className="text-gray-500">You have the option of monthly or yearly billing.</p>
        </div>

        <form onSubmit={handleSubmit} id="form-plan" className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
            {plans.map((plan) => (
              <label key={plan.name} data-active={formValues.type.name === plan.name} className="group">
                <input className="sr-only" type="radio" name="type" value={plan.name} onChange={handleChange} />

                <div className="bg-white p-4 rounded-xl border border-grey-500/30 flex gap-4 lg:gap-16 lg:flex-col cursor-pointer hover:border-purple-600 transition-all group-data-[active='true']:bg-blue-100 group-data-[active='true']:border-purple-600 items-center lg:items-start">
                  <div className="w-10">{plan.icon}</div>

                  <div className="flex flex-col">
                    <span className="text-blue-950 font-semibold text-lg">{plan.name}</span>
                    <span className="text-grey-500">
                      ${getFixedPrice(plan.price)}/{formValues.billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="p-4 flex items-center gap-6 justify-center bg-blue-100 rounded-lg">
            <p className={cn("opacity-50 transition-all delay-300", formValues.billing === "monthly" && "opacity-100")}>Monthly</p>
            <Switch checked={formValues.billing === "yearly"} onChange={handleChange} />
            <p className={cn("opacity-50 transition-all delay-300", formValues.billing === "yearly" && "opacity-100")}>Yearly</p>
          </div>
        </form>
      </div>

      <div className="flex justify-between p-4 bg-white lg:bg-bg-transparent lg:p-0">
        <Button data-variant="ghost" className="-ml-6" onClick={prevForm}>
          Go Back
        </Button>
        <Button type="submit" form="form-plan">
          Next Step
        </Button>
      </div>
    </div>
  );
}
