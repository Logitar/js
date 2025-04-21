import type { RuleExecutionOutcome, ValidationRule } from "..";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const url: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{name}} must be a string." };
  } else if (isNullOrWhiteSpace(value)) {
    return { severity: "error", message: "{{name}} cannot be an empty string." };
  }
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch (_) {
    return { severity: "error", message: "{{name}} must be a valid URL." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { severity: "error", message: "{{name}} must be an URL with one of the following schemes: http, https" };
  }
  return { severity: "information" };
};

export default url;
