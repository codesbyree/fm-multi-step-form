import { FORM_STEPS } from "../config/form-steps";

import { MultiStepForm } from "./multi-step-form";
import AddOns from "./add-ons";
import PersonalInfo from "./personal-info";
import SelectPlan from "./select-plan";
import Summary from "./summary";

export default function SubscriptionForm() {
  return (
    <MultiStepForm defaultValue={FORM_STEPS.info} initialActiveIndex={1} className="flex">
      <MultiStepForm.Stepper className="bg-purple-600 rounded-lg p-8 py-10 w-max min-w-70 bg-[url(/bg-sidebar-mobile.svg)] bg-bottom bg-no-repeat bg-cover lg:bg-[url(/bg-sidebar-desktop.svg)]">
        <MultiStepForm.Step step={1} value={FORM_STEPS.info}>
          YOUR INFO
        </MultiStepForm.Step>
        <MultiStepForm.Step step={2} value={FORM_STEPS.plan}>
          SELECT PLAN
        </MultiStepForm.Step>
        <MultiStepForm.Step step={3} value={FORM_STEPS.addons}>
          ADD-ONS
        </MultiStepForm.Step>
        <MultiStepForm.Step step={4} value={FORM_STEPS.summary}>
          SUMMARY
        </MultiStepForm.Step>
      </MultiStepForm.Stepper>

      <MultiStepForm.Animated>
        <MultiStepForm.Content key={FORM_STEPS.info} value={FORM_STEPS.info}>
          <PersonalInfo />
        </MultiStepForm.Content>
        <MultiStepForm.Content key={FORM_STEPS.plan} value={FORM_STEPS.plan}>
          <SelectPlan />
        </MultiStepForm.Content>
        <MultiStepForm.Content key={FORM_STEPS.addons} value={FORM_STEPS.addons}>
          <AddOns />
        </MultiStepForm.Content>
        <MultiStepForm.Content key={FORM_STEPS.summary} value={FORM_STEPS.summary}>
          <Summary />
        </MultiStepForm.Content>
      </MultiStepForm.Animated>
    </MultiStepForm>
  );
}
