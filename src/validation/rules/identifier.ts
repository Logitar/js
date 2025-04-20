import type { RuleExecutionOutcome, ValidationRule } from "../validator";
import { isDigit, isLetterOrDigit, isNullOrWhiteSpace } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{field}} must be a string." };
  } else if (isNullOrWhiteSpace(value)) {
    return { severity: "error", message: "{{field}} cannot be empty." };
  } else if (isDigit(value[0])) {
    return { severity: "error", message: "{{field}} cannot start with a digit." };
  } else if ([...value].some((c) => !isLetterOrDigit(c) && c !== "_")) {
    return { severity: "error", message: "{{field}} may only contain letters, digits and underscores." };
  }
  return { severity: "information" };
};

export default identifier;
