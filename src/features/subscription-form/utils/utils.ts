export const getTotal = (billing: "monthly" | "yearly", plan: { name: string; price: number }, addons: { name: string; price: number; description: string }[]) => {
  try {
    const multiplier = billing === "monthly" ? 1 : 12;
    const planBasePrice = plan.price;
    const totalAddonsPrice = addons.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    return (planBasePrice + totalAddonsPrice) * multiplier;
  } catch {
    return 0;
  }
};
