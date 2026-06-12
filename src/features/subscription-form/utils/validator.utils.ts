import z from "zod";

export const personalInfoValidator = z.object({
  name: z.string().min(2, { error: "Name should at least 2 characters" }),
  email: z.email({ error: "Email did not match common email pattern", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is too short, required minimum 10 characters" })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Phone number must be a valid international format" }),
});

export const planValidator = z.object({
  type: z.enum(["arcade", "advanced", "pro"]),
  billing: z.enum(["monthly", "yearly"]),
});

export const addonsValidator = z.object({
  addOns: z.array(z.number()),
});

export const subsFormValidator = personalInfoValidator.extend(planValidator.shape).extend(addonsValidator.shape);

export type SubsFormSchema = z.infer<typeof subsFormValidator>;
