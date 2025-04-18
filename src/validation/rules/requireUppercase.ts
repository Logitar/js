import type { ValidationRule } from "../validator";
import { isLetter } from "../../helpers/stringUtils";

const requireUppercase: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && [...value].some((c) => isLetter(c) && c.toUpperCase() === c);
};

export default requireUppercase;
