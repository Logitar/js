import type { ValidationRule } from "../validator";

const allowedCharacters: ValidationRule = (value: unknown, args: unknown): boolean => {
  if (typeof value !== "string" || typeof args !== "string") {
    return false;
  }
  const allowedCharacters = args as string;
  return [...value].every((c) => allowedCharacters.includes(c));
};

export default allowedCharacters;
