import type { RuleExecutionOutcome, ValidationRule } from "..";
import { isLetterOrDigit } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  const isValid: boolean = typeof value === "string" && value.split("-").every((word) => word.length > 0 && [...word].every(isLetterOrDigit));
  return { severity: isValid ? "information" : "error" };
};

export default slug;
