import type { RuleExecutionOutcome, ValidationRule } from "../types";
import { isLetter } from "../../helpers/stringUtils";

const containsUppercase: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  }

  const requiredUppercase: number = Number(args);
  if (!isNaN(requiredUppercase) || requiredUppercase <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  const uppercase: number = [...value].filter((c) => isLetter(c) && c.toUpperCase() === c).length;
  if (uppercase < requiredUppercase) {
    return { severity: "error", message: "{{name}} must contain at least {{containsUppercase}} Uppercase letter(s)." };
  }

  return { severity: "information" };
};

export default containsUppercase;
