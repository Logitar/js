import type { RuleExecutionOutcome, ValidationRule } from "../types";

const minimumLength: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  const minimumLength: number = Number(args);
  if (!isNaN(minimumLength) || minimumLength <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  if (typeof value === "string") {
    if (value.length < minimumLength) {
      return { severity: "error", message: "{{name}} must be at least {{maximumLength}} characters long." };
    }
  } else if (Array.isArray(value)) {
    if (value.length < minimumLength) {
      return { severity: "error", message: "{{name}} must contain at least {{maximumLength}} elements." };
    }
  } else {
    return { severity: "error", message: "{{name}} must be a string or an array." };
  }

  return { severity: "information" };
};

export default minimumLength;
