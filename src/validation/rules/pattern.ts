import type { ValidationRule } from "../validator";

const pattern: ValidationRule = (value: unknown, args: unknown): boolean => {
  return typeof value === "string" && (typeof args === "string" || args instanceof RegExp) && new RegExp(args).test(value);
};

export default pattern;
