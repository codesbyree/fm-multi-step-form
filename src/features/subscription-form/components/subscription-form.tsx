import { FORM_STEPS } from "../config/form-steps";

import { MultiStepForm } from "./multi-step-form";
import AddOns from "./add-ons";
import PersonalInfo from "./personal-info";
import SelectPlan from "./select-plan";
import Summary from "./summary";
import Thanks from "./thanks";

export default function SubscriptionForm() {
  return (
    <MultiStepForm defaultValue={FORM_STEPS.info} initialActiveIndex={1} className="flex flex-col lg:flex-row">
      <MultiStepForm.Stepper className="bg-purple-600 lg:rounded-lg p-8 py-10 lg:w-70 bg-[url(/bg-sidebar-mobile.svg)] bg-bottom bg-no-repeat bg-cover lg:bg-[url(/bg-sidebar-desktop.svg)] flex-row lg:flex-col w-full justify-center lg:justify-start items-start min-h-50 gap-4 lg:gap-8">
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
        <MultiStepForm.Content key={FORM_STEPS.thanks} value={FORM_STEPS.thanks}>
          <Thanks />
        </MultiStepForm.Content>
      </MultiStepForm.Animated>
    </MultiStepForm>
  );
}
