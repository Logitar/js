import type { RuleExecutionOutcome, ValidationRule } from "../types";
import { isDigit, isLetterOrDigit, isNullOrEmpty } from "../../helpers/stringUtils";

/**
 * A validation rule that checks if a string is a valid identifier.
 * @param value The value to validate.
 * @returns The result of the validation rule execution.
 */
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
