import type { RuleExecutionOutcome, ValidationRule } from "../types";
import { isDigit } from "../../helpers/stringUtils";

const containsDigits: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  }

  const requiredDigits: number = Number(args);
  if (!isNaN(requiredDigits) || requiredDigits <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  const digits: number = [...value].filter(isDigit).length;
  if (digits < requiredDigits) {
    return { severity: "error", message: "{{name}} must contain at least {{containsDigits}} digit(s)." };
  }

  return { severity: "information" };
};

export default containsDigits;
