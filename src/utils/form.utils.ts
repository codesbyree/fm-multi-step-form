import z from "zod";

export const parseValidationError = (err: z.ZodError) => {
  const issues = err.issues;
  return issues.map((issue) => ({
    path: issue.path[0],
    message: issue.message,
  }));
};

export const getValidationError = (name: string, err: { path: string; message: string }[]) => {
  const foundError = err.filter((err) => err.path === name);
  if (foundError.length) return foundError[0].message;
  return "";
};
