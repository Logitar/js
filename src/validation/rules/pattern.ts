import type { RuleExecutionOutcome, ValidationRule } from "../validator";

const pattern: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{field}} must be a string." };
  } else if (typeof args !== "string" && !(args instanceof RegExp)) {
    return { severity: "warning", message: "The arguments should be a string or a RegExp." };
  } else if (!new RegExp(args).test(value)) {
    return { severity: "error", message: "{{field}} must match the pattern {{pattern}}." };
  }
  return { severity: "information" };
};

export default pattern;
