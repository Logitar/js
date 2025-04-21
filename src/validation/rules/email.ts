import type { RuleExecutionOutcome, ValidationRule } from "../types";

// https://github.com/colinhacks/zod/blob/40e72f9eaf576985f876d1afc2dbc22f73abc1ba/src/types.ts#L595
const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i; // TODO(fpion): override from args

const email: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  } else if (!regex.test(value)) {
    return { severity: "error", message: "{{name}} must be a valid email address." };
  }
  return { severity: "information" };
};

export default email;
