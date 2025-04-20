import type { RuleExecutionOutcome, ValidationRule } from "../validator";

const confirm: ValidationRule = (value: unknown, target: unknown): RuleExecutionOutcome => {
  const isValid = typeof value === "object" && typeof target === "object" ? JSON.stringify(value) === JSON.stringify(target) : value === target;
  return isValid ? { severity: "information" } : { severity: "error", message: "{{field}} must be equal to {{confirm}}" };
};

export default confirm;
