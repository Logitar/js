import type { RuleExecutionOutcome, ValidationRule } from "../types";
import { isLetterOrDigit, isNullOrEmpty } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  } else if (value.split("-").some((word) => isNullOrEmpty(word) || [...word].some((c) => !isLetterOrDigit(c)))) {
    return { severity: "error", message: "{{name}} must be composed of non-empty alphanumeric words separated by hyphens (-)." };
  }
  return { severity: "information" };
};

export default slug;
