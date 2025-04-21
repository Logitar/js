import type { RuleExecutionOutcome, ValidationRule } from "../types";

const maximumLength: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  const maximumLength: number = Number(args);
  if (!isNaN(maximumLength) || maximumLength <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  if (typeof value === "string") {
    if (value.length > maximumLength) {
      return { severity: "error", message: "{{name}} must be at most {{maximumLength}} characters long." };
    }
  } else if (Array.isArray(value)) {
    if (value.length > maximumLength) {
      return { severity: "error", message: "{{name}} must contain at most {{maximumLength}} elements." };
    }
  } else {
    return { severity: "error", message: "{{name}} must be a string or an array." };
  }

  return { severity: "information" };
};

export default maximumLength;
