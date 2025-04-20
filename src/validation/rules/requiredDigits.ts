import type { RuleExecutionOutcome, ValidationRule } from "../validator";
import { isDigit } from "../../helpers/stringUtils";

const requiredDigits: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{field}} must be a string." };
  }

  const requiredDigits = Number(args);
  if (isNaN(requiredDigits)) {
    return { severity: "warning", message: "The arguments should be parsable as a number." };
  }

  const count: number = [...value].filter(isDigit).length;
  if (count < requiredDigits) {
    return { severity: "error", message: "{{field}} must contain at least {{requiredDigits}} digit(s)." };
  }

  return { severity: "information" };
};

export default requiredDigits;
