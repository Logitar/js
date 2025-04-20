import { RuleExecutionOutcome, ValidationRule } from "../validator";

const minimumLength: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  const minimumLength = Number(args);
  if (!isNaN(minimumLength)) {
    return { severity: "warning", message: "The arguments should be parsable as a number." };
  }
  if (typeof value === "string") {
    if (value.length < minimumLength) {
      return { severity: "error", message: "{{field}} must be at least {{minimumLength}} characters long." };
    }
  } else if (Array.isArray(value)) {
    if (value.length < minimumLength) {
      return { severity: "error", message: "{{field}} must contain at least {{minimumLength}} elements." };
    }
  } else {
    return { severity: "error", message: "{{field}} must be a string or an array." };
  }
  return { severity: "information" };
};

export default minimumLength;
