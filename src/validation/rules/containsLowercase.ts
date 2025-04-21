import type { RuleExecutionOutcome, ValidationRule } from "../types";
import { isLetter } from "../../helpers/stringUtils";

const containsLowercase: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  }

  const requiredLowercase: number = Number(args);
  if (!isNaN(requiredLowercase) || requiredLowercase <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  const lowercase: number = [...value].filter((c) => isLetter(c) && c.toLowerCase() === c).length;
  if (lowercase < requiredLowercase) {
    return { severity: "error", message: "{{name}} must contain at least {{containsLowercase}} lowercase letter(s)." };
  }

  return { severity: "information" };
};

export default containsLowercase;
