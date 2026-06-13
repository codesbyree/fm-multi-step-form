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

const plans = [
  { name: "Arcade", price: "$9/mo", icon: <img src={IconArcade} alt="" /> },
  { name: "Advanced", price: "$12/mo", icon: <img src={IconAdvanced} alt="" /> },
  { name: "Pro", price: "$15/mo", icon: <img src={IconPro} alt="" /> },
];

export default function SelectPlan() {
  const { formValues, setFormValues } = useSubsFormStore(
    useShallow((s) => ({
      formValues: s.formValues,
      setFormValues: s.setFormValues,
    })),
  );

  const { switchView, changeDirection } = useMSFContext();

  const handleSubmit = (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      switchView("add-ons");
      changeDirection(1);
    } catch {
      console.log("what");
    }
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
      [name]: value,
    });
  };

  const prevForm = () => {
    switchView("user-info");
    changeDirection(-1);
  };

  return (
    <div className="flex flex-col pt-10 pb-4 justify-between flex-1">
      <div className="space-y-8">
        <div>
          <h4 className="text-3xl font-bold text-blue-950">Select your plan</h4>
          <p className="text-gray-500">You have the option of monthly or yearly billing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-3 gap-5">
            {plans.map((plan) => (
              <label key={plan.name} data-active={formValues.type === plan.name.toLowerCase()} className="group">
                <input className="sr-only" type="radio" name="type" value={plan.name.toLowerCase()} onChange={handleChange} />

                <div className="bg-white p-4 rounded-xl border border-grey-500/30 space-y-16 cursor-pointer hover:border-purple-600 transition-all group-data-[active='true']:bg-blue-100 group-data-[active='true']:border-purple-600">
                  {plan.icon}

                  <div className="flex flex-col">
                    <span className="text-blue-950 font-semibold text-lg">{plan.name}</span>
                    <span className="text-grey-500">{plan.price}</span>
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

      <div className="flex justify-between">
        <Button data-variant="ghost" className="-ml-6" onClick={prevForm}>
          Go Back
        </Button>
        <Button onClick={handleSubmit}>Next Step</Button>
      </div>
    </div>
  );
}
