import type { ValidationRule } from "../validator";

const allowedCharacters: ValidationRule = (value: unknown, allowedCharacters: unknown): boolean => {
  if (typeof value !== "string" || typeof allowedCharacters !== "string") {
    return false;
  }
  return [...value].every((c) => allowedCharacters.includes(c));
};

export default allowedCharacters;
