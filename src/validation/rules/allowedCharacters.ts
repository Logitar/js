import type { RuleExecutionOutcome, ValidationRule } from "../validator";

const allowedCharacters: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  if (typeof value !== "string") {
    return { severity: "error", message: "{{field}} must be a string." };
  } else if (typeof args !== "string") {
    return { severity: "warning", message: "The arguments should be a string containing each allowed character only once." };
  }
  const allowedCharacters = args as string;
  const invalidCharacters: string[] = [...new Set<string>([...value].filter((c) => !allowedCharacters.includes(c)))];
  if (invalidCharacters.length > 0) {
    return { severity: "error", message: `{{field}} contains the following characters that are not allowed: ${invalidCharacters.join(", ")}` };
  }
  return { severity: "information" };
};

export default allowedCharacters;
