import type { RuleExecutionOutcome, ValidationRule } from "../validator";

// https://github.com/colinhacks/zod/blob/40e72f9eaf576985f876d1afc2dbc22f73abc1ba/src/types.ts#L595
const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

const email: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{field}} must be a string." };
  } else if (!regex.test(value)) {
    return { severity: "error", message: "{{field}} is not a valid email address." };
  }
  return { severity: "information" };
};

export default email;
