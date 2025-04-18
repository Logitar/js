import type { ValidationRule } from "../validator";

const uniqueCharacters: ValidationRule = (value: unknown, count: unknown): boolean => {
  return typeof value === "string" && typeof count === "number" && [...new Set(value)].length >= count;
};

export default uniqueCharacters;
