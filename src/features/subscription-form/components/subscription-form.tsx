import { MultiStepForm } from "./multi-step-form";
import PersonalInfo from "./personal-info";
import SelectPlan from "./select-plan";

export default function SubscriptionForm() {
  return (
    <MultiStepForm defaultValue="user-info" initialActiveIndex={1} className="flex">
      <MultiStepForm.Stepper className="bg-purple-600 rounded-lg p-8 py-10 w-max min-w-70 bg-[url(/bg-sidebar-mobile.svg)] bg-bottom bg-no-repeat bg-cover lg:bg-[url(/bg-sidebar-desktop.svg)]">
        <MultiStepForm.Step step={1} value="user-info">
          YOUR INFO
        </MultiStepForm.Step>
        <MultiStepForm.Step step={2} value="select-plan">
          SELECT PLAN
        </MultiStepForm.Step>
        <MultiStepForm.Step step={3} value="add-ons">
          ADD-ONS
        </MultiStepForm.Step>
        <MultiStepForm.Step step={4} value="summary">
          SUMMARY
        </MultiStepForm.Step>
      </MultiStepForm.Stepper>

      <MultiStepForm.Animated>
        <MultiStepForm.Content key="user-info" value="user-info">
          <PersonalInfo />
        </MultiStepForm.Content>
        <MultiStepForm.Content key="select-plan" value="select-plan">
          <SelectPlan />
        </MultiStepForm.Content>
        <MultiStepForm.Content key="add-ons" value="add-ons">
          <p>Add ons</p>
        </MultiStepForm.Content>
        <MultiStepForm.Content key="summary" value="summary">
          <p>Summary</p>
        </MultiStepForm.Content>
      </MultiStepForm.Animated>
    </MultiStepForm>
  );
}
