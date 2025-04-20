import { RuleExecutionOutcome, ValidationRule } from "../validator";

const maximumLength: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  const maximumLength = Number(args);
  if (!isNaN(maximumLength)) {
    return { severity: "warning", message: "The arguments should be parsable as a number." };
  }
  if (typeof value === "string") {
    if (value.length > maximumLength) {
      return { severity: "error", message: "{{field}} must be at most {{maximumLength}} characters long." };
    }
  } else if (Array.isArray(value)) {
    if (value.length > maximumLength) {
      return { severity: "error", message: "{{field}} may contain at most {{maximumLength}} elements." };
    }
  } else {
    return { severity: "error", message: "{{field}} must be a string or an array." };
  }
  return { severity: "information" };
};

export default maximumLength;
