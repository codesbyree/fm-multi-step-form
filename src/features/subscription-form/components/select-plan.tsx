import type { SyntheticEvent } from "react";
import { Button } from "../../../components/ui/button";
import { useMSFContext } from "./multi-step-form";

export default function SelectPlan() {
  const { switchView, changeDirection } = useMSFContext();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const nextForm = () => {
    switchView("add-ons");
    changeDirection(1);
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

        <form onSubmit={handleSubmit}></form>
      </div>

      <div className="flex justify-between">
        <Button data-variant="ghost" className="-ml-6" onClick={prevForm}>
          Go Back
        </Button>
        <Button onClick={nextForm}>Next Step</Button>
      </div>
    </div>
  );
}
