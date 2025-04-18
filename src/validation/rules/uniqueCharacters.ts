import type { ValidationRule } from "../validator";

const uniqueCharacters: ValidationRule = (value: unknown, args: unknown): boolean => {
  const count = Number(args ?? 0);
  return typeof value === "string" && !isNaN(count) && [...new Set(value)].length >= count;
};

export default uniqueCharacters;
