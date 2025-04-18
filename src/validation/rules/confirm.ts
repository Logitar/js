import type { ValidationRule } from "../validator";

const confirm: ValidationRule = (value: unknown, target: unknown): boolean => {
  if (typeof value === "object" && typeof target === "object") {
    return JSON.stringify(value) === JSON.stringify(target);
  }
  return value === target;
};

export default confirm;
