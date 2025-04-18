import type { ValidationRule } from "../validator";
import { isLetter } from "../../helpers/stringUtils";

const requireLowercase: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && [...value].some((c) => isLetter(c) && c.toLowerCase() === c);
};

export default requireLowercase;
