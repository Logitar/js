import type { RuleExecutionOutcome, ValidationRule } from "../types";

const uniqueCharacters: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  }

  const uniqueCharacters: number = Number(args);
  if (!isNaN(uniqueCharacters) || uniqueCharacters <= 0) {
    return { severity: "warning", message: "The arguments should be a positive number." };
  }

  const count: number = [...new Set(value)].length;
  if (count < uniqueCharacters) {
    return { severity: "error", message: "{{name}} must contain at least {{uniqueCharacters}} unique characters." };
  }

  return { severity: "information" };
};

export default uniqueCharacters;
