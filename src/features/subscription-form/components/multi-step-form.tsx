import React from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { createContext, useContext, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "../../../utils/cn.utils";

interface Context {
  activeIndex: number;
  changeActiveIndex: (i: number) => void;
  currentView: string;
  switchView: (newView: string) => void;
  direction: number;
  changeDirection: (dir: number) => void;
}

const MSFContext = createContext<Context | undefined>(undefined);

export const useMSFContext = () => {
  const context = useContext(MSFContext);

  if (context === undefined) {
    throw new Error("Multi Step Form compound components must be used within an <MultiStepForm /> parent.");
  }

  return context;
};

interface FormProps extends ComponentPropsWithoutRef<"div"> {
  defaultValue: string;
  initialActiveIndex?: number;
}

function Form(props: FormProps) {
  const { defaultValue, className, initialActiveIndex, ...rest } = props;

  const [currentView, setCurrentView] = useState(defaultValue);
  const [direction, setDirection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex ?? 0);

  const switchView = (newView: string) => setCurrentView(newView);
  const changeDirection = (dir: number) => setDirection(dir);
  const changeActiveIndex = (v: number) => setActiveIndex(v);

  return (
    <MSFContext value={{ currentView, switchView, direction, changeDirection, activeIndex, changeActiveIndex }}>
      <div className={cn("flex-1", className)} {...rest}>
        {props.children}
      </div>
    </MSFContext>
  );
}

function Stepper(props: ComponentPropsWithoutRef<"div">) {
  const { className } = props;

  return <div className={cn("flex flex-col gap-8 relative", className)}>{props.children}</div>;
}

interface StepProps extends HTMLMotionProps<"button"> {
  value: string;
  step: number;
  children: React.ReactNode;
}

function Step(props: StepProps) {
  const { currentView, switchView, activeIndex } = useMSFContext();
  const { className, value, step, disabled, ...rest } = props;

  const isActive = value === currentView;

  const isDisabled = () => {
    if (disabled) return true;
    if (activeIndex >= step) return true;
    return false;
  };

  return (
    <motion.button
      disabled={!isDisabled()}
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.9 }}
      data-active={isActive}
      className={cn("flex items-center gap-4 cursor-pointer text-white group disabled:opacity-50", className)}
      onClick={() => switchView(value)}
      {...rest}
    >
      <span className="border w-8 h-8 rounded-full border-white grid place-items-center group-data-[active='true']:bg-blue-200 group-data-[active='true']:text-blue-950 transition-all font-medium text-sm group-data-[active='true']:border-blue-200">
        {step}
      </span>

      <span className="flex flex-col text-left">
        <span className="opacity-60 text-sm leading-3.5">STEP {step}</span>
        <span className="font-medium text-sm tracking-wider leading-6">{props.children}</span>
      </span>
    </motion.button>
  );
}

interface ContentProps extends HTMLMotionProps<"div"> {
  value: string;
  children: React.ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(10px)",
  }),
};

function Content(props: ContentProps) {
  const { direction } = useMSFContext();
  const { className, value, ...rest } = props;

  return (
    <motion.div
      key={value}
      variants={variants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("flex-1 flex flex-col", className)}
      {...rest}
    >
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">{props.children}</div>
    </motion.div>
  );
}

type WithValue = { value: string };

export function Animated({ children }: { children: React.ReactNode }) {
  const { direction, currentView } = useMSFContext();

  const activeChild = React.Children.toArray(children).find((child): child is React.ReactElement<WithValue> => React.isValidElement<WithValue>(child) && child.props.value === currentView);

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      {activeChild}
    </AnimatePresence>
  );
}

export const MultiStepForm = Object.assign(Form, {
  Stepper: Stepper,
  Step: Step,
  Content: Content,
  Animated: Animated,
});
