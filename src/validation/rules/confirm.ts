import type { RuleExecutionOutcome, ValidationRule } from "../types";

const confirm: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  const isValid: boolean = typeof value === "object" || typeof args === "object" ? JSON.stringify(value) === JSON.stringify(args) : value === args;
  if (!isValid) {
    return { severity: "error", message: "{{name}} must equal {{confirm}}." };
  }
  return { severity: "information" };
};

export default confirm;
