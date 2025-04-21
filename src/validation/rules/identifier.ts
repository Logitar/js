import type { RuleExecutionOutcome, ValidationRule } from "..";
import { isDigit, isLetterOrDigit, isNullOrEmpty } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  } else if (isNullOrEmpty(value)) {
    return { severity: "error", message: "{{name}} cannot be an empty string." };
  } else if (isDigit(value[0])) {
    return { severity: "error", message: "{{name}} cannot start with a digit." };
  } else if ([...value].some((c) => !isLetterOrDigit(c) && c !== "_")) {
    return { severity: "error", message: "{{name}} may only contain letters, digits and underscores (_)." };
  }
  return { severity: "information" };
};

export default identifier;
